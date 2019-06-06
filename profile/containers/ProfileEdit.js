import React, { Component } from "react";
import {
  Container,
} from "native-base";
import ProfileEditContainer from "./ProfileEditContainer";

export default class ProfileEdit extends Component {
  
  componentDidMount = () => {};

  componentDidUnMount = () => {};

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <ProfileEditContainer navigation={navigate} />
      </Container>
    );
  }
}
