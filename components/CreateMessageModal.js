import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import styles from '../common/styles/styles'
import { Text, View, StyleSheet, ImageBackground, Alert, Image, TouchableHighlight, FlatList} from 'react-native';
import { Container, Content, Header, Footer, FooterTab, Form, Icon, Input, Item, Button,
 Label, Left, Body, Right, Title, H3, H2, Grid, Col, Row, List, ListItem, CheckBox, Separator } from 'native-base';
 import * as firebase from 'firebase';

  const CreateMessageModal=({
    isVisible, onBackdropPress,
  }) => (
    <Modal 
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
    >
    <View style={styles.modalViewContainer}>
      <View style={styles.modalSmallContainerView}>
        <Text style={styles.modalTitleText}>Send a Message</Text>
        <View style={styles.modalSeparatorLine}></View>
        <Input
          placeholder="Enter Message..."
        />
      </View>
    </View>
    </Modal>
  );

  CreateMessageModal.propTypes = {
    isVisible: PropTypes.bool,
    onBackdropPress: PropTypes.func,
  };

  export default CreateMessageModal;
