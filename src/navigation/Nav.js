import React, { Component } from 'react';
import {  View,  StyleSheet,  Dimensions,  Image,  TouchableOpacity,  Platform,  Text,} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import Dashboard from '../screens/Dashboard';
import Cart from '../screens/Cart';
import Logout from '../screens/Logout';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Splash from '../screens/Splash';

import CustomSidebarMenu from '../components/CustomSidebarMenu';

class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() { 
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('../assets/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const AuthStack = createStackNavigator({ 
  Login:{
    screen:Login,
    navigationOptions: () => ({
      title: 'SignIn',
      headerStyle: {
        backgroundColor: '#003f5c',
      },
      headerTintColor: '#fff',
    }),
  },
  Register:{
    screen:Register,
    navigationOptions: () => ({
      title: 'SignUp',
      headerStyle: {
        backgroundColor: '#003f5c',
      },
      headerTintColor: '#fff',
    }),
  },  
});

const Appstack = createStackNavigator({
	Splash:{
		screen:Splash,
	},
});

const AppStackDashboard = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: ({ navigation }) => ({
      title: 'Dashboard',
      headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#003f5c',
      },
      headerTintColor: '#fff',
    }),
  },
});

const AppStackCart = createStackNavigator({
  Cart: {
    screen: Cart,
    navigationOptions: ({ navigation }) => ({
      title: 'Cart',
      headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#003f5c',
      },
      headerTintColor: '#fff',
    }),
  },
});

const AuthStackLogout = createStackNavigator({
  Logout: {
    screen: Logout,
    navigationOptions: ({ navigation }) => ({
      headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
      }),
  },
});

const DrawerNavigator = createDrawerNavigator(
  {
    NavDashboard: {
      screen: AppStackDashboard,    
    },
    NavCart: {
      screen: AppStackCart,
    },
    NavLogout: {
      screen: AuthStackLogout,
    },
  },
  {
    contentComponent: CustomSidebarMenu,
    drawerWidth: Dimensions.get('window').width - 130,
  }
);

const SwitchNavigator = createSwitchNavigator({  
   Splash:{
   	screen:Appstack,
   },
   Login:{
    screen:AuthStack,
   },
   DrawerNavigator:{
    screen:DrawerNavigator,
   },
},
{
  initialRouteName: 'Splash',  
}
);

export default createAppContainer(SwitchNavigator);