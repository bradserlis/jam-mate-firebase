import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Alert, Image, FlatList, TouchableOpacity} from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button,
 Label, Left, Body, Right, Title, H3, H2, Grid, Col, Row, List, ListItem, CheckBox, Separator } from 'native-base';
 import FooterTabs from './Footer'
 import InstrumentAdder from './InstrumentAdder'
 import * as firebase from 'firebase';

 export default class ProfileEdit extends Component{
  constructor(props){
    super(props);
    this.state={
      toggle:false,
      userzip:null,
      instruments:null,
      genres:null
    }
  }

  _onPress(){
    let newState = !this.state.toggle;
    this.setState({
      toggle:newState
    })
  }

  _onStateChange(newState){
    this.setState({toggleState:value})
  }

  static navigationOptions = {
    title: 'Edit Profile',
    headerStyle: {
      backgroundColor: '#007bff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  checkBoxTest(){
    alert('value changed')
  }

  componentWillMount(){
      let that = this;
      let userId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/'+ userId).child('zipcode').once('value').then((function(snapshot){
      let userzip = (snapshot.val() || '');
      that.setState({
        userzip:userzip
      })
      }));
  }

  componentDidMount(){
  }

  render(){
        const { navigate } = this.props.navigation;
        const { toggle } = this.state
        const textValue = toggle?"On":"Off";
        const buttonBg = toggle?"dodgerblue":"white";
        const textColor = toggle?"white":"black";
        let userId = firebase.auth().currentUser.uid;

        let items = [
        'Guitar',
        'Bass',
        'Drums',
        'Vocals (aggressive)',
        'Vocals'
        ]


    return(

      <Container>
          <H3>Your current location: </H3> 
          <Text> {this.state.userzip} </Text>
          <H3>Instruments You Play: </H3>       
          <View style={styles.buttons}   >
          <Grid>
            <Row>
              <InstrumentAdder userId={userId}/>
            </Row>
            <Row>
              <H3>Genres You Play: </H3>
            </Row>
          </Grid>
          </View>
      </Container>

      )
  }

}

const styles = StyleSheet.create({
  buttons: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexWrap: 'wrap', 
    flexDirection:'column',
   },
});
