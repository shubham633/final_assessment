import React, { Component } from 'react';
import { View,ImageBackground,StyleSheet } from 'react-native';

export default class Splash extends Component {
  constructor(props)
  {
    super(props);
    setTimeout(()=>
    {
      this.props.navigation.navigate("Login");
    },5000);
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={require('../assets/images.png')}>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
});

