import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, ImageBackground, Alert, Image, Platform, TouchableOpacity} from 'react-native';
import { Card, CardImage, CardItem, Container, Content, Header, Form, Input, Icon, Item, Button,
 Label, Left, List, ListItem, Body, Right, Title, H3, H2, Grid, Col, Row, Footer, FooterTab, Thumbnail, Ul, Li} from 'native-base';
 import FooterTabs from './Footer';
 import SearchProfilesInstruments from './SearchProfilesInstruments';
 import SearchProfilesGenres from './SearchProfilesGenres';
 import * as firebase from 'firebase';
 import * as Animatable from 'react-native-animatable';


var users1 = [
  {
    name:'bob test1',
    instruments:[
      {89789:'guitar'},
      {87123:'bass'},
      {87321:'drums'}
    ],
    genres:[
      {77777:'rock'},
      {77776:'roll'},
      {77775:'country'}
    ]
  },
  {
  name:'sally test2',
  instruments:[
    {999111:'bass'},
    {111999:'tamborine'}
  ],
  genres:[
    {66665:'bluegrass'},
    {66664:'polka'}
  ]
  }
]


export default class Search extends Component{
  constructor(props){
    super(props);
    this.state={
      usersArray: []
    }



  }
  
  static navigationOptions = ({navigation}) => ({
    title: 'Home',
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
  

  componentDidMount(){
    let newList=[];
    let that = this;
    let ref = firebase.database().ref('/users/');
    ref.orderByKey().once("value").then(function(snapshot) {
      snapshot.forEach(function(userSnapshot){
      let myObj = {}
        console.log('userSnapShot')
      myObj['userid'] = userSnapshot.key
      myObj['data'] = userSnapshot
      newList.push(myObj)
        console.log('how did the newList push end up?')
      })
      console.log('newList.push(snapshot)')
      console.log('things getting pushed?')
      that.setState({
        usersArray: newList,
      })
      console.log('after each setstate')
    })
    console.log('users array check!')
    console.log('did mount check on usersArray')
  }


  render(){
    const { navigate } = this.props.navigation;


    let user = users1[0];
    let instrumentArray = Object.keys(user.instruments)

    var mappedInstruments = instrumentArray.map( function(instrument, index) {
        return <Text key={index}>{instrument}</Text>;
    })

    users1[0].instruments.forEach(function(itemObj, i){
      Object.keys(itemObj).forEach(function(indiviualItem, j){
      console.log('i+j+1, itemObj[indiviualItem]');
      });
    });
    console.log('users array?', this.state.usersArray[0])

    console.log('object.keys(users1[0].instruments')
    console.log('below')
    for (key in this.state.usersArray[0]){
      for (deeper in key){
        console.log('this is...deeper?', deeper)
      }
      console.log('here is a key', key)
    }


    return(
      <Container>
      <Content>
      <H2> Search Page </H2>
      <FlatList 
              data={this.state.usersArray}
              extraData={this.state.usersArray}
              keyExtractor={(item, index) => item.userid}
              renderItem={({item, index}) => 
            <List
              listKey={index}
              >
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: item.data.userphoto }} />
              </Left>
              <Body>
              <Text>{item.userid}</Text>

                <SearchProfilesInstruments instruments={item.instruments|| []} genres={item.genres||[]} name={item.name||[]} />

                <Text style={{marginBottom:5, marginTop:20}}>additional text</Text>
              </Body>
              <Right>
              </Right>
            </ListItem>
          </List>
    
              }
              >
    </FlatList>

      </Content>

          <Footer>
          <FooterTab>
            <Button >
              <Text>Profile</Text>
            </Button>
            <Button>
              <Text>Search</Text>
            </Button>
            <Button>
              <Text>Messages</Text>
            </Button>
            <Button>
              <Text>somethingelse</Text>
            </Button>
          </FooterTab>
        </Footer>
    </Container>
    )
  }
}


