import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  ImageBackground,
  Alert,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Content,
  Header,
  Footer,
  FooterTab,
  Form,
  Icon,
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
  List,
  ListItem,
  CheckBox,
  Separator,
  Thumbnail
} from "native-base";
import FooterNav from "./FooterNav";
import CreateMessage from "./CreateMessage";
import MessagesIndividual from "./MessagesIndividual";
import * as firebase from "firebase";
import styles from "../common/styles/styles";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      formContent: "",
      messagerObject: [],
      messagers: []
    };
  }

  static navigationOptions = {
    title: "Messages",
    headerLeft: null,
    headerStyle: {
      backgroundColor: "#007bff"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  componentWillMount() {}

  _getMessagers = messagerObjects => {
    let ref = firebase.database().ref("/users/");
    // Loop through each user for id
    ref
      .orderByKey()
      .once("value")
      .then(snapshot => {
        let userQueryResults = snapshot.toJSON();

        let messagerIds = Object.keys(messagerObjects);

        // map through messagerIds
        let messagerInfo = messagerIds.map(userid => {
          let messager = userQueryResults[userid];
          return {
            userid,
            firstname: messager.firstname,
            lastname: messager.lastname,
            roomId: messagerObjects[userid],
            userphoto: messager.userphoto
          };
        });
        this.setState({
          messagers: messagerInfo
        });
      });
  };

  componentDidMount() {
    let ref = firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .child("messagerooms");
    // let messagersIds = [];
    let messagerObjects = {};
    ref.once("value").then(snapshot => {
      if (snapshot.toJSON() === null) {
        console.log("this was null", snapshot.toJSON());
        return;
      } else {
        const messageRooms = snapshot.toJSON();
        this._getMessagers(messageRooms);
      }
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    let messages = this.state.messages;
    let messagers = this.state.messagers;

    return (
      <Container>
        <Content>
          <H2 style={styles.notchCompensation}>Messages </H2>
          {messagers.length < 1 ? (
            <View style={{ margin: 20 }}>
              <Text style={styles.modalTitleText}>No Messages</Text>
            </View>
          ) : (
            <FlatList
              data={messagers}
              extraData={messagers}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <List>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail source={{ uri: item.userphoto }} />
                    </Left>
                    <Body>
                      <TouchableOpacity
                        style={{ marginBottom: 5, marginTop: 20 }}
                        onPress={() => {
                          navigate("MessagesIndividual", {
                            firstname: item.firstname,
                            lastname: item.lastname,
                            roomId: item.roomId,
                            userId: item.userid,
                            navigate: navigate
                          });
                        }}
                      >
                        <Text>
                          {" "}
                          {item.firstname} {item.lastname}{" "}
                        </Text>
                      </TouchableOpacity>
                    </Body>
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

Messages.defaultProps = {
  messages: []
};
// <Footer>
//   <FooterTab>
//     <Button onPress={() => navigate("Home")}>
//       <Icon name="contact" />
//       <Text>Profile</Text>
//     </Button>
//     <Button onPress={() => navigate("Search")}>
//       <Icon name="people" />
//       <Text>Search</Text>
//     </Button>
//     <Button>
//       <Icon name="chatboxes" />
//       <Text>Messages</Text>
//     </Button>
//   </FooterTab>
// </Footer>
