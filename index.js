/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import RNPaystack from 'react-native-paystack';
import messaging from '@react-native-firebase/messaging';

AppRegistry.registerComponent(appName, () => App);
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

RNPaystack.init({
  // publicKey: 'pk_test_9e6aa7b29355172e9de2ee9b19cfd6bdd99e4a04',
  publicKey: 'pk_test_89b440f6d29f7b096d2854f7294ae4ad7455c00a',
});
