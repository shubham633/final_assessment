import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';

export default class Logout extends Component {
  render()
  {
    return(
       <Button title="click for sign out" onPress={this.props.navigation.navigate('Login')} />
     );
}
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});