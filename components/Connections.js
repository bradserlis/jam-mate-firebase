import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, ImageBackground, Alert, Image, Platform, TouchableOpacity} from 'react-native';
import { Card, CardImage, CardItem, Container, Content, Header, Form, Input, Icon, Item, Button,
 Label, Left, List, ListItem, Body, Right, Title, H3, H2, Grid, Col, Row, Footer, FooterTab, Thumbnail, Ul, Li} from 'native-base';
 import FooterNav from './FooterNav';
 import SearchProfilesCard from './SearchProfilesCard';
 import SearchProfilesGenres from './SearchProfilesGenres';
 import CreateMessageModal from './CreateMessageModal';
 import * as firebase from 'firebase';
 import * as Animatable from 'react-native-animatable';

export default class Connections extends Component{
  constructor(props){
    super(props);
    this.state={
      usersArray: [],
      contactinfo: [],
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Connections',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#007bff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });



  componentWillMount= () =>{
  }
  

  componentDidMount=()=>{
    let newList=[];
    let userId = firebase.auth().currentUser.uid;
    let that = this;
    let ref = firebase.database().ref('/users/'+userId).child('connectedusers')
    ref.orderByKey().once("value").then(function(snapshot) {
      snapshot.forEach(function(userSnapshot){
        console.log('here is a usersnapshot', userSnapshot)
        newList.push(userSnapshot)
      })
      that._getArray(newList)
    })
  }



   _getArray=(connectedusersids)=>{
    let ref = firebase.database().ref('/users/');
    // Loop through each user for id
    let idlist = connectedusersids.map((id)=>{
      return id.toJSON()
    })
    ref.orderByKey().once('value').then((snapshot) => {
      let userIds = Object.keys(snapshot.toJSON());
      let users = userIds.map((id) => {
        let user = snapshot.toJSON()[id];
        user.key = id;
        return user;
      })
      let connectedusers = users.filter((item) => {
        const isConnectedUser = idlist.some((id) => id == item.key) 
        return isConnectedUser;
      })
      let contactinfo = connectedusers.map((user)=> {
        return {
          firstname: user.firstname,
          lastname: user.lastname, 
          contactinfo: user.contactinfo
        } 
      });
      this.setState({
        contactinfo: contactinfo
      })
    }); 
  }



  render(){
    const { navigate } = this.props.navigation;
    console.log('this is users array in render', this.state.usersArray)

    return(
      <Container>
      <Content>
        <H2> Connections </H2>
        <FlatList 
                data={this.state.contactinfo}
                extraData={this.state.contactinfo}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => 
                  <List>
                  <ListItem>
                      <TouchableOpacity 
                      style={{marginBottom:5, marginTop:20}}
                      >
                      <Text> {item.firstname} {item.lastname} : {item.contactinfo} </Text>
                      </TouchableOpacity>
                  </ListItem>
                </List>    
                }
        >
        </FlatList>
      </Content>


      <Footer>
      <FooterTab>
        <Button
          onPress={
          () => navigate('Home')
          }
        >
        <Icon name="contact" />
          <Text>Profile</Text>
        </Button>
        <Button>
        <Icon name="people" />
          <Text>Search</Text>
        </Button>
        <Button
          onPress={
            ()=> navigate('Messages')
          }
        >
        <Icon name="chatboxes" />
          <Text>Messages</Text>
        </Button>
        
      </FooterTab>
      </Footer>
      </Container>
    )
  }
}


