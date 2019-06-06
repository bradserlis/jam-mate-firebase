import React, { Component } from "react";
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
  Badge,
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
import styles from "../../common/styles/styles";

export default class Genres extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    if (this.props.genres) {
      return (
        <View style={{ flex: 1 }}>
          <View>
            <H2 style={styles.profileHeaderText}> Genres</H2>
          </View>
          <View style={styles.badgeList}>
            {this.props.genres.map((genre, index) => (
              <Badge
                primary
                style={{ marginRight: 5, marginBottom: 10 }}
                key={genre.key}
              >
                <TouchableOpacity>
                  <Text style={{ color: "white" }}>{genre.val()}</Text>
                </TouchableOpacity>
              </Badge>
            ))}
          </View>
        </View>
      );
    }
    return (
      <View>
        <H2>Genres:</H2>
        <Text> none currently</Text>
      </View>
    );
  }
}
