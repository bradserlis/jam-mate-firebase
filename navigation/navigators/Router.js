import React, { Component } from "react";
import App from "../../App";
import MyNavigator from "./MainTabNavigator";
import Landing from "../../components/Landing";
import Home from "../../profile/containers/Home";
import ProfileEdit from "../../profile/containers/ProfileEdit";
import Nearby from "../../components/Nearby";
import FooterNav from "../../components/FooterNav";
import Messages from "../../messages/containers/Messages";
import Connections from "../../connections/containers/Connections";
import MessagesIndividual from "../../messages/components/MessagesIndividual";
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
    ProfileEdit: ProfileEdit,
    MessagesIndividual: MessagesIndividual
  },
  {
    initialRouteName: "Landing"
  }
);

export default Router;
