import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator
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
import { AppLoading, Constants, Asset, Font, Icon } from "expo";

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
const geoFire = new geofire(firebase.database().ref("user_locations"));
//

export default class App extends Component {
  state = {
    isLoadingComplete: false
  };

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./img/music.jpg"),
        require("./img/binding_dark.png"),
        require("./img/facebook_login.png")
      ])
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    console.log("checking the device...", Constants.platform.ios.model);
    console.log("checking the device #2...", Constants.deviceName);
    console.log("checking the platform...", Platform.OS);
    const majorVersionIOS = parseInt(Platform.Version, 10);
    const paddingTop = majorVersionIOS < 11 ? 35 : 15;
    const paddingBottom =
      Constants.deviceName === "iPhone 8 Plus" && Platform.OS === "ios"
        ? 41
        : 15;

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,.2)",
    height: window.height,
    width: window.width
  }
});
