import React, { Component } from 'react';
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
} from 'react-native';
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
} from 'native-base';
import { withNavigation } from 'react-navigation';

import { LinearGradient } from 'expo';
import * as firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import styles from '../../common/styles/styles';

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
    let ref = firebase
      .database()
      .ref('/users/' + currentuser)
      .child('contactinfo');
    // let contactInfo = firebase
    //   .database()
    //   .ref("/users/" + currentuser)
    //   .child("contactinfo")
    //   .once("value")
    //   .then(snapshot => snapshot.toJSON());
    // console.log("contactInfo is:", contactInfo);
    // check to see if current user has contactinfo string
    ref.once('value').then(snapshot => {
      let contactInfo = snapshot.val();
      console.log('contact info?', contactInfo);
      if (!contactInfo) {
        console.log('didnt find contactinfo');
        AlertIOS.prompt(
          'Add Contact info',
          'Contact info missing (e.g email, phone #)',
          newContactInfo => {
            // update contactinfo for current user
            ref.set(newContactInfo);
            // add currentuser to target user's connecteduser list
            firebase
              .database()
              .ref('/users/' + targetUser)
              .child('connectedusers')
              .push(currentuser)
              .then(() => {
                this.setState({
                  userIsConnected: true
                });
              });
            // give alert that connection was sent
            Alert.alert('connection sent to', this.props.name);
          }
        );
      } else {
        firebase
          .database()
          .ref('/users/' + targetUser)
          .child('connectedusers')
          .push(currentuser)
          .then(() => {
            this.setState({
              userIsConnected: true
            });
          });
        Alert.alert('connection sent to', this.props.name);
      }
    });
  };

  _createRoom = targetUserId => {
    // setup the variables
    let currentUserId = firebase.auth().currentUser.uid;
    let newRoomKey = firebase
      .database()
      .ref('/rooms/')
      .push().key;
    let newRoomRef = firebase.database().ref('/rooms/' + newRoomKey);
    let newRoomMessageRef = newRoomRef.child('/messages/' + Date.now());
    // initialize members data
    newRoomRef.child('members').push(targetUserId);
    newRoomRef.child('members').push(currentUserId);
    // add message
    AlertIOS.prompt('Message', 'Enter your message', firstMessage => {
      newRoomMessageRef.child('message').set(firstMessage);
      newRoomMessageRef.child('user').set(currentUserId);
      // give alert that connection was sent
      Alert.alert('Message sent');
    });
    // Add userid and roomid to messageRooms array for each user
    let targetObj = {};
    let currentUserObj = {};
    targetObj[targetUserId] = newRoomKey;
    currentUserObj[currentUserId] = newRoomKey;

    firebase
      .database()
      .ref('/users/' + currentUserId)
      .child('messagerooms')
      .child(targetUserId)
      .set(newRoomKey);
    firebase
      .database()
      .ref('/users/' + targetUserId)
      .child('messagerooms')
      .child(currentUserId)
      .set(newRoomKey);
  };

  _openRoom = targetUserId => {
    const { navigate } = this.props.navigation;

    let currentUserId = firebase.auth().currentUser.uid;
    // === CHECK IF MESSAGE "ROOM" BETWEEN USERS EXISTS
    let messageRoomsRef = firebase
      .database()
      .ref('/users/' + currentUserId + '/messagerooms');
    messageRoomsRef.once('value').then(snapshot => {
      let users = snapshot.toJSON();
      if (snapshot.toJSON() === null) {
        this._createRoom(targetUserId);
      } else if (users.hasOwnProperty(targetUserId)) {
        navigate('Messages');
      } else {
        this._createRoom(targetUserId);
      }
    });
  };

  render() {
    const { navigate } = this.props.navigation;

    let currentUserId = firebase.auth().currentUser.uid;

    let combo = ['INSTRUMENTS:'].concat(
      this.props.instruments,
      [' ', 'GENRES:'],
      this.props.genres
    );

    return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}>
        <Card>
          <CardItem>
            <View style={{ flex: 1 }}>
              <H3>{this.props.name}</H3>
              <FlatList
                data={combo}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <List>
                      <Text>{item}</Text>
                    </List>
                  );
                }}
              />
              {!this.state.userIsConnected ? (
                <Button
                  info
                  style={{
                    padding: 7,
                    margin: 3
                  }}
                  onPress={() => {
                    this._addContact(this.props.userid);
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 12 }}>
                    {' '}
                    Send Contact Info to {this.props.name}{' '}
                  </Text>
                </Button>
              ) : null}
              <Button
                info
                style={{ padding: 7, margin: 3 }}
                onPress={() => {
                  this._openRoom(this.props.userid);
                }}
              >
                <Text style={{ color: 'white', fontSize: 12 }}> Message </Text>
              </Button>
            </View>
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
