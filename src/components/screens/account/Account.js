import React, { Component } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from '../../assets/styles/Styles';
import AccountStyle from '../../assets/styles/AccountStyle';
import Init from '../../assets/Init';
import Fetch from '../../api/Fetch';

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
      price: null
    };
  }
  componentDidMount() {
    const { currentUser, dataUser } = this.props;
    if(currentUser !== null && dataUser === null) {
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
  }
  payProcess() {
    console.log(this.state.price);
  }
  render() {
    const { 
      container, label, line, purcharContainer, title, textStyle, formPuschase, 
      radioFormContainer, textRadio, buyBtn, buyText, textRadioContainer, buyContainer
    } = AccountStyle;
    const radio_props = [
      {label: '$9', value: 9 },
      {label: '$29', value: 29 }
    ];
    const { dataUser } = this.props;
    return (
      <ScrollView>
        <View style={container}>
          <Text style={label}>Account Type</Text>
          <View style={line} />
          <Text style={label}>Standard Member</Text>
          <View style={purcharContainer}>
            <Text style={title}>3 connections remaining</Text>
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
                <TouchableOpacity style={buyBtn} onPress={this.payProcess.bind(this)}>
                  <Text style={buyText}>Buy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={label}>Account Info</Text>
          <View style={line} />
          <Text style={title}>- Account Info -</Text>
          <View style={{ paddingHorizontal: 10, marginTop: 7 }}>
            <Text style={textStyle}>Name: {dataUser !== null ? dataUser.name : null}</Text>
            <Text style={textStyle}>Email: {dataUser !== null ? dataUser.email : null}</Text>
            <Text style={textStyle}>Phone: {dataUser !== null ? dataUser.phone : null}</Text>
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