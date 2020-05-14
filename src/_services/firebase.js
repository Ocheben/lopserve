import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {getOrders} from '../_store/actions/userActions';
//1
export const checkPermission = async () => {
  const enabled = await messaging().hasPermission();
  if (enabled) {
    getToken();
  } else {
    requestPermission();
  }
};

//3
const getToken = async () => {
  console.log('getting token');
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken);
  if (!fcmToken) {
    fcmToken = await messaging().getToken();
    if (fcmToken) {
      // user has a device token
      console.log(fcmToken);
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
};

//2
const requestPermission = async () => {
  try {
    await messaging().requestPermission();
    // User has authorised
    getToken();
  } catch (error) {
    // User has rejected permissions
    console.log('permission rejected');
  }
};

export const messageListener = (navigation, dispatch, token) => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    console.log('dispatching orders');
    dispatch(getOrders(token));
    if (navigation.state.routeName !== 'Rider') {
      navigation.navigate('Rider', {vendorInfo: remoteMessage.data});
    }
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        console.log('dispatching orders');
        dispatch(getOrders(token));
        if (navigation.state.routeName !== 'Rider') {
          navigation.navigate('Rider', {vendorInfo: remoteMessage.data});
        }
      }
    });
  messaging().onMessage(message => {
    console.log(JSON.stringify(message), message);
    console.log('dispatching orders');
    dispatch(getOrders(token));
    if (navigation.state.routeName !== 'Rider') {
      navigation.navigate('Rider', {vendorInfo: message.data});
    }
  });
};

const showAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    {cancelable: false},
  );
};
