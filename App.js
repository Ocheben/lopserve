/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Root} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
// Imports: Redux Persist Persister
import {store, persistor} from './src/_store/store';

import {isSignedIn} from './src/_services';
import {createRootNavigator} from './src/router';

import PushController from './src/Components/PushController';

const App: () => React$Node = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [checkedSignIn, setCheckedSignIn] = useState(false);

  useEffect(() => {
    checkSignIn();
    SplashScreen.hide();
    checkPermission();
    messageListener();
  }, []);

  const checkSignIn = () => {
    isSignedIn()
      .then(res => {
        setSignedIn(res);
        setCheckedSignIn(true);
      })
      .catch(err => alert('An error occurred', err));
  };

  //1
  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
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
      fcmToken = await firebase.messaging().getToken();
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
      await firebase.messaging().requestPermission();
      // User has authorised
      getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  };

  const messageListener = async () => {
    firebase.notifications().onNotification(notification => {
      const {title, body} = notification;
      showAlert(title, body);
    });

    // firebase.notifications().onNotificationOpened(notificationOpen => {
    //   const {title, body} = notificationOpen.notification;
    //   showAlert(title, body);
    // });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      showAlert(title, body);
    }

    firebase.messaging().onMessage(message => {
      console.log(JSON.stringify(message));
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
  const Layout = createRootNavigator(signedIn);
  return !checkedSignIn ? null : (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root>
            <Layout />
          </Root>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
