import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, ScrollView, 
    Image, TextInput, Alert, AsyncStorage
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import bgLoginImg from '../../../img/bg_login.png';
import Logo2Img from '../../../img/logo.png';
import bgInputIMG from '../../../img/bgInputLogin.png';
import bgbuttonlogin from '../../../img/bgButtonLogin.png';

import Styles from '../../assets/styles/Styles';
import loginStyle from '../../assets/styles/LoginStyle';
import Fetch from '../../api/Fetch';
import Loading from '../main/Loading';
import ValidateEmail from '../../api/ValidateEmail';

const { buttonMenu, touchBtnMenu } = Styles;

class Register extends Component {
  static navigationOptions = ({ navigation }) => {
      const { navigate } = navigation;
      return ({
      headerLeft:
          <TouchableOpacity onPress={() => navigation.goBack()} style={touchBtnMenu} >
              <FontAwesome name='chevron-left' style={buttonMenu} />
          </TouchableOpacity>,
          headerRight: null
      });
  };
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      rePassword: '',
      email: '',
      phone: '',
      isLoading: false
    }
  }
  registerProcess() {
    console.log('register click');
    if (ValidateEmail(this.state.email)) {
      if (this.state.password === this.state.rePassword){
        this.setState({ isLoading: true });
        const value = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          phone: this.state.phone,
          Action: 'register'
        };
        Fetch(value)
        .then((response) => response.json())
        .then((responseJson) => {
          if (!responseJson.code) { // error
            Alert.alert(
              'Opps!',
              responseJson.mess,
              [
                { text: 'OK', onPress: () => console.log('OK Pressed!') },
              ]
            );
          } else {
            Alert.alert(
              'Success!',
              responseJson.mess,
              [
                {
                  text: 'OK',
                  onPress: () => this.props.navigation.goBack()
                }
              ]
            );
          }
          this.setState({ isLoading: false });
        })
        .catch(error => {
          console.log(error);
          this.setState({ isLoading: false });
        });
      } else {
        Alert.alert(
          'Opps!',
          'Password and Re-password not correct!!',
          [
            { text: 'OK', onPress: () => this.setState({ loading: false }) },
          ]
        );
      } 

    } else {
      Alert.alert(
        'Opps!',
        'Email is not correct!!',
        [
          { text: 'OK', onPress: () => this.setState({ loading: false }) },
        ]
      );
    }
  }
  render() {
    const { navigation } = this.props;
    const {
          bgLogin, contentSignIn, rowLogo, Logo, logoText, formLogin,
          textField, textFieldWrap, bgInput, touchsubmit, buttonimg, buttonText
    } = loginStyle;
    return (
      <Image style={bgLogin} source={bgLoginImg} >
        <ScrollView>
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
                    placeholder='Name'
                    placeholderTextColor='#fff'
                    value={this.state.username}
                    onChangeText={username => this.setState({ username })}
                  />
                </Image>
              </View>
              <View style={textFieldWrap}>
                <Image style={bgInput} source={bgInputIMG}>
                  <TextInput
                    style={textField}
                    placeholder='Email'
                    placeholderTextColor='#fff'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                  />
                </Image>
              </View>
              <View style={textFieldWrap}>
                <Image style={bgInput} source={bgInputIMG}>
                  <TextInput
                    style={textField}
                    placeholder='Password'
                    placeholderTextColor='#fff'
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                  />
                </Image>
              </View>
              <View style={textFieldWrap}>
                <Image style={bgInput} source={bgInputIMG}>
                  <TextInput
                    style={textField}
                    placeholder='Re-password'
                    placeholderTextColor='#fff'
                    secureTextEntry
                    value={this.state.rePassword}
                    onChangeText={rePassword => this.setState({ rePassword })}
                  />
                </Image>
              </View>
              <View style={textFieldWrap}>
                <Image style={bgInput} source={bgInputIMG}>
                  <TextInput
                    style={textField}
                    placeholder='Phone'
                    placeholderTextColor='#fff'
                    value={this.state.phone}
                    onChangeText={phone => this.setState({ phone })}
                  />
                </Image>
              </View>
              <View style={textFieldWrap}>
                {this.state.isLoading ? <Loading animating /> :
                <TouchableOpacity style={touchsubmit} onPress={this.registerProcess.bind(this)} >
                  <Image style={buttonimg} source={bgbuttonlogin}>
                      <Text style={buttonText}>Register</Text>
                  </Image>
                </TouchableOpacity>
                }
              </View>

            </View>
          </View>
        </ScrollView>
      </Image>
    );
  } 
}

export default Register;
