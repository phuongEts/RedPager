import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, ScrollView, Image, TextInput, Alert, AsyncStorage
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import FCM from "react-native-fcm";

import bgLoginImg from '../../../img/bg_login.png';
import Logo2Img from '../../../img/logo.png';
import bgInputIMG from '../../../img/bgInputLogin.png';
import bgbuttonlogin from '../../../img/bgButtonLogin.png';

import Styles from '../../assets/styles/Styles';
import loginStyle from '../../assets/styles/LoginStyle';
import Fetch from '../../api/Fetch';
import Loading from '../main/Loading';

const { buttonMenu, touchBtnMenu } = Styles;
class Login extends Component {
    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation;
        return ({
        headerLeft:
            <TouchableOpacity onPress={() => navigate('DrawerOpen')} style={touchBtnMenu} >
                <FontAwesome name='bars' style={buttonMenu} />
            </TouchableOpacity>,
            headerRight: null
        });
    };
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            tokenDevice: null,
        };
    }
    componentDidMount() {
        FCM.getFCMToken().then(token => {
            this.setState({ tokenDevice: token });
        });
    }
    loginProcess() {
        this.props.dispatch({ type: 'LOADING' });
        if(this.state.username !== '' && this.state.password !== '') {
            const value = {
                id: this.state.username,
                password: this.state.password,
                token: this.state.tokenDevice,
                Action: 'login'
            };

            Fetch(value)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson) { // ok
                    console.log(responseJson);
                    if (responseJson.code === 1) {
                        Alert.alert(
                            '',
                            responseJson.mess,
                            [
                                { text: 'OK', onPress: () => this.saveData(responseJson) },
                            ]
                        );
                    } else {
                        Alert.alert(
                            'Login Error',
                            responseJson.mess,
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed!') },
                            ]
                        );
                    }
                } else {
                    Alert.alert(
                        'Opps!',
                        responseJson.mess,
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed!') },
                        ]
                    );
                }
                this.props.dispatch({ type: 'LOADING' });
            })
            .catch(error => {
                console.log(error);
                this.props.dispatch({ type: 'LOADING' });
            });
        } else if (this.state.tokenDevice === null) {
            Alert.alert(
                'Opps!',
                'Token Device not found!',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed!') },
                ]
            );
            this.props.dispatch({ type: 'LOADING' });
        } else {
            Alert.alert(
                'Opps!',
                'Username or Password is null!',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed!') },
                ]
            );
            this.props.dispatch({ type: 'LOADING' });
        }
    }
    saveData(data) {
        this.props.dispatch({ type: 'SET_TOGGLE_APP', isOn: data.avaiable });
        this.props.dispatch({ type: 'LOGIN', user: data });
        AsyncStorage.setItem('current_user', JSON.stringify(data));
        this.props.navigation.navigate('Home');
    }
     render() {
        const { navigation, isLoading } = this.props;
        const {
             bgLogin, contentSignIn, rowLogo, Logo, logoText, formLogin,
             textField, textFieldWrap, bgInput, touchsubmit, buttonimg, buttonText
        } = loginStyle;
         return (
            <Image style={bgLogin} source={bgLoginImg} >
            <ScrollView >
                <View style={contentSignIn}>
                    <View style={rowLogo}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Image style={Logo} source={Logo2Img} />
                        </TouchableOpacity>
                        <Text style={logoText}>Red Pager</Text>
                    </View>
                    <View style={formLogin}>
                        <View style={textFieldWrap}>
                            <Image style={bgInput} source={bgInputIMG}>
                                <TextInput
                                    style={textField}
                                    placeholder='Phone'
                                    placeholderTextColor='#fff'
                                    value={this.state.username}
                                    onChangeText={
                                        (username) => this.setState({ username })
                                    }
                                />
                            </Image>
                        </View>
                        <View style={textFieldWrap}>
                            <Image style={bgInput} source={bgInputIMG}>
                                <TextInput
                                    style={textField}
                                    placeholder='Password:'
                                    placeholderTextColor='#fff'
                                    secureTextEntry
                                    value={this.state.password}
                                    onChangeText={
                                        (password) => this.setState({ password })
                                    }
                                />
                            </Image>
                        </View>
                        <View style={textFieldWrap}>
                            {isLoading ? <Loading animating /> :
                            <TouchableOpacity style={touchsubmit} onPress={this.loginProcess.bind(this)} >
                                <Image style={buttonimg} source={bgbuttonlogin}>
                                    <Text style={buttonText}>Login</Text>
                                </Image>
                            </TouchableOpacity>
                            }
                        </View>
                        <View style={textFieldWrap}>
                            {isLoading ? <Loading animating /> :
                            <TouchableOpacity style={touchsubmit} onPress={() => navigation.navigate('Screen_Register')} >
                                <Image style={buttonimg} source={bgbuttonlogin}>
                                    <Text style={buttonText}>Register</Text>
                                </Image>
                            </TouchableOpacity>
                            }
                        </View>
                        <View>
                            <Text>Forgot your password?</Text>
                        </View>

                    </View>
                </View>
            </ScrollView>

            </Image>
        );
     }
}
//function call sate from store
function mapStateToProps(state) {
  return {
    isLoading: state.isLoading
  };
}
export default connect(mapStateToProps)(Login);
