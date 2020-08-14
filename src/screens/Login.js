import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ActivityIndicator,}
from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes  } from 'react-native-google-signin';
import { inject, observer } from 'mobx-react';

@inject('signupUser')
@inject('loginUser')
@observer
class Login extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            email: '',
            password: '',
            allUsers: [], 
            user_name: '',
            token: '',
            profile_pic: '',
            userInfo: null,
            gettingLoginStatus: true,
      }
    }

    componentDidMount() {
        this.props.loginUser.getAllUsers();
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
             webClientId: '125101494197-c7rtv66thg9ou6edu1vb00mcnj8oapqe.apps.googleusercontent.com',
         });
        this._isSignedIn();
    }

     validateUser=()=> {
        userDetails = {
            email: this.state.email,
            password: this.state.password,
        }
        if ((this.state.email == '' && this.state.password == '')) {
            Alert.alert('Please fill the Details')
        }
        else {
            let allUsers = this.state.allUsers;
            console.log('hello'+allUsers);
            for (let user of allUsers) {
                if ((user.email == this.state.email) && (user.password == this.state.password)) {
                   console.log('success')
                }
            }
        }
    }

    get_Response_Info = (error, result) => {
    if (error) {
      Alert.alert('Error fetching data: ' + error.toString());
    } 
    else 
    {       
      JSON.stringify(result);
      this.setState({ user_name: result.name });
      this.setState({ token: result.id });
      this.setState({ profile_pic: result.picture.data.url });
    }   
    };

    registerUser = () => {
        userDetails = {
            user_name: result.name,
             token: result.id,
        }      
            this.props.signupUser.addUser(userDetails);
            Alert.alert("SignUp Sucessfull")
    }

    _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      this._getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    this.setState({ gettingLoginStatus: false });
  };

  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null }); 
    } catch (error) {
      console.error(error);
    }
  };

    render(){
        
        return(
            <View style={styles.container}>

            <TouchableOpacity style={styles.btnSignup}
            onPress={()=>this.props.navigation.navigate('Register')}>
            <Text style={styles.btnTextSignup}>Signup</Text>
            </TouchableOpacity>
            
            <TextInput placeholder='Enter Your Email' style={styles.textField}
            onChangeText={email => this.setState({ email })} />

            <TextInput secureTextEntry={true}
            placeholder='Enter a password' style={styles.textField}
            onChangeText={password => this.setState({ password })} />

            <TouchableOpacity style={styles.btnSignin}
            onPress = {this.validateUser}>
            <Text style={styles.btnTextSignin}>Signin</Text>
            </TouchableOpacity>

            <LoginButton
            readPermissions={['public_profile']}
            onLoginFinished={(error, result) => {
            if (error) 
            {
              alert(error);
              alert('login has error: ' + result.error);
            } 
            else if (result.isCancelled) {
              alert('login is cancelled.');
            } 
            else {
              AccessToken.getCurrentAccessToken().then(data => {
                alert(data.accessToken.toString());

                const processRequest = new GraphRequest(
                  '/me?fields=name,picture.type(large)',
                  null,
                  this.get_Response_Info,
                  this.registerUser
                );
                new GraphRequestManager().addRequest(processRequest).start();
              });
              this.props.navigation.navigate('Dashboard')
            }
            }}
            />

            <GoogleSigninButton
              style={{ width: 312, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this._signIn}
            />


            <Text style={styles.text}>If you don not have an account</Text>

            <TouchableOpacity style={styles.skipSignin}
                onPress={()=>this.props.navigation.navigate('DrawerNavigator')}>
                <Text style={styles.skipTextSignin}>Press Here</Text>
            </TouchableOpacity>

            </View>);
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#003f5c',
    },

    textField:{
        backgroundColor:'white',
        width:'80%',
        height:40,
        borderRadius:10,
        marginBottom:20,
        alignItems:'center',
        fontSize:18,
    },

    btnSignup:{
        marginBottom:20,
        backgroundColor:'red',
        borderRadius:5,
        height:30,
        width:'25%',
        marginLeft:200,
        alignItems: 'center',
  },

    btnTextSignup:{
        color:'white',
        fontWeight: 'bold',
        fontSize:20,
  },

    btnSignin:{
        backgroundColor:'red',
        width:'40%',
        marginTop:20,
        marginBottom:10,
        borderRadius:5,
        height:30,
        alignItems:'center',
  },
    btnTextSignin:{
        color:'white',    
        fontWeight: 'bold',
        fontSize:20,
  },
  skipSignin:{
        backgroundColor:'red',
        width:'40%',    
        height:30,
        alignItems:'center',
        marginLeft:200,
        marginTop:10,
  },
    skipTextSignin:{
        color:'white',    
        fontWeight: 'bold',
        fontSize:20,
  },
  text:{    
        fontSize:15,
        color:'white',
        marginTop:120,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
});

export default Login;