import React from "react";
import { Platform } from "react-native";
import { Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Router from "./Router";
import Landing from "../../login/containers/Landing";
import Home from "../../profile/containers/Home";
import Nearby from "../../nearby/containers/Nearby";
import Messages from "../../messages/containers/Messages";
import Connections from "../../connections/containers/Connections";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

export default (MainTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      title: "Profile"
    },
    Nearby: {
      screen: Nearby,
      title: "Nearby"
    },
    Connections: {
      screen: Connections
    },
    Messages: {
      screen: Messages
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = "ios-contact";
          backBehavior: "none";
        } else if (routeName === "Connections") {
          iconName = "ios-chatboxes";
        } else if (routeName === "Nearby") {
          iconName = "ios-people";
        } else if (routeName === "Messages") {
          iconName = "ios-chatbubbles";
        }
        return <Icon name={iconName} size={2} style={{ marginBottom: -2.5 }} />;
      }
    }),
    // tabBarComponent: react-navigation-tabs,
    initialRouteName: "Home",
    tabBarPosition: "bottom",
    animationEnabled: true,
    swipeEnabled: false,
    backBehavior: "none"
  }
));
