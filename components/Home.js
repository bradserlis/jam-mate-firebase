import React, { Component } from "react";
import {
  Alert,
  AlertIOS,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Platform,
  TouchableOpacity
} from "react-native";
import {
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
import { NavigationEvents } from "react-navigation";
import ProfileTop from "./ProfileTop";
import Instruments from "./Instruments";
import Messages from "../messages/containers/Messages";
import Genres from "./Genres";
import * as firebase from "firebase";
import geofire from "geofire";

import * as Animatable from "react-native-animatable";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: (firebase.auth().currentUser || {}).displayName || null,
      user: firebase.auth().currentUser || null,
      userphoto:
        (firebase.auth().currentUser || {}).photoURL ||
        "./img/Missing_avatar.png",
      userzip: null,
      uid: firebase.auth().currentUser ? firebase.auth().currentUser.uid : null,
      location: null,
      errorMessage: null,
      usercityobject: null,
      instrumentList: [],
      genreList: []
    };
  }

  // === DEPRECATED HEADER OPTIONS
  // static navigationOptions = ({ navigation }) => ({
  //   title: "Home",
  //   headerLeft: null,
  //   headerRight: (
  //     <TouchableOpacity onPress={() => navigation.navigate("ProfileEdit")}>
  //       <Icon name="menu" />
  //       <Text>Edit</Text>
  //     </TouchableOpacity>
  //   ),
  //   headerStyle: {
  //     backgroundColor: "#007bff"
  //   },
  //   headerRightContainerStyle: {
  //     paddingRight: 100
  //   },
  //   headerTintColor: "#fff",
  //   headerTitleStyle: {
  //     fontWeight: "bold"
  //   }
  // });
  // ===

  // === DEPRECATED - LOCATION REVERSE GEOCODE FROM DEVICE
  // _getCity = async () => {
  //   Expo.Location.reverseGeocodeAsync(this.state.usercityobject)
  //     .then(result => {
  //       let reverseResult = result;
  //       this.setState({ userzip: reverseResult[0].postalCode });
  //       let userId = firebase.auth().currentUser.uid;
  //       firebase
  //         .database()
  //         .ref("users")
  //         .child(userId)
  //         .child("zipcode")
  //         .set(reverseResult[0].postalCode);
  //     })
  //     .catch(error => {
  //       console.log("there was an error :-(", error);
  //     });
  // };
  // ===

  _logOut = async () => {
    return firebase.auth().signOut();
  };

  _getLocationAsync = async () => {
    const { Location, Permissions } = Expo;
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    let thislat = this.state.location.coords.latitude;
    let thislong = this.state.location.coords.longitude;
    // let usercityobject = {
    //   latitude: thislat,
    //   longitude: thislong
    // };

    // this.setState({ usercityobject: usercityobject });
    const geoFire = new geofire(firebase.database().ref("user_locations/"));
    if (this.state.uid !== null) {
      geoFire.set(this.state.uid, [thislat, thislong]).then(
        function() {
          console.log("Provided key has been added to GeoFire");
        },
        function(error) {
          console.log("Error: " + error);
        }
      );
    }
  };

  componentDidMount = () => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
    let userId = firebase.auth().currentUser
      ? firebase.auth().currentUser.uid
      : null;
    if (userId) {
      firebase
        .database()
        .ref("/users/" + userId)
        .child("userphoto")
        .once("value")
        .then(snapshot => {
          let userphoto = snapshot.val() || "";
          // TODO : dont try to use userphoto until it has a value
          this.setState({ userphoto: userphoto });
          // ...
        });
      firebase
        .database()
        .ref("/users/" + userId)
        .child("instruments")
        .orderByKey()
        .on("child_added", snapshot => {
          this.setState(previousState => ({
            instrumentList: [...previousState.instrumentList, snapshot]
          }));
        });
      // .once("value")
      // .then(instruments => {
      //   let jInstruments = instruments.toJSON();
      //   let instrumentList = [];
      //   for (let key in jInstruments) {
      //     instrumentList.push(jInstruments[key]);
      //   }
      //   this.setState({ instrumentsList: instrumentList });
      // });
      firebase
        .database()
        .ref("/users/" + userId)
        .child("genres")
        .on("child_added", snapshot => {
          this.setState(previousState => ({
            genreList: [...previousState.genreList, snapshot]
          }));
        });
      // .once("value")
      // .then(genres => {
      //   let jGenres = genres.toJSON();
      //   let genreList = [];
      //   for (let key in jGenres) {
      //     genreList.push(jGenres[key]);
      //   }
      //   this.setState({ genresList: genreList });
      // });
    }
  };

  render() {
    const { navigate } = this.props.navigation;

    //=== LOCATION ERROR MESSAGE
    // let text = "Waiting..";
    // if (this.state.errorMessage) {
    //   text = this.state.errorMessage;
    // } else if (this.state.location) {
    //   text = JSON.stringify(this.state.location);
    // }
    //===
    return (
      <Container>
        <ImageBackground
          style={{
            flex: 1,
            width: window.width,
            height: window.height
          }}
          imageStyle={{ resizeMode: "repeat" }}
          source={require("../img/diamond_upholstery.png")}
        >
          <Grid>
            <Row size={50}>
              <Col size={25}>
                <View style={{ marginLeft: 5 }}>
                  <TouchableOpacity
                    onPress={() =>
                      this._logOut().then(() => {
                        Toast.show({
                          text: "Logged Out"
                        });
                        navigate("Landing");
                      })
                    }
                  >
                    <Icon
                      style={{ color: "rgb(66, 163, 255)" }}
                      name="ios-log-out"
                    />
                    <Text style={{ color: "rgb(66, 163, 255)" }}>Log Out</Text>
                  </TouchableOpacity>
                </View>
              </Col>
              <Col size={50}>
                <ProfileTop
                  username={this.state.username}
                  userphoto={this.state.userphoto}
                />
              </Col>
              <Col size={25}>
                <View style={{ alignItems: "flex-end", marginRight: 5 }}>
                  <TouchableOpacity onPress={() => navigate("ProfileEdit")}>
                    <Icon
                      style={{ color: "rgb(66, 163, 255)" }}
                      name="ios-menu"
                    />
                    <Text style={{ color: "rgb(66, 163, 255)" }}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </Col>
            </Row>
            <Row size={25}>
              <Instruments instruments={this.state.instrumentList} />
            </Row>
            <Row size={25}>
              <Genres genres={this.state.genreList} />
            </Row>
          </Grid>
        </ImageBackground>
      </Container>
    );
  }
}

Home.defaultProps = {
  username: null,
  user: null,
  userphoto: null,
  userzip: null
};

// === DEPRECATED - FOOTER
// <Footer>
// <FooterTab>
// <Button>
// <Icon name="contact" />
// <Text>Profile</Text>}
// </Button>
// <Button
// onPress={() => this._getCity().then(() => navigate("Search"))}
// >
// <Icon name="people" />
// <Text>Search</Text>
// </Button>
// <Button onPress={() => navigate("Messages")}>
// <Icon name="chatboxes" />
// <Text>Messages</Text>
// </Button>
// <Button onPress={() => navigate("Connections")}>
// <Icon name="chatboxes" />
// <Text>Connections</Text>
// </Button>
// </FooterTab>
// </Footer>
// ===
