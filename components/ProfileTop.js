import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  Image,
  Platform
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
  Grid,
  Col,
  Row,
  Footer,
  FooterTab,
  Thumbnail
} from "native-base";
import * as Animatable from "react-native-animatable";

export default class ProfileTop extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          flexDirection: "column"
        }}
      >
        <Text style={{ fontSize: 25 }}>Hi,</Text>
        <Text style={{ fontSize: 25 }}>{this.props.username}!</Text>
        <View style={{ margin: 5 }}>
          <Animatable.View animation="zoomIn">
            <Thumbnail
              large
              style={{ width: 160, height: 160, borderRadius: 80 }}
              source={{ uri: this.props.userphoto }}
            />
          </Animatable.View>
        </View>
      </View>
    );
  }
}
