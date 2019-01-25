import React, { Component } from "react";
import App from "../App";
import MyNavigator from "./MainTabNavigator";
import Landing from "../components/Landing";
import Home from "../components/Home";
import ProfileEdit from "../components/ProfileEdit";
import Nearby from "../components/Nearby";
import FooterNav from "../components/FooterNav";
import Messages from "../components/Messages";
import Connections from "../components/Connections";
import MessagesIndividual from "../components/MessagesIndividual";
import {
  createSwitchNavigator,
  createStackNavigator,
  StackNavigator
} from "react-navigation";
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label
} from "native-base";
import { Text, View, ImageBackground } from "react-native";

const Router = createSwitchNavigator(
  {
    Landing: Landing,
    MainTabNavigator: MyNavigator,
    ProfileEdit: ProfileEdit
  },
  {
    initialRouteName: "Landing"
  }
);

export default Router;
