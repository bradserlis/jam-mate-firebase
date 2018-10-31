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
import * as Animatable from "react-native-animatable";
import styles from "./styles";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersArray: [],
      isCreateMessageModalVisible: false
    };
    handleShowCreateMessageModal = () => {
      this.setState({
        isCreateMessageModalVisible: true
      });
    };
  }
  handleDismissCreateMessageModal = () => {
    this.setState({
      isCreateMessageModalVisible: false
    });
  };

  static navigationOptions = ({ navigation }) => ({
    title: "Search",
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
    handleShowCreateMessageModal();
    let newList = [];
    let ref = firebase.database().ref("/users/");
    ref
      .orderByKey()
      .once("value")
      .then(snapshot => {
        snapshot.forEach(userSnapshot => {
          if (userSnapshot.key !== currentUser) {
            let myObj = {};
            myObj["userid"] = userSnapshot.key;
            myObj["data"] = userSnapshot;
            newList.push(myObj);
          }
        });
        this.setState({
          usersArray: newList
        });
      });
  };

  _getArray = users => {
    let results = [];

    // Loop through each user
    users.forEach(function(originalObj, idx) {
      let obj = originalObj.data.toJSON();
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
      });
    });

    return results;
  };

  render() {
    const { navigate } = this.props.navigation;
    let users = this.state.usersArray;
    var results = this._getArray(users);

    return (
      <Container>
        <Content>
          <H2 style={styles.notchCompensation}> Search Page </H2>
          <FlatList
            data={results}
            extraData={results}
            keyExtractor={item => item.userid}
            renderItem={({ item, index }) => (
              <List listKey={item.userid}>
                <ListItem avatar>
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
                    />
                    <Text style={{ marginBottom: 5, marginTop: 20 }}>
                      additional text
                    </Text>
                  </Body>
                  <Right />
                </ListItem>
              </List>
            )}
          />
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
