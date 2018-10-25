import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  ImageBackground
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
  H2
} from "native-base";
import Router from "./routes/Router";
import { MainTabNavigator } from "./routes/MainTabNavigator";
import * as firebase from "firebase";

const firebaseconfig = {
  apiKey: "AIzaSyCIK6eLFSDEOOKY8zoWwXcfvpn5qlAlN9c",
  authDomain: "jammate-1627c.firebaseapp.com",
  databaseURL: "https://jammate-1627c.firebaseio.com",
  projectId: "jammate-1627c",
  storageBucket: "jammate-1627c.appspot.com",
  messagingSenderId: "666389462465"
};

firebase.initializeApp(firebaseconfig);

export default class App extends Component {
  render() {
    return (
      <Container>
        <Router />
      </Container>
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
