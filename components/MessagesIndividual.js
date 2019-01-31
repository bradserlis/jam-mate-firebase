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
import { withNavigation } from "react-navigation";

import styles from "./styles";

import FooterNav from "./FooterNav";
import BackButton from "./BackButton";
import CreateMessageModal from "./CreateMessageModal";
import * as firebase from "firebase";

class MessagesIndividual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateMessageModalVisible: false,
      formContent: "",
      messages: [],
      refresh: false
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
      this.setState({
        refresh: !this.state.refresh
      });
    });
  }
  componentWillUnmount = () => {
    this.setState({
      refresh: !this.state.refresh
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    let messages = this.state.messages;
    let messageColor = "";

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
                  <View style={{ flex: 1 }}>
                    {item.user === firebase.auth().currentUser.uid ||
                    !item.user ? (
                      <View
                        borderStyle={"solid"}
                        borderColor={"rgb(87, 214, 49)"}
                        borderWidth={1}
                        borderRadius={20}
                        style={{
                          padding: 10,
                          backgroundColor: "rgb(87, 214, 49)",
                          alignItems: "flex-end"
                        }}
                      >
                        <View style={{ flexDirection: "reverse-row" }}>
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            {firebase.auth().currentUser.displayName}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginRight: 10,
                            flex: 1,
                            alignSelf: "flex-end"
                          }}
                        >
                          <Text
                            style={{
                              flexWrap: "wrap",
                              textAlign: "right",
                              color: "white"
                            }}
                          >
                            {item.message}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View
                        borderStyle={"solid"}
                        borderColor={"rgb(54, 143, 226)"}
                        borderWidth={1}
                        borderRadius={20}
                        style={{
                          padding: 10,
                          backgroundColor: "rgb(54, 143, 226)",
                          alignItems: "flex-start"
                        }}
                      >
                        <View>
                          <Text style={{ color: "white" }}>
                            {this.props.navigation.getParam("firstname")}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: 10,
                            flex: 0.8
                          }}
                        >
                          <Text
                            style={{
                              flex: 1,
                              flexWrap: "wrap",
                              color: "white"
                            }}
                          >
                            {item.message}
                          </Text>
                        </View>
                      </View>
                    )}
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
          <View style={(styles.centerMe, styles.backView)}>
            <Button
              style={styles.backButton}
              info
              onPress={() => navigate("Messages")}
            >
              <Icon name="ios-arrow-dropleft" />
              <Text style={{ color: "white" }}>Back</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default withNavigation(MessagesIndividual);

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

{
  /* <View>
<Text>
  {item.user === firebase.auth().currentUser.uid ||
  !item.user
    ? firebase.auth().currentUser.displayName
    : this.props.navigation.getParam("firstname")}
</Text>
</View>
<View
style={{
  marginLeft: 10,
  flexDirection: "column",
  flex: 0.8
}}
>
<Text
  style={{
    flex: 1,
    flexWrap: "wrap",
    textAlign: "center"
  }}
>
  {item.message}
</Text>
</View> */
}
