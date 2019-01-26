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
      formContent: "",
      messages: []
    };
    //   handleShowCreateMessageModal = () => {
    //     this.setState({
    //       isCreateMessageModalVisible: true
    //     });
    //   };
    // }
    // handleDismissCreateMessageModal = () => {
    //   this.setState({
    //     isCreateMessageModalVisible: false
    //   });
  }

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
    ref.orderByKey().on("child_added", snapshot => {
      this.setState(previousState => ({
        messages: [...previousState.messages, snapshot.toJSON()]
      }));
      console.log("this is messages state", this.state.messages);
    });
  }
  componentWillUnmount() {}

  render() {
    const { navigate } = this.props;
    let messages = this.state.messages;
    // const username = navigate.getParam(firstname, "nothing came over");

    return (
      <Container>
        <Content>
          <FlatList
            data={messages}
            extraData={this.state.refresh}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <List>
                <ListItem>
                  <View style={{ margin: 10 }}>
                    <Text>
                      {item.user !== firebase.auth().currentUser.uid ||
                      !item.user
                        ? this.props.navigation.getParam("firstname")
                        : firebase.auth().currentUser.displayName}
                    </Text>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ paddingRight: 20 }}>{item.message}</Text>
                  </View>
                </ListItem>
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

// <View style={{ marginRight: 15 }}>
// <Text>
//   {item.user !== firebase.auth().currentUser.uid
//     ? this.props.navigation.getParam("firstname")
//     : null}
// </Text>
// </View>
// <View style={{ margin: 10 }}>
// <Text>{item.message}</Text>
// </View>
// <View style={{ marginLeft: 15 }}>
// <Text>
//   {item.user === firebase.auth().currentUser.uid
//     ? firebase.auth().currentUser.displayName
//     : null}
// </Text>
// </View>

{
  /* <Button onPress={() => handleShowCreateMessageModal()}> */
}
{
  /* <Text>Test me</Text> */
}
{
  /* </Button> */
}
{
  /* <CreateMessageModal */
}
// isVisible={this.state.isCreateMessageModalVisible}
// onBackdropPress={this.handleDismissCreateMessageModal}
{
  /* /> */
}
