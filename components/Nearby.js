import React, { Component } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
  SafeAreaView
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
  Ul,
  Li
} from "native-base";
import FooterNav from "./FooterNav";
import SearchProfilesCard from "./SearchProfilesCard";
import SearchProfilesGenres from "./SearchProfilesGenres";
import CreateMessageModal from "./CreateMessageModal";
import * as firebase from "firebase";
import geofire from "geofire";
import * as Animatable from "react-native-animatable";
import styles from "./styles";

export default class Nearby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersArray: [],
      isCreateMessageModalVisible: false,
      location: null,
      userLocation: []
    };
  }

  // === message modal ===

  // handleShowCreateMessageModal = () => {
  //     this.setState({
  //       isCreateMessageModalVisible: true
  //     });
  //   };
  // handleDismissCreateMessageModal = () => {
  //   this.setState({
  //     isCreateMessageModalVisible: false
  //   });
  // };

  // === message modal ===

  static navigationOptions = ({ navigation }) => ({
    title: "Nearby",
    headerLeft: null,
    headerStyle: {
      backgroundColor: "#007bff"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  });

  componentWillMount = () => {};

  componentDidMount = () => {
    const currentUser = firebase.auth().currentUser.uid;
    // === message modal ===
    // handleShowCreateMessageModal();
    // === message modal ===

    // ******** declare geofire all users reference point
    const geoFire = new geofire(firebase.database().ref("user_locations/"));

    geoFire.get(currentUser).then(
      location => {
        if (location === null) {
          console.log("key is not in Geofire");
        } else {
          // this.setState({
          //   userLocation: location
          // });
          // console.log("sanity check - what is location:", location);
          // console.log(
          //   "sanity check - what is state of userLocation:",
          //   this.state.userLocation
          // );
          // ******** initialize geoquery
          const geoQuery = geoFire.query({
            center: location,
            radius: 33
          });
          // console.log("step 2 - this is the geoquery:", geoQuery);
          // console.log(
          //   "step 2.1 - this is the geoquery.center:",
          //   geoQuery.center()
          // );
          // ********
          // ******** retrieve users
          let nearbyUsers = [];
          //GEOQUERIES ==
          geoQuery.on("key_exited", key => {
            nearbyUsers = nearbyUsers.filter(user => user.userid !== key);
            this.setState({
              usersArray: nearbyUsers
            });
          });
          geoQuery.on("key_entered", (key, location, distance) => {
            if (
              key === currentUser ||
              nearbyUsers.some(user => user.userid === key)
            ) {
              // console.log("you are already in here", key);
            } else {
              // console.log(
              //   key +
              //     " is within range at " +
              //     location +
              //     " at a distance of " +
              //     distance
              // );
              // console.log("these are nearby users:", nearbyUsers);

              // query Firebase USERS node
              let ref = firebase.database().ref("/users/" + key);
              ref.once("value").then(snapshot => {
                let userObj = { userid: key };
                snapshot.forEach(userProperty => {
                  userObj[userProperty.key] = userProperty.val();
                });
                nearbyUsers.push(userObj);
                this.setState({
                  usersArray: nearbyUsers
                });
              });
            }
          });
        }
      },
      error => {
        console.log("Error:", error);
      }
    );
  };

  _getArray = users => {
    let results = [];

    // Loop through each user
    users.forEach((originalObj, idx) => {
      let obj = originalObj;
      // Get the genres
      let genres = [];
      for (let key in obj.genres) {
        genres.push(obj.genres[key]);
      }
      // Get the instruments
      let instruments = [];
      for (let key in obj.instruments) {
        instruments.push(obj.instruments[key]);
      }
      // Get connectedusers
      let connectedusers = [];
      for (let key in obj.connectedusers) {
        connectedusers.push(obj.connectedusers[key]);
      }
      // Get messagerooms
      // let messagerooms = [];
      // for (let key in obj.messagerooms) {
      //   messagerooms.push(obj.messagerooms[key]);
      // }
      // Add the result to the table
      results.push({
        userid: originalObj.userid,
        key: idx,
        firstname: obj.firstname,
        lastname: obj.lastname,
        zipcode: obj.zipcode,
        userphoto: obj.userphoto || "http://temp.changeme.com",
        genres: genres,
        instruments: instruments,
        connectedusers: connectedusers
        // messagerooms: messagerooms
      });
    });

    return results;
  };

  render() {
    const { navigate } = this.props.navigation;
    let users = this.state.usersArray;
    // console.log("this is the users in render:", users);
    var results = this._getArray(users);
    return (
      <Container>
        <Content>
          <H2 style={styles.notchCompensation}> Nearby Users </H2>
          <View>
            <View style={{ padding: 15 }}>
              <Text style={styles.centerMe}>
                Nearby Users will Display Below
              </Text>
            </View>
            <View>
              <Text style={{ marginLeft: 7, flexWrap: "wrap" }}>
                When you SEND CONTACT INFO, your provided contact info will be
                shared with that user.
              </Text>
            </View>
            <View>
              <Text style={{ marginLeft: 7, fontSize: 12, lineHeight: 18 }}>
                You can change your contact info from your Home page by clicking
                "Edit"
              </Text>
            </View>
          </View>

          {results.length < 1 ? (
            <View style={{ margin: 20 }}>
              <Text style={styles.modalTitleText}>No Users nearby</Text>
            </View>
          ) : (
            <FlatList
              data={results}
              extraData={results}
              keyExtractor={item => item.userid}
              renderItem={({ item, index }) => (
                <List listKey={item.userid}>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail source={{ uri: item.userphoto }} />
                    </Left>
                    <Body>
                      <SearchProfilesCard
                        userid={item.userid}
                        instruments={item.instruments || []}
                        genres={item.genres || []}
                        name={item.firstname || []}
                        connectedusers={item.connectedusers || []}
                        navigate={navigate}
                      />
                    </Body>
                    <Right />
                  </ListItem>
                </List>
              )}
            />
          )}
        </Content>
      </Container>
    );
  }
}

// <CreateMessageModal
// isVisible={this.state.isCreateMessageModalVisible}
// onBackdropPress={this.handleDismissCreateMessageModal}
// />
// <Footer>
//   <FooterTab>
//     <Button onPress={() => navigate("Home")}>
//       <Icon name="contact" />
//       <Text>Profile</Text>
//     </Button>
//     <Button>
//       <Icon name="people" />
//       <Text>Search</Text>
//     </Button>
//     <Button onPress={() => navigate("Messages")}>
//       <Icon name="chatboxes" />
//       <Text>Messages</Text>
//     </Button>
//   </FooterTab>
// </Footer>
