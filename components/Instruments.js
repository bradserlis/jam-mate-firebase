import React, { Component } from "react";
import styles from "./styles";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Alert,
  Image,
  Platform,
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
  Footer,
  FooterTab,
  Thumbnail
} from "native-base";

export default class Instruments extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    if (this.props.instruments) {
      return (
        <View style={{ alignItems: "center" }}>
          <H2 style={styles.profileHeaderText}> Instruments </H2>
          <FlatList
            data={this.props.instruments}
            extraData={this.props.instruments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      padding: 4,
                      marginBottom: 6,
                      borderRadius: 10,
                      borderColor: "dodgerblue",
                      borderWidth: 1,
                      flexDirection: "row",
                      alignSelf: "center"
                    }}
                  >
                    <Text style={styles.profileListText}>{item}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      );
    }
    return (
      <View>
        <H2>Instruments:</H2>
        <Text> none currently</Text>
      </View>
    );
  }
}
