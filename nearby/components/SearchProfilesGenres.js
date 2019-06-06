import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, ImageBackground, Alert, Image, Platform, TouchableOpacity, ScrollView} from 'react-native';
import { Card, CardImage, CardItem, Container, Content, Header, Form, Input, Icon, Item, Button,
 Label, Left, List, ListItem, Body, Right, Title, H3, H2, Grid, Col, Row, Footer, FooterTab, Thumbnail} from 'native-base';
 import * as firebase from 'firebase';
 import * as Animatable from 'react-native-animatable';

export default class SearchProfilesGenres extends Component{
constructor(props){
    super(props);
    this.state={

    }
  }

  render(){
    let genreContainer = this.props.genres
//     let genreArr = [];
//     this.props.genres.forEach(function(itemObj, i){
//       Object.keys(itemObj).forEach(function(individualItem, j){
//         let myObj = {}
//         myObj['key'] = itemObj[individualItem]
//         genreArr.push(myObj)
//         console.log('heres your genrearr updated', genreArr)
//   }
//   )
// });

    return(
      <View>
        <Card>
          <CardItem>
            <Body>
              <FlatList
                data={genreContainer}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index})=>
                  { 
                    return (
                      <List>
                        <ListItem listKey={'c' + index.toString()}>
                          <Text>{item}</Text>
                        </ListItem>
                      </List>
                      );
                  }}
              >
              </FlatList>
            </Body>
          </CardItem>
        </Card>
      </View>

    )
  }
}
