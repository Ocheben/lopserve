/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import RNPaystack from 'react-native-paystack';

AppRegistry.registerComponent(appName, () => App);
RNPaystack.init({
  publicKey: 'pk_test_9e6aa7b29355172e9de2ee9b19cfd6bdd99e4a04',
});
