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

  _getMessagers = messagerObjects => {
    let ref = firebase.database().ref("/users/");
    // Loop through each user for id
    ref
      .orderByKey()
      .once("value")
      .then(snapshot => {
        let userQueryResults = snapshot.toJSON();

        let messagerIds = Object.keys(messagerObjects);
        // let users = userIds.map(id => {
        //   let user = snapshot.toJSON()[id];
        //   user.key = id;
        //   return user;
        // });
        // let usersWithRooms = users.filter(user => {
        //   const hasRoom = messagerIds.some(id => id == user.key);
        //   return hasRoom;
        // });
        // map through messagerIds
        let messagerInfo = messagerIds.map(userid => {
          console.log("userid:", userid);
          let messager = userQueryResults[userid];
          console.log("messager:", messager);
          return {
            userid,
            firstname: messager.firstname,
            lastname: messager.lastname,
            roomId: messagerObjects[userid]
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
      const messageRooms = snapshot.toJSON();
      // console.log("messagersIds before _getMessagers", messagersIds);
      this._getMessagers(messageRooms);
    });
  }

  render() {
    const { navigate } = this.props.navigation;

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
              <TouchableOpacity
                style={{ marginBottom: 5, marginTop: 20 }}
                onPress={() => {
                  navigate("MessagesIndividual", {
                    firstname: item.firstname,
                    lastname: item.lastname,
                    roomId: item.roomId,
                    userId: item.userId
                  });
                }}
              >
                <Text>
                  {" "}
                  {item.userid}
                  {item.firstname} {item.lastname} {item.roomId}{" "}
                </Text>
              </TouchableOpacity>
            )}
          />
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
