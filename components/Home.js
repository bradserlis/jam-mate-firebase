import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Alert,
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
  Thumbnail
} from "native-base";
import FooterNav from "./FooterNav";
import ProfileTop from "./ProfileTop";
import Instruments from "./Instruments";
import Messages from "./Messages";
import Genres from "./Genres";
import * as firebase from "firebase";
import * as Animatable from "react-native-animatable";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: (firebase.auth().currentUser || {}).displayName || null,
      user: firebase.auth().currentUser || null,
      userphoto: firebase.auth().currentUser
        ? firebase.auth().currentUser.photoURL
        : null,
      userzip: null,
      uid: firebase.auth().currentUser ? firebase.auth().currentUser.uid : null,
      location: null,
      errorMessage: null,
      usercityobject: null,
      instrumentList: [],
      genreList: []
    };
  }

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

  _getCity = async () => {
    Expo.Location.reverseGeocodeAsync(this.state.usercityobject)
      .then(result => {
        let reverseResult = result;
        this.setState({ userzip: reverseResult[0].postalCode });
        let userId = firebase.auth().currentUser.uid;
        firebase
          .database()
          .ref("users")
          .child(userId)
          .child("zipcode")
          .set(reverseResult[0].postalCode);
      })
      .catch(error => {
        console.log("there was an error :-(", error);
      });
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
    let usercityobject = {
      latitude: thislat,
      longitude: thislong
    };
    this.setState({ usercityobject: usercityobject });
  };

  componentDidMount = () => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync().then(this._getCity);
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
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <Container>
        <Grid>
          <Row>
            <ProfileTop
              username={this.state.username}
              userphoto={this.state.userphoto}
            />
            <View style={{ marginRight: 10 }}>
              <TouchableOpacity onPress={() => navigate("ProfileEdit")}>
                <Icon name="menu" />
                <Text>Edit</Text>
              </TouchableOpacity>
            </View>
          </Row>
          <Row>
            <Col>
              <Instruments instruments={this.state.instrumentList} />
            </Col>
            <Col>
              <Genres genres={this.state.genreList} />
            </Col>
          </Row>
        </Grid>
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
