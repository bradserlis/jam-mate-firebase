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

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { navigation } = this.props;
    const username = navigation.getParam("name", "name-goes-here");
    const messages = navigation
      .getParam("messages", null)
      // filter to only show item.user which matches username (declared above)
      .filter((item, index, arr) => item.user == username)
      // and...now map all of that users' messages into an array, to render
      .map(item => item.message);
    console.log("username passed?", username);
    console.log("messages passed?", messages);

    return (
      <Container>
        <Content>
          <FlatList
            data={messages}
            extraData={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <List>
                <ListItem>
                  <Text> {item} </Text>
                </ListItem>
              </List>
            )}
          />
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
