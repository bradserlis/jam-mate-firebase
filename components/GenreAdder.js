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
  Form,
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
  Icon
} from "native-base";
import FooterNav from "./FooterNav";
import styles from "./styles";
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
    let newList = [];
    let ref = firebase
      .database()
      .ref("/users/" + this.props.userId)
      .child("genres");
    ref.orderByKey().on("child_added", snapshot => {
      newList.push(snapshot);
      this.setState({
        genreList: newList
      });
    });
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Input
              placeholder="Genres..."
              onChangeText={formContent => this.setState({ formContent })}
              value={this.state.formContent}
            />
            }
            <Button onPress={() => this._addGenre()}>
              <Icon name="add" />
            </Button>
          </Form>

          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <List>
              <FlatList
                extraData={this.state.refresher}
                style={{ flexDirection: "row" }}
                data={this.state.genreList}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => this._removeGenre(item.key, index)}
                    style={styles.addIconStyle}
                  >
                    <Text style={{ textAlign: "center", letterSpacing: 1.5 }}>
                      {item.val()}
                      <Icon name="close" style={{ textAlign: "right" }} />
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.key}
              />
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}
