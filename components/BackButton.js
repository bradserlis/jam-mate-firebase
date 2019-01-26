import React from "react";
import { Button } from "react-native";
import { withNavigation } from "react-navigation";

class BackButton extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <Button
        title="Back"
        onPress={() => {
          this.props.navigation.goBack();
        }}
      />
    );
  }
}

export default withNavigation(BackButton);
