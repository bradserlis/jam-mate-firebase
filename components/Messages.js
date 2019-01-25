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
      messages: [],
      messagers: [
        {
          user: "test1"
        }
      ]
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

  _getMessages = () => {};

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

  componentDidMount() {
    // let ref = firebase.database().ref("/messages/");
    // ref.on("child_added", snapshot => {
    //   this.setState(previousState => ({
    //     messages: [...previousState.messages, snapshot.val()]
    //   }));
    // });
  }

  render() {
    const { navigate } = this.props.navigation;
    let messagersList = this.state.messages
      .map(item => item.user)
      .filter((item, index, arr) => arr.indexOf(item) == index);
    // console.log("here is that messagersList", messagersList);
    let messages = this.state.messages;

    return (
      <Container>
        <Content>
          <H2>Messages </H2>
          <FlatList
            data={messages}
            extraData={this.state.refresh}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <List>
                <Text> {item} </Text>
              </List>
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
