import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, ScrollView, Image, TextInput
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';

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
class ForgotPassStep1 extends Component {
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
        mail: '',
        isLoading: false
      };
    }
    SendMail() {
      console.log('send mail');
      if (this.state.mail !== '') {
        if (ValidateEmail(this.state.mail)) {
          this.setState({ isLoading: true });
          const value = {
            email: this.state.mail,
            Action: 'forGotStep1'
          };
          Fetch(value)
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson) { // ok
              console.log(responseJson);
              if (responseJson.code === 1) {
                this.props.navigation.navigate(
                  'Screen_ForgotPassStep2',
                  {
                    email: this.state.mail
                  }
                );
              } else {
                Toast.show(responseJson.mess, {
                  duration: 1000,
                  position: Toast.positions.BOTTOM,
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                  delay: 0
                });
              }
            } else {
              Toast.show('Error, please try again!', {
                duration: 1000,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0
              });
            }
            this.setState({ isLoading: false });
          })
          .catch(error => {
            console.log(error);
            this.setState({ isLoading: false });
          });
        } else {
          Toast.show('Email is not correct!', {
            duration: 1000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          });
        }
      } else {
        Toast.show('Email is empty', {
          duration: 1000,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0
        });
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
          <ScrollView >
            <View style={contentSignIn}>
              <View style={rowLogo}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={Logo} source={Logo2Img} />
                </TouchableOpacity>
                <Text style={{ color: '#fff', marginTop: 15 }}>Enter your email, system will sent mail to your mail.</Text>
              </View>
              <View style={formLogin}>
                  <View style={textFieldWrap}>
                    <Image style={bgInput} source={bgInputIMG}>
                      <TextInput
                        style={textField}
                        placeholder='Enter Your Email'
                        placeholderTextColor='#fff'
                        value={this.state.mail}
                        onChangeText={ mail => this.setState({ mail })}
                      />
                    </Image>
                  </View>
                  <View style={textFieldWrap}>
                    {this.state.isLoading ? <Loading animating /> :
                    <TouchableOpacity style={touchsubmit} onPress={this.SendMail.bind(this)} >
                      <Image style={buttonimg} source={bgbuttonlogin}>
                          <Text style={buttonText}>Send</Text>
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
export default ForgotPassStep1;
