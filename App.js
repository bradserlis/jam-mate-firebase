import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  ImageBackground,
  SafeAreaView
} from "react-native";
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label,
  Left,
  Body,
  Right,
  Title,
  H3,
  H2,
  Root
} from "native-base";
import Router from "./routes/Router";
import { MainTabNavigator } from "./routes/MainTabNavigator";
import * as firebase from "firebase";
import geofire from "geofire";

const firebaseconfig = {
  apiKey: "AIzaSyCIK6eLFSDEOOKY8zoWwXcfvpn5qlAlN9c",
  authDomain: "jammate-1627c.firebaseapp.com",
  databaseURL: "https://jammate-1627c.firebaseio.com",
  projectId: "jammate-1627c",
  storageBucket: "jammate-1627c.appspot.com",
  messagingSenderId: "666389462465"
};

firebase.initializeApp(firebaseconfig);

//GEOFIRE setup
const geoFire = new geofire(firebase.database().ref("users"));
//

export default class App extends Component {
  render() {
    return (
      <Root>
        <SafeAreaView style={{ flex: 1 }}>
          <Container>
            <Router />
          </Container>
        </SafeAreaView>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,.2)",
    height: window.height,
    width: window.width
  }
});
