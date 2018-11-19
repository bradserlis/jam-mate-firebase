import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  Image,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Content,
  Header,
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
  Badge
} from "native-base";
import FooterNav from "./FooterNav";
import styles from "./styles";
import * as firebase from "firebase";

var tempInstrumentList = [];

export default class InstrumentAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formContent: "",
      instrumentList: [],
      refresher: false
    };
  }

  _addInstrument = () => {
    let userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("/users/" + userId)
      .child("instruments")
      .push(this.state.formContent);
    this.setState({
      formContent: ""
    });
  };

  _removeInstrument = (key, index) => {
    refreshCheck = this.state.refresher;
    let tempList = this.state.instrumentList;
    let userId = this.props.userId;
    let ref = firebase
      .database()
      .ref("/users/" + userId)
      .child("instruments");
    tempList.splice(index, 1);
    this.setState({
      refresher: !refreshCheck
    });
    ref.child(key).remove();
  };

  componentDidMount = () => {
    let ref = firebase
      .database()
      .ref("/users/" + this.props.userId)
      .child("instruments");
    ref.orderByKey().on("child_added", snapshot => {
      this.setState(previousState => ({
        instrumentList: [...previousState.instrumentList, snapshot]
      }));
    });
  };

  render() {
    return (
      <Container>
        <Content>
          <Form style={{ flex: 1, flexDirection: "row" }}>
            <Input
              placeholder="Enter New Instrument..."
              onChangeText={formContent => this.setState({ formContent })}
              value={this.state.formContent}
              style={{ width: "80%" }}
            />
            <Button onPress={() => this._addInstrument()}>
              <Icon name="add" />
            </Button>
          </Form>

          <View style={styles.badgeList}>
            {this.state.instrumentList.map((instrument, index) => (
              <Badge
                primary
                style={{ marginRight: 5, marginBottom: 10 }}
                key={instrument.key}
              >
                <TouchableOpacity
                  onPress={() => this._removeInstrument(instrument.key, index)}
                >
                  <Text style={{ color: "white" }}>
                    {instrument.val()} &times;
                  </Text>
                </TouchableOpacity>
              </Badge>
            ))}
          </View>
        </Content>
      </Container>
    );
  }
}
