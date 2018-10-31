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
  Thumbnail
} from "native-base";
import FooterNav from "./FooterNav";
import * as firebase from "firebase";
import * as Animatable from "react-native-animatable";
import styles from "./styles";

export default class SearchProfilesCard extends Component {
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
  render() {
    let currentUserId = firebase.auth().currentUser.uid;

    let combo = ["INSTRUMENTS"].concat(
      this.props.instruments,
      [" ", "GENRES"],
      this.props.genres
    );

    return (
      <View>
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
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}

SearchProfilesCard.defaultProps = {
  instruments: [],
  genres: [],
  firstname: [],
  lastname: [],
  name: []
};
