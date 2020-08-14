import React,{Component, Fragment} from 'react';
import ImagePicker from 'react-native-image-picker';
import {SafeAreaView, StyleSheet, View, Text, StatusBar, Image, Dimensions, TouchableOpacity, TextInput, Alert}
from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';import Icon from 'react-native-vector-icons/FontAwesome';
import { inject, observer } from 'mobx-react';
import NewApi from './NewApi';

@inject('signupUser')
@observer
class Register extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            name: '',
            email: '',
            mobile: '',
            password:'',
            confirmPassword:'',
            data: '',
            uri: ''
        }
    }

    chooseImage = () => {
        let options = {
            title: 'Select Image',
            storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } 
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } 
        else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
        } 
        else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
        });
      }
    });
    }

    renderFileData() {
        if (this.state.fileData) {
            return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
            style={styles.images} />
        }
    }

    registerUser = () => {
        userDetails = {
            name: this.state.name,
            email: this.state.email,
            mobile:this.state.mobile,
            password: this.state.password,
        }
        if((this.state.name=='')||(this.state.mobile==''))
        {
            Alert.alert('Please fill the details')
        }
        else if ((this.state.email == '') && (this.state.password == ''))         
            Alert.alert('Email and password can not be empty')        
        else if((this.state.password !== this.state.confirmPassword))
            Alert.alert('Password and Re-enter Password must be same')
        else {
            this.props.signupUser.addUser(userDetails);
            Alert.alert("SignUp Sucessfull")
            console.log(userDetails);
        }
    }


    render() {
        return(
            <View style={styles.container}>

            <View style={styles.body}>
            <View style={styles.ImageSections}>
              <View>
                {this.renderFileData()}
                <Text style={{ textAlign: 'center' }}>Profile Pic</Text>
              </View>
            </View>            
            </View>

            <View style={styles.btnParentSection}>
            <TouchableOpacity style={styles.btnSection}
            onPress={this.chooseImage}>
            <Text style={styles.btnText}>Choose Photo</Text>
            </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btnSignin}
            onPress={()=>this.props.navigation.navigate('Login')}>
            <Text  style={styles.btnTextSignin}>Signin</Text>
            </TouchableOpacity>

            <TextInput placeholder='Enter Your Name' style={styles.textField}
            onChangeText={name => this.setState({ name })} />

            <TextInput placeholder='Enter Your Email' style={styles.textField}
            onChangeText={email => this.setState({ email })} />

            <TextInput placeholder='Enter Your mobile' style={styles.textField}
            onChangeText={mobile => this.setState({ mobile })} />

            <TextInput secureTextEntry={true}
            placeholder='Enter Your password' style={styles.textField}
            onChangeText={password => this.setState({ password })} />

            <TextInput secureTextEntry={true}
            placeholder='Re-enter Your password' style={styles.textField}
            onChangeText={confirmPassword => this.setState({ confirmPassword })} />

            <TouchableOpacity style={styles.btnSignup}
            onPress = {this.registerUser}>
            <Text style={styles.btnTextSignup}>Signup</Text>
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
    body: {
        backgroundColor: Colors.white,
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 6,
        paddingVertical: 4,
        justifyContent: 'center'
    },
    images: {
        width: 150,
        height: 150,
        borderColor: 'white',
        borderWidth: 1,
        marginHorizontal: 3
    },
    btnParentSection: {
        alignItems: 'center',
        marginTop: 5
    },
    btnSection: {
        width: 125,
        height: 20,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    btnSignin:{
        marginBottom:10,
        backgroundColor:'red',
        borderRadius:5,
        height:30,
        width:'25%',
        marginLeft:200,
        alignItems: 'center',
    },
        btnTextSignin:{
        color:'white',
        fontWeight: 'bold',
        fontSize:20,
    },

    textField:{
        backgroundColor:'white',
        width:'80%',
        height:40,        
        marginBottom:10,
        alignItems:'center',
        fontSize:18,
    },

    btnSignup:{
        backgroundColor:'red',
        width:'40%',
        marginTop:15,
        marginBottom:10,
        borderRadius:5,
        height:30,
        alignItems:'center',
    },
    btnTextSignup:{
        color:'white',        
        fontWeight: 'bold',
        fontSize:20,
    },
});

export default Register;