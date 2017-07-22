import React, { Component } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, NativeModules
} from 'react-native';
import { connect } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';

import Styles from '../../assets/styles/Styles';
import AccountStyle from '../../assets/styles/AccountStyle';
import Init from '../../assets/Init';
import Fetch from '../../api/Fetch';
import Loading from '../main/Loading';

const MFLReactNativePayPal = NativeModules.MFLReactNativePayPal;

const { buttonMenu, touchBtnMenu } = Styles;
const { mainBgColor } = Init;
class Account extends Component {
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
      price: '9.00',
      isLoading: false
    };
  }
  componentDidMount() {
    const { currentUser, dataUser } = this.props;
    if(currentUser !== null && dataUser === null) {
      this.getDataUser();
    }
  }
  getDataUser() {
    const { currentUser, dataUser } = this.props;
    const value = {
      id: currentUser.idUser,
      Action: 'getDataUser'
    };
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) { // ok
        console.log(responseJson);
        this.props.dispatch({ type: 'GET_DATA_USER', data: responseJson})
      }
    })
    .catch(error => {
        console.log(error);
    });
  }
  payProcess() {
    const { dataUser } = this.props;
    if (dataUser !== null && dataUser.role === 'userPremium') {
      Toast.show('You are premium user, can\'t pay', {
        duration: 1000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    } else {
      MFLReactNativePayPal.preparePaymentOfAmount(this.state.price, 'USD', 'RedPager');
      MFLReactNativePayPal.prepareConfigurationForMerchant('Phuong', true, 'kid.tn01@gmail.com');
      MFLReactNativePayPal.presentPaymentViewControllerForPreparedPurchase((error, payload) => {
        if (error) {
          //Handle Error
          Toast.show('Payment Failed', {
            duration: 1000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          });
        } else {
        //console.log('pay success');
        console.log(payload);
        if (payload.status === 1) {
            //console.log(payload.confirmation);
          console.log(payload.confirmation);
          const { currentUser } = this.props;
          this.setState({ isLoading: true });
          const value = {
            Action: 'upgrade',
            idUser: currentUser.idUser,
            transaction: payload.confirmation.response.id,
            currency: 'USD',
            money: this.state.price
          };
          Fetch(value)
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson) { // ok
              console.log(responseJson);
              if (responseJson.code === 1) {
                this.getDataUser();
                Toast.show('Pay Success', {
                  duration: 1000,
                  position: Toast.positions.BOTTOM,
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                  delay: 0
                });
                this.setState({ isLoading: false });
              }
            }
          })
          .catch(error => {
              console.log(error);
          });
        } else {
          // console.log('User cancelled payment');
          Toast.show('Cancelled payment', {
            duration: 1000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          });
        }
        }
      });
    }
  }
  render() {
    const { 
      container, label, line, purcharContainer, title, textStyle, formPuschase, 
      radioFormContainer, textRadio, buyBtn, buyText, textRadioContainer, buyContainer
    } = AccountStyle;
    const radio_props = [
      {label: '$9', value: '9.00' },
      {label: '$29', value: '29.00' }
    ];
    const { dataUser } = this.props;
    console.log(dataUser);
    return (
      <ScrollView>
        <View style={container}>
          <Text style={label}>Account Type</Text>
          <View style={line} />
          <Text style={label}>{dataUser !== null && dataUser.role === 'userPremium' ? 'Premium Member' : 'Standard Member'}</Text>
          <View style={purcharContainer}>
            <Text style={title}> {dataUser !== null ? dataUser.connection_remaining : 3} connections remaining</Text>
            <Text style={textStyle}>Purchase more connections</Text>
            <View style={formPuschase}>
              <View style={radioFormContainer}>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  formHorizontal={false}
                  labelHorizontal={true}
                  //buttonColor={mainBgColor}
                  buttonSize={20}
                  onPress={value => this.setState({ price: value })}
                />
              </View>
              <View style={textRadioContainer}>
                <Text style={textRadio}>Purchase this package for an additional 12 connections</Text>
                <Text style={textRadio}>Purchase this package for an additional 64 connections</Text>
              </View>
              <View style={buyContainer}>
                {this.state.isLoading ? <Loading animating /> : 
                <TouchableOpacity style={buyBtn} onPress={this.payProcess.bind(this)}>
                  <Text style={buyText}>Buy</Text>
                </TouchableOpacity>
                }
              </View>
            </View>
          </View>
          <Text style={label}>Account Info</Text>
          <View style={line} />
          <Text style={title}>- Account Info -</Text>
          <View style={{ paddingHorizontal: 10, marginTop: 7 }}>
            <Text style={textStyle}>Name: {dataUser !== null ? dataUser.name : null}</Text>
            <Text style={textStyle}>Email: {dataUser !== null ? dataUser.email : null}</Text>
            <Text style={textStyle}>Phone: {dataUser !== null ? dataUser.phoneFormat : null}</Text>
          </View>
          <Text style={[label, {marginTop: 10}]}>Delete Account</Text>
          <View style={line} />
          <View style={formPuschase}>
            <Text>Do you want to delete your account?</Text>
            <View style={buyContainer}>
              <TouchableOpacity style={buyBtn} onPress={this.payProcess.bind(this)}>
                <Text style={buyText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

//function call sate from store
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    dataUser: state.dataUser
  };
}
export default connect(mapStateToProps)(Account);