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
  Separator,
  Toast
} from "native-base";
import styles from "./styles";
import BackButton from "./BackButton";
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

  // static navigationOptions = {
  //   title: "Edit Profile",
  //   headerStyle: {
  //     backgroundColor: "#007bff"
  //   },
  //   headerTintColor: "#fff",
  //   headerTitleStyle: {
  //     fontWeight: "bold"
  //   },

  // };

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
    let userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("/users/" + userId)
      .child("contactinfo")
      .set(this.state.contactinfo)
      .then(() => {
        Toast.show({
          text: "Contact Info Updated",
          type: "success",
          duration: 1750
        });
      });
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

    return (
      <Container>
        <Content>
          <View>
            <View>
              <Form>
                <Item>
                  <Label> Contact Info</Label>
                  <Input
                    onChangeText={formContent =>
                      this.setState({
                        contactinfo: formContent
                      })
                    }
                    value={this.state.contactinfo}
                  />
                  <Button
                    style={styles.addIconStyle}
                    onPress={() => this._addContactInfo(this.state.contactinfo)}
                  >
                    <Text style={{ color: "white" }}> Update </Text>
                  </Button>
                </Item>
              </Form>
            </View>
            <View>
              <InstrumentAdder userId={userId} />
            </View>
            <View>
              <GenreAdder userId={userId} />
            </View>

            <View style={(styles.centerMe, styles.backView)}>
              <Button
                style={styles.backButton}
                info
                onPress={() => this.props.navigation("Home")}
              >
                <Icon name="ios-home" />
                <Text style={{ color: "white" }}> Go Back </Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

// const styles = StyleSheet.create({
//   buttons: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     flexWrap: "wrap",
//     flexDirection: "column"
//   }
// });
