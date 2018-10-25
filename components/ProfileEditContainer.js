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
import InstrumentAdder from "./InstrumentAdder";
import GenreAdder from "./GenreAdder";
import * as firebase from "firebase";

export default class ProfileEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      userzip: null,
      contactinfo: "",
      formContent: "",
      instruments: null,
      genres: null
    };
  }

  _onPress() {
    let newState = !this.state.toggle;
    this.setState({
      toggle: newState
    });
  }

  _onStateChange(newState) {
    this.setState({ toggleState: value });
  }

  _addContactInfo = contact => {
    console.log("will add contact info", contact);
    let userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("/users/" + userId)
      .child("contactinfo")
      .set(this.state.formContent);
    this.setState({
      contactinfo: this.state.formContent,
      formContent: ""
    });
  };

  static navigationOptions = {
    title: "Edit Profile",
    headerStyle: {
      backgroundColor: "#007bff"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  checkBoxTest() {
    alert("value changed");
  }

  componentDidMount = () => {
    let userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("/users/" + userId)
      .once("value")
      .then(snapshot => {
        const user = snapshot.val();
        console.log("this is what it thinks user is", user);
        console.log("this is what it thinks userzip would be", user.zipcode);
        console.log(
          "this is what it thinks contactinfo would be",
          user.contactinfo
        );
        // const contactinfo = user.contactinfo.val();
        this.setState({
          userzip: user.zipcode || "",
          contactinfo: user.contactinfo || ""
        });
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { toggle } = this.state;
    const textValue = toggle ? "On" : "Off";
    const buttonBg = toggle ? "dodgerblue" : "white";
    const textColor = toggle ? "white" : "black";
    let userId = firebase.auth().currentUser.uid;

    let items = ["Guitar", "Bass", "Drums", "Vocals (aggressive)", "Vocals"];

    return (
      <Container>
        <View>
          <Text>Contact info you are sharing:</Text>
        </View>
        <View>
          <Text> {this.state.contactinfo} </Text>
        </View>
        <Form>
          <Item floatingLabel>
            <Label> Update Contact Info</Label>
            <Input
              onChangeText={formContent => this.setState({ formContent })}
              value={this.state.formContent}
            />
          </Item>
          <Button onPress={() => this._addContactInfo(this.state.contactinfo)}>
            <Icon name="add" />
          </Button>
        </Form>
        <InstrumentAdder userId={userId} />
        <GenreAdder userId={userId} />

        <Footer>
          <FooterTab>
            <Button onPress={() => this.props.navigation("Home")}>
              <Icon name="contact" />
              <Text>Return Home</Text>}
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "column"
  }
});
