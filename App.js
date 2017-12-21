import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { Button, Header, Text, Divider, ButtonGroup, List, ListItem, Slider } from 'react-native-elements'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import CalendarPage from './Components/Pages/CalendarPage.js';

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD-NU7of1sotS3ew8oNjvU9onFkp7nyO8M",
  authDomain: "imamcrew-1951e.firebaseapp.com",
  databaseURL: "https://imamcrew-1951e.firebaseio.com",
  projectId: "imamcrew-1951e",
  storageBucket: "",
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render(){
    return(
      <CalendarPage />
      
    )
  }
}
