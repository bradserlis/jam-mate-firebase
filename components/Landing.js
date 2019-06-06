import React, { Component } from "react";
import Login from "./Login";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
  Alert
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
  H1,
  H2,
  H3,
  Toast
} from "native-base";
import * as firebase from "firebase";
import * as Animatable from "react-native-animatable";
import styles from "../common/styles/styles";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      user: null,
      userphoto: null,
      firstname: null,
      lastname: null,
      fbToken: null,
      fId: null
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount = () => {};

  _loginWithFacebook = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "2085907415001272",
      { permissions: ["public_profile", "email"] }
    );
    if (type == "success") {
      this.setState({
        fbToken: token
      });
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large),first_name,last_name`
      );
      const jresponse = await response.json();
      const facebookId = jresponse.id;
      this.setState({
        fId: facebookId
      });
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      return firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then(() => {
          const userId = firebase.auth().currentUser.uid;
          if (userId) {
            firebase
              .database()
              .ref("users")
              .child(userId)
              .child("firstname")
              .set(jresponse.first_name);
            firebase
              .database()
              .ref("users")
              .child(userId)
              .child("lastname")
              .set(jresponse.last_name);
            firebase
              .database()
              .ref("users")
              .child(userId)
              .child("userphoto")
              .set(jresponse.picture.data.url);
          }
          fetch(`https://graph.facebook.com/${this.state.fId}/permissions`, {
            method: "DELETE",
            body: `access_token=${this.state.fbToken}`
          }).then(response => {
            if (response.ok) {
              console.log("response was ok");
            } else {
              console.log("response no good");
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <ImageBackground
          style={styles.fullScreen}
          imageStyle={{ resizeMode: "cover" }}
          source={require("../img/music.jpg")}
        >
          <View style={styles.overlay}>
            <Left />
            <Body>
              <Animatable.View animation="flipInY">
                <Animatable.View
                  animation="pulse"
                  easing="ease-in-out"
                  iterationCount="infinite"
                  iterationDelay={3500}
                >
                  <H1 style={styles.title}> JamMate </H1>
                </Animatable.View>
              </Animatable.View>
            </Body>
            <Right />
            <Button
              style={{ alignSelf: "center", margin: 20 }}
              transparent
              onPress={() =>
                this._loginWithFacebook().then(() => {
                  Toast.show({
                    text: "Welcome Back"
                  });
                  navigate("Home");
                })
              }
            >
              <Image
                source={require("../img/facebook_login.png")}
                style={{ height: "115%", width: "100%" }}
              />
            </Button>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
