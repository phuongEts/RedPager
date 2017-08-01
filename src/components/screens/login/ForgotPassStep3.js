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

const { buttonMenu, touchBtnMenu } = Styles;
class ForgotPassStep3 extends Component {
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
        pass: '',
        Repass: '',
        isLoading: false,
      };
    }
    SendMail() {
      console.log('send mail');
      const { navigation } = this.props;
      if (this.state.pass !== '' && this.state.Repass !== '') {
        if (this.state.pass !== this.state.Repass) {
          Toast.show('password and re-password not correct', {
            duration: 1000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          });
        } else {
          this.setState({ isLoading: true });
          const value = {
            password: this.state.code,
            email: navigation.state.params.email,
            Action: 'forGotStep3'
          };
          Fetch(value)
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson) { // ok
              console.log(responseJson);
              if (responseJson.code === 1) {
                Toast.show('Success, go to login', {
                  duration: 1000,
                  position: Toast.positions.BOTTOM,
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                  delay: 0
                });
                this.props.navigation.navigate('Screen_Login');
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
        }
        } else {
        Toast.show('password or re-password is empty', {
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
                <Text style={{ color: '#fff', marginTop: 15 }}>Enter your new password</Text>
              </View>
              <View style={formLogin}>
                  <View style={textFieldWrap}>
                    <Image style={bgInput} source={bgInputIMG}>
                      <TextInput
                        style={textField}
                        placeholder='Enter new password'
                        placeholderTextColor='#fff'
                        value={this.state.pass}
                        onChangeText={ pass => this.setState({ pass })}
                      />
                    </Image>
                  </View>
                  <View style={textFieldWrap}>
                    <Image style={bgInput} source={bgInputIMG}>
                      <TextInput
                        style={textField}
                        placeholder=' Re-enter new password'
                        placeholderTextColor='#fff'
                        value={this.state.Repass}
                        onChangeText={ Repass => this.setState({ Repass })}
                      />
                    </Image>
                  </View>
                  <View style={textFieldWrap}>
                    {this.state.isLoading ? <Loading animating /> :
                    <TouchableOpacity style={touchsubmit} onPress={this.SendMail.bind(this)} >
                      <Image style={buttonimg} source={bgbuttonlogin}>
                          <Text style={buttonText}>Set new password</Text>
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
export default ForgotPassStep3;
