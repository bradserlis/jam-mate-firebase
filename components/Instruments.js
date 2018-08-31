import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ImageBackground, Alert, Image, Platform} from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button,
 Label, Left, Body, Right, Title, H3, H2, Grid, Col, Row, Footer, FooterTab, Thumbnail} from 'native-base';

export default class Instruments extends Component{
  constructor(props){
  super(props);
  }

  componentDidMount(){
  }

  render(){
    if(this.props.instruments){
      return(
        <View>
        <H2> Instruments </H2>
        <FlatList
          data={this.props.instruments}
          extraData={this.props.instruments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return(
              <View>
              <Text>{item}</Text>
              </View>
            )
          }}
        >
        </FlatList>
        </View>
      )}
    return(
      <View>
      <H2>Instruments:</H2>
      <Text> none currently</Text>
      </View>
    )
  }   

}