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
  Input,
  Icon,
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
import styles from "../common/styles/styles";
import * as firebase from "firebase";

var tempGenreList = [];

export default class GenreAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formContent: "",
      genreList: [],
      refresher: false
    };
  }

  _addGenre = () => {
    let userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("/users/" + userId)
      .child("genres")
      .push(this.state.formContent);
    this.setState({
      formContent: ""
    });
  };

  _removeGenre = (key, index) => {
    refreshCheck = this.state.refresher;
    let tempList = this.state.genreList;
    let userId = this.props.userId;
    let ref = firebase
      .database()
      .ref("/users/" + userId)
      .child("genres");
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
      .child("genres");
    ref.orderByKey().on("child_added", snapshot => {
      this.setState(previousState => ({
        genreList: [...previousState.genreList, snapshot]
      }));
    });
  };

  render() {
    return (
      <View>
        <Form style={{ flex: 1, flexDirection: "row" }}>
          <Input
            placeholder="Genres..."
            onChangeText={formContent => this.setState({ formContent })}
            value={this.state.formContent}
            style={{ width: "80%" }}
          />
          <Button onPress={() => this._addGenre()}>
            <Icon name="ios-add" />
          </Button>
        </Form>

        <View style={styles.badgeList}>
          {this.state.genreList.map((genre, index) => (
            <Badge
              primary
              style={{ marginRight: 5, marginBottom: 10 }}
              key={genre.key}
            >
              <TouchableOpacity
                onPress={() => this._removeGenre(genre.key, index)}
              >
                <Text style={{ color: "white" }}>{genre.val()} &times;</Text>
              </TouchableOpacity>
            </Badge>
          ))}
        </View>
      </View>
    );
  }
}
