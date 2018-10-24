import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Alert, Image, FlatList, TouchableOpacity} from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button,
 Label, Left, Body, Right, Title, H3, H2, Grid, Col, Row, List, ListItem, CheckBox, Icon } from 'native-base';
 import FooterNav from './FooterNav'
 import styles from './styles'
 import * as firebase from 'firebase';

var tempInstrumentList = []

export default class InstrumentAdder extends Component{
  constructor(props){
    super(props);
    this.state={
      formContent:'',
      instrumentList:[],
      refresher:false,
    }
  }

  _addInstrument = () =>{
  let userId = firebase.auth().currentUser.uid;
  firebase.database().ref('/users/' + userId).child('instruments').push(this.state.formContent)
    this.setState({
      formContent:''
    })
  }

  _removeInstrument = (key, index)=>{
    let that=this;
    refreshCheck = this.state.refresher
    let tempList = this.state.instrumentList
    let userId = this.props.userId;
    let ref = firebase.database().ref('/users/'+userId).child('instruments');
    tempList.splice(index, 1)
    that.setState({
      refresher:!refreshCheck
    })
  ref.child(key).remove()
  }


  componentWillMount= () =>{
    let newList=[];
    let that=this;
    let ref= firebase.database().ref('/users/'+ this.props.userId).child('instruments');
    ref.orderByKey().on('child_added', function(snapshot){
      newList.push(snapshot);
      that.setState({
        instrumentList:newList
      })
    })
  }

  render(){
  return(
    <Container>
    <Content>
    <Form>
    <Input 
    placeholder="Enter New Instrument..."
    onChangeText={(formContent)=> this.setState({formContent})}
    value={this.state.formContent}
     /> 
    <Button
    onPress={()=> this._addInstrument()}
    > 
    <Icon name="add" />
    </Button>
    </Form>

    <View style={{flexDirection:'row', alignItems:'flex-start'}}>
    <List>
    <FlatList 
              extraData={this.state.refresher}
              style={{flexDirection:'row'}}
              data={this.state.instrumentList}
              renderItem={({item, index}) => 
              <TouchableOpacity
                onPress={()=> this._removeInstrument(item.key, index)}
                style={styles.addIconStyle}
                >
                <Text
                style={{textAlign:'center',letterSpacing: 1.5,}}
                >
                {item.val()}
                <Icon name="close" style={{textAlign: 'right'}} />
                </Text>
              </TouchableOpacity>    
              }
              keyExtractor={(item) => item.key}
              >
    </FlatList>
    </List>
    </View>
    </Content>
    </Container>
    )
}

} 
