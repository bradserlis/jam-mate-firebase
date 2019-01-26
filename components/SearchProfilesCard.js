import React, { Component } from "react";
import {
  Alert,
  AlertIOS,
  FlatList,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView
} from "react-native";
import {
  Card,
  CardImage,
  CardItem,
  Container,
  Content,
  Header,
  Form,
  Input,
  Icon,
  Item,
  Button,
  Label,
  Left,
  List,
  ListItem,
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
  Thumbnail,
  Toast
} from "native-base";
import { withNavigation } from "react-navigation";

import { LinearGradient } from "expo";
import FooterNav from "./FooterNav";
import * as firebase from "firebase";
import * as Animatable from "react-native-animatable";
import styles from "./styles";

class SearchProfilesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsConnected: this._userIsConnected()
    };
  }

  componentDidMount = () => {};

  _userIsConnected = () => {
    let currentUserId = firebase.auth().currentUser.uid;
    const connectedUserIds = this.props.connectedusers;
    return connectedUserIds.some(id => id === currentUserId);
  };

  _addContact = targetUser => {
    let currentuser = firebase.auth().currentUser.uid;
    console.log("current user sanity check", currentuser);
    let ref = firebase
      .database()
      .ref("/users/" + currentuser)
      .child("contactinfo");
    // let contactInfo = firebase
    //   .database()
    //   .ref("/users/" + currentuser)
    //   .child("contactinfo")
    //   .once("value")
    //   .then(snapshot => snapshot.toJSON());
    // console.log("contactInfo is:", contactInfo);
    // check to see if current user has contactinfo string
    ref.once("value").then(snapshot => {
      let contactInfo = snapshot.val();
      console.log("contact info?", contactInfo);
      if (!contactInfo) {
        console.log("didnt find contactinfo");
        AlertIOS.prompt(
          "Add Contact info",
          "Contact info missing (e.g email, phone #)",
          newContactInfo => {
            // update contactinfo for current user
            ref.set(newContactInfo);
            // add currentuser to target user's connecteduser list
            firebase
              .database()
              .ref("/users/" + targetUser)
              .child("connectedusers")
              .push(currentuser)
              .then(() => {
                this.setState({
                  userIsConnected: true
                });
              });
            // give alert that connection was sent
            Alert.alert("connection sent to", this.props.name);
          }
        );
      } else {
        firebase
          .database()
          .ref("/users/" + targetUser)
          .child("connectedusers")
          .push(currentuser)
          .then(() => {
            this.setState({
              userIsConnected: true
            });
          });
        Alert.alert("connection sent to", this.props.name);
      }
    });
  };

  _openRoom = targetUserId => {
    const { navigate } = this.props.navigation;

    console.log("you are sending a message to:", targetUserId);
    let currentUserId = firebase.auth().currentUser.uid;
    // === CHECK IF MESSAGE "ROOM" BETWEEN USERS EXISTS
    let messageRoomsRef = firebase
      .database()
      .ref("/users/" + currentUserId + "/messagerooms");
    messageRoomsRef.once("value").then(snapshot => {
      let users = snapshot.toJSON();
      console.log("what is snapshot", users);
      users.hasOwnProperty(targetUserId)
        ? navigate("Messages")
        : console.log("it did not find a match");

      // let theRooms = Object.keys(users);
      // console.log("what are THE ROOMS?", theRooms);
      // targetuserId : roomId
      // if (users.some(id => id.key === targetUserId)) {
      //   // If True...
      //   console.log("matched user", targetUserId);
      //   console.log("matched room is...", id.val());
      // navigate("Messages");
      // create message TO
      // grab key of
    });
    // if (messagerooms.some(id => id === u)) {
    //   console.log("This user has an open message with you", u);
    // } else {
    //   console.log("this user does not have an open message with you", u);
    // }
  };

  render() {
    const { navigate } = this.props.navigation;

    let currentUserId = firebase.auth().currentUser.uid;

    let combo = ["INSTRUMENTS"].concat(
      this.props.instruments,
      [" ", "GENRES"],
      this.props.genres
    );

    return (
      <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]}>
        <Card>
          <CardItem>
            <Body>
              <H3>{this.props.name}</H3>
              <FlatList
                data={combo}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <List>
                      <ListItem listKey={"a" + index.toString()}>
                        <Text>{item}</Text>
                      </ListItem>
                    </List>
                  );
                }}
              />
              {!this.state.userIsConnected ? (
                <Button
                  onPress={() => {
                    this._addContact(this.props.userid);
                  }}
                >
                  <Text> Send Contact Info to {this.props.name} </Text>
                </Button>
              ) : null}
              <Button
                onPress={() => {
                  this._openRoom(this.props.userid);
                }}
              >
                <Text> Message </Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </LinearGradient>
    );
  }
}

export default withNavigation(SearchProfilesCard);

SearchProfilesCard.defaultProps = {
  instruments: [],
  genres: [],
  firstname: [],
  lastname: [],
  name: []
};
