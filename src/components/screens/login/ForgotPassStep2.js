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
class ForgotPassStep2 extends Component {
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
        code: '',
        isLoading: false,
        isLoading2: false
      };
    }
    SendMail() {
      console.log('send mail');
      const { navigation } = this.props;
      if (this.state.code !== '') {
          this.setState({ isLoading: true });
          const value = {
            code: this.state.code,
            email: navigation.state.params.email,
            Action: 'forGotStep2'
          };
          Fetch(value)
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson) { // ok
              console.log(responseJson);
              if (responseJson.code === 1) {
                Toast.show('code is true', {
                  duration: 1000,
                  position: Toast.positions.BOTTOM,
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                  delay: 0
                });
                this.props.navigation.navigate(
                  'Screen_ForgotPassStep3',
                  {
                    email: navigation.state.params.email
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
        Toast.show('code is empty', {
          duration: 1000,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0
        });
      }
    }
    reSendCode() {
      const { navigation } = this.props;
      if (navigation.state.params.email !== null) {
        this.setState({ isLoading2: true });
        const value = {
          email: navigation.state.params.email,
          Action: 'forGotStep1'
        };
        Fetch(value)
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson);
          if (responseJson.code !== 1) { // error
            Toast.show(responseJson.mess, {
              duration: 1000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0
            });
          } else {
            //console.log(responseJson);
            Toast.show('code has send, check your mail', {
              duration: 1000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0
            });
          }
          this.setState({ loading2: false });
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading2: false });
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
                <Text style={{ color: '#fff', marginTop: 15 }}>Code has been send to your mail.</Text>
                <Text style={{ color: '#fff', marginTop: 15 }}>Please check inbox, spam and enter your code to reset password.</Text>
              </View>
              <View style={formLogin}>
                  <View style={textFieldWrap}>
                    <Image style={bgInput} source={bgInputIMG}>
                      <TextInput
                        style={textField}
                        placeholder='Enter Code'
                        placeholderTextColor='#fff'
                        value={this.state.code}
                        onChangeText={ code => this.setState({ code })}
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
                  <View style={textFieldWrap}>
                    {this.state.isLoading2 ? <Loading animating /> :
                    <TouchableOpacity style={touchsubmit} onPress={this.reSendCode.bind(this)} >
                      <Image style={buttonimg} source={bgbuttonlogin}>
                          <Text style={buttonText}>Re-send Code</Text>
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
export default ForgotPassStep2;
