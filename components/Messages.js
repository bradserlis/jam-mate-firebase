import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Alert, Image, FlatList, TouchableOpacity} from 'react-native';
import { Container, Content, Header, Footer, FooterTab, Form, Icon, Input, Item, Button,
 Label, Left, Body, Right, Title, H3, H2, Grid, Col, Row, List, ListItem, CheckBox, Separator } from 'native-base';
 import FooterNav from './FooterNav';
 import MessagesIndividual from './MessagesIndividual';
 import * as firebase from 'firebase';
 import { GiftedChat } from 'react-native-gifted-chat';


 export default class Messages extends Component{
  constructor(props){
    super(props);
    this.state={
      messages:[],
      messagers: [
      {
        user:'test1',
      }],
    }
    _getMessages = () =>{
      
    }
  }

  static navigationOptions = {
    title: 'Messages',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#007bff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentWillMount() {
        this.setState({
      messages: 
      [
        {
          user:'Michael',
          message:'Hey man, this is my first message to you',
          timestamp:new Date()
        },
        {
          user:'Michael',
          message:'I felt like I should send you another, actually',
          timestamp:new Date()
        },
        {
          user:'test1',
          message:'Hi I am a user too - lets play music',
          timestamp:new Date()
        },
        {
          user:'Michael',
          message:'Wanted to see how this organized, since test1 messaged between',
          timestamp:new Date()
        }
      ]
    })
  }


  onSend(messages = []) {
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }))
  }

  componentDidMount(){
    _getMessages()
  }


  render(){
    const { navigate } = this.props.navigation;
    let messagersList = this.state.messages
      .map((item => item.user))
      .filter((item, index, arr) => arr.indexOf(item) == index) 
      console.log('here is that messagersList', messagersList)
    let messages = this.state.messages;

    return(
      <Container>
        <Content>
        <FlatList 
                data={messagersList}
                extraData={messagersList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => 
                  <List>
                  <ListItem>
                      <TouchableOpacity 
                      style={{marginBottom:5, marginTop:20}}
                      onPress={
                        ()=> navigate('MessagesIndividual', 
                          {
                            'name':item,
                            'messages':messages,
                          })
                      }
                      >
                      <Text> {item} </Text>
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
            <Button
              onPress={
                () => navigate('Search')
              }
            >
            <Icon name='people' />
              <Text>Search</Text>
            </Button>
            <Button>
            <Icon name="chatboxes" />
              <Text>Messages</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>

      )
  }

}

Messages.defaultProps={
  messages:[]
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
