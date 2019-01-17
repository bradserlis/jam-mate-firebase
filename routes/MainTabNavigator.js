import React from "react";
import { Platform } from "react-native";
import { Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Router from "./Router";
import Landing from "../components/Landing";
import Home from "../components/Home";
import Search from "../components/Search";
import Messages from "../components/Messages";
import Connections from "../components/Connections";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

export default (MainTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      title: "Profile"
    },
    Search: {
      screen: Search
    },
    Connections: {
      screen: Connections
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
        } else if (routeName === "Search") {
          iconName = "ios-people";
        }
        return <Icon name={iconName} size={2} style={{ marginBottom: -1 }} />;
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
