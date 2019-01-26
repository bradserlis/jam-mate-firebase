import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
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
import CreateMessageModal from "./CreateMessageModal";
import * as firebase from "firebase";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateMessageModalVisible: false,
      formContent: ""
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

  _addMessage = () => {
    let messageRoomId = this.props.navigation.getParam("roomId", null);
    // let key = firebase
    //   .database()
    //   .ref("/rooms/" + messageRoomId)
    //   .child("messages")
    //   .push().key;
    let ref = firebase
      .database()
      .ref("/rooms/" + messageRoomId)
      .child("/messages/" + Date.now());
    ref.child("message").set(this.state.formContent);
    ref.child("user").set(firebase.auth().currentUser.uid);

    this.setState({
      formContent: "",
      refresh: !this.state.refresh
    });
  };

  static navigationOptions = {
    title: "message to someone",
    headerStyle: {
      backgroundColor: "#007bff"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  componentWillMount() {}

  componentDidMount() {
    let messageRoomId = this.props.navigation.getParam("roomId", null);
    let ref = firebase
      .database()
      .ref("/rooms/" + messageRoomId)
      .child("messages");

    // const username = navigate.getParam("firstname", "name-goes-here");
    // const messages = navigate
    //   .getParam("messages", null)
    //   // filter to only show item.user which matches username (declared above)
    //   .filter((item, index, arr) => item.user == username)
    //   // and...now map all of that users' messages into an array, to render
    //   .map(item => item.message);
    // console.log("username passed?", username);
    // console.log("messages passed?", messages);
  }
  componentWillUnmount() {}

  render() {
    const { navigate } = this.props;
    // const username = navigate.getParam(firstname, "nothing came over");
    let messages = ["hey i am a message"];

    return (
      <Container>
        <Content>
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
          <Button onPress={() => handleShowCreateMessageModal()}>
            <Text>Test me</Text>
          </Button>
          <CreateMessageModal
            isVisible={this.state.isCreateMessageModalVisible}
            onBackdropPress={this.handleDismissCreateMessageModal}
          />
        </Content>
      </Container>
    );
  }
}

/* <FlatList
  data={messages}
  extraData={messages}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item, index }) => (
    <List>
      <ListItem>
        <Text> {item} </Text>
      </ListItem>
    </List>
/> */
