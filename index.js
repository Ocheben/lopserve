/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import RNPaystack from 'react-native-paystack';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    // await messaging().registerDeviceForRemoteMessages();
  }
}

requestUserPermission();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);

RNPaystack.init({
  // publicKey: 'pk_test_9e6aa7b29355172e9de2ee9b19cfd6bdd99e4a04',
  publicKey: 'pk_test_89b440f6d29f7b096d2854f7294ae4ad7455c00a',
});
