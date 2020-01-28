import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import {
  Card,
  CardImage,
  CardItem,
  Container,
  Content,
  Header,
  Form,
  Input,
  Icon,
  Item,
  Button,
  Label,
  Left,
  List,
  ListItem,
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
  Thumbnail,
  Ul,
  Li
} from 'native-base';
import * as firebase from 'firebase';
import geofire from 'geofire';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setAllUsers } from '../actions/actions';

import { allUsersSelector } from '../selectors/selectors';
import CreateMessageModal from '../../messages/components/CreateMessageModal';
import SearchProfilesCard from '../components/SearchProfilesCard';
import styles from '../../common/styles/styles';

class Nearby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersArray: [],
      isCreateMessageModalVisible: false,
      location: null,
      userLocation: []
    };
  }

  // === message modal ===

  // handleShowCreateMessageModal = () => {
  //     this.setState({
  //       isCreateMessageModalVisible: true
  //     });
  //   };
  // handleDismissCreateMessageModal = () => {
  //   this.setState({
  //     isCreateMessageModalVisible: false
  //   });
  // };

  // === message modal ===

  static navigationOptions = ({ navigation }) => ({
    title: 'Nearby',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#007bff'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  });

  componentWillMount = () => {};

  componentDidMount = () => {
    this.getAllUsers();
    const currentUser = firebase.auth().currentUser.uid;
    // === message modal ===
    // handleShowCreateMessageModal();
    // === message modal ===

    // ******** declare geofire all users reference point
    const geoFire = new geofire(firebase.database().ref('user_locations/'));

    geoFire.get(currentUser).then(
      location => {
        if (location === null) {
          console.log('key is not in Geofire');
        } else {
          // ******** initialize geoquery
          const geoQuery = geoFire.query({
            center: location,
            radius: 57
          });
          // ********
          // ******** retrieve users
          let nearbyUsers = [];
          //GEOQUERIES ==
          geoQuery.on('key_exited', key => {
            nearbyUsers = nearbyUsers.filter(user => user.userid !== key);
            this.setState({
              usersArray: nearbyUsers
            });
          });
          geoQuery.on('key_entered', (key, location, distance) => {
            if (
              key === currentUser ||
              nearbyUsers.some(user => user.userid === key)
            ) {
              console.log('you are already in here', key);
            } else {
              // query Firebase USERS node
              let ref = firebase.database().ref('/users/' + key);
              ref.once('value').then(snapshot => {
                let userObj = { userid: key };
                snapshot.forEach(userProperty => {
                  userObj[userProperty.key] = userProperty.val();
                });
                nearbyUsers.push(userObj);
                // this.props.setAllUsers(nearbyUsers);
              });
            }
          });
        }
      },
      error => {
        console.log('Error:', error);
      }
    );
  };

  _getArray = users => {
    let results = [];

    // Loop through each user
    users.forEach((originalObj, idx) => {
      let obj = originalObj;
      // Get the genres
      let genres = [];
      for (let key in obj.genres) {
        genres.push(obj.genres[key]);
      }
      // Get the instruments
      let instruments = [];
      for (let key in obj.instruments) {
        instruments.push(obj.instruments[key]);
      }
      // Get connectedusers
      let connectedusers = [];
      for (let key in obj.connectedusers) {
        connectedusers.push(obj.connectedusers[key]);
      }
      // Add the result to the table
      results.push({
        userid: originalObj.userid,
        key: idx,
        firstname: obj.firstname,
        lastname: obj.lastname,
        zipcode: obj.zipcode,
        userphoto: obj.userphoto || 'http://temp.changeme.com',
        genres: genres,
        instruments: instruments,
        connectedusers: connectedusers
      });
    });
    return results;
  };

  getAllUsers = () => {
    allUsersArray = [];
    let ref = firebase.database().ref('/users/');
    ref.once('value').then(snapshot => {
      console.log('what does a snapshot contain', snapshot);
      console.log('what happens with toJSON? ', snapshot.toJSON());
      allUsersArray.push(snapshot.toJSON());
      this.props.setAllUsers(allUsersArray);
    });
    console.log('in the end, this is allUsersArray', allUsersArray);
    console.log('in the end, this is this.props.nearby', this.props.nearby);
    console.log(
      'in the end, this is this.props.nearby',
      this.props.nearby.allUsers
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    let users = this.state.usersArray;
    // console.log("this is the users in render:", users);
    var results = this._getArray(users);
    return (
      <Container>
        <Content>
          <H2 style={styles.notchCompensation}> Nearby Users </H2>
          {results.length < 1 ? (
            <View style={{ margin: 20 }}>
              <Text style={styles.modalTitleText}>No Users nearby</Text>
            </View>
          ) : (
            <FlatList
              data={results}
              extraData={results}
              keyExtractor={item => item.userid}
              renderItem={({ item, index }) => (
                <List listKey={item.userid}>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail source={{ uri: item.userphoto }} />
                    </Left>
                    <Body>
                      <SearchProfilesCard
                        userid={item.userid}
                        instruments={item.instruments || []}
                        genres={item.genres || []}
                        name={item.firstname || []}
                        connectedusers={item.connectedusers || []}
                        navigate={navigate}
                      />
                    </Body>
                    <Right />
                  </ListItem>
                </List>
              )}
            />
          )}
          <View style={{ padding: 15 }}>
            <View>
              <Text style={styles.centerMe}>
                When you SEND CONTACT INFO, your provided contact info will be
                shared with that user.
              </Text>
            </View>
            <View style={{ margin: 5 }}>
              <Text style={styles.centerMe}>
                You can change your contact info from your Home page by clicking
                "Edit"
              </Text>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  allUsers: allUsersSelector(state)
});

const mapDispatchToProps = dispatch => ({
  setAllUsers: allUsers => dispatch(setAllUsers(allUsers))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nearby);
