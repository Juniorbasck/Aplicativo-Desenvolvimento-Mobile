// import 'react-native-gesture-handler';
import React from 'react';
import LoginNavigator from './navigators/loginNavigator/LoginNavigator';
import * as firebase from '../firebase.config.js';
import * as firebaseAdmin from '../firebase-admin.config.js'

export const App = () => {
    return <LoginNavigator/>;
};
