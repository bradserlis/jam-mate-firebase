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
  Separator
} from "native-base";
import FooterNav from "./FooterNav";
import CreateMessage from "./CreateMessage";
import MessagesIndividual from "./MessagesIndividual";
import * as firebase from "firebase";

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

  //*** WILL BE MOVING TO INDIVIDUAL MESSAGE SCREEN ***
  _addMessage = () => {
    let key = firebase
      .database()
      .ref("/messages/")
      .push().key;
    let ref = firebase.database().ref("/messages/" + Date.now());
    ref.child("message").set(this.state.formContent);
    ref.child("user").set(firebase.auth().currentUser.uid);

    this.setState({
      formContent: "",
      refresh: !this.state.refresh
    });
  };
  //***  ***

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

  componentWillMount() {
    //   {
    //     user: "Michael",
    //     message: "Hey man, this is my first message to you, from Michael",
    //     timestamp: new Date()
    //   },
    //   {
    //     user: "Michael",
    //     message:
    //       "I felt like I should send you another, actually -- still from Michael",
    //     timestamp: new Date()
    //   },
    //   {
    //     user: "test1",
    //     message: "Hi I am a user too - lets play music, from test1",
    //     timestamp: new Date()
    //   },
    //   {
    //     user: "Michael",
    //     message:
    //       "Wanted to see how this organized, since test1 messaged between, from Michael",
    //     timestamp: new Date()
    //   }
    // ]
  }

  _getMessagers = messagersIds => {
    let ref = firebase.database().ref("/users/");
    // Loop through each user for id
    let idlist = messagersIds.map(id => {
      return id;
    });
    ref
      .orderByKey()
      .once("value")
      .then(snapshot => {
        let userIds = Object.keys(snapshot.toJSON());
        let users = userIds.map(id => {
          let user = snapshot.toJSON()[id];
          user.key = id;
          return user;
        });
        let connectedusers = users.filter(item => {
          const isConnectedUser = idlist.some(id => id == item.key);
          return isConnectedUser;
        });
        let messagerInfo = connectedusers.map(user => {
          return {
            firstname: user.firstname,
            lastname: user.lastname
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
    let messagersIds = [];
    let messagerObject = [];
    ref.once("value").then(snapshot => {
      snapshot.forEach(user => {
        let messagerObj = {};
        messagerObj[user.key] = user.val();
        messagerObject.push(messagerObj);
        messagersIds.push(user.key);
      });
      console.log("messagersIds before _getMessagers", messagersIds);
      console.log("messagerObject after didMount", messagerObject);
      this._getMessagers(messagersIds);
    });
    //   messagersIds.forEach(messagerId => {
    //     firebase
    //       .database()
    //       .ref("/users/" + messagerId)
    //       .child("firstname")
    //       .once("value")
    //       .then(firstname => {
    //         messagerNames.push(firstname);
    //       });
    //   });
    //   console.log("messagerNames before setstate:", messagerNames);
    //   this.setState({
    //     messagers: messagerNames
    //   });
    //   console.log("messagerNames at the end?", messagerNames);
    //   console.log("these are the messagers:", this.state.messagers);
    // });
  }

  render() {
    const { navigate } = this.props.navigation;
    // let messagersList = this.state.messages
    //   .map(item => item.user)
    //   .filter((item, index, arr) => arr.indexOf(item) == index);
    // console.log("here is that messagersList", messagersList);
    let messages = this.state.messages;
    let messagers = this.state.messagers;

    return (
      <Container>
        <Content>
          <H2>Messages </H2>
          <FlatList
            data={messagers}
            extraData={this.state.refresh}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={{ marginBottom: 5, marginTop: 20 }}>
                <Text>
                  {" "}
                  {item.firstname} {item.lastname}{" "}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Form style={{ flex: 1, flexDirection: "row" }}>
            <Input
              placeholder="Add Message..."
              onChangeText={formContent => this.setState({ formContent })}
              value={this.state.formContent}
              style={{ width: "80%" }}
            />
            <Button onPress={() => this._addMessage()}>
              <Icon name="ios-add" />
            </Button>
          </Form>
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

// === former messages setup - touchable opacity by name
// <FlatList
// data={messagersList}
// extraData={messagersList}
// keyExtractor={(item, index) => index.toString()}
// renderItem={({ item, index }) => (
// <List>
// <ListItem>
// <TouchableOpacity
// style={{ marginBottom: 5, marginTop: 20 }}
// onPress={() =>
// navigate("MessagesIndividual", {
// name: item,
// messages: messages
// })
// }
// >
// <Text> {item} </Text>
// </TouchableOpacity>
// </ListItem>
// </List>
// )}
// />
// ===
