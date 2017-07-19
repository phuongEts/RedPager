import React, { Component } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, Alert
} from 'react-native';

import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';

import Styles from '../../assets/styles/Styles';
import AccountStyle from '../../assets/styles/AccountStyle';

import Fetch from '../../api/Fetch';
import Loading from '../main/Loading';
import SendStyle from '../../assets/styles/SendStyle';

const { buttonMenu, touchBtnMenu, colorTextGray } = Styles;

class Send extends Component {
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
  }
  componentDidMount() {
    const { currentUser, listSend } = this.props;
    if (currentUser !== null && listSend === null) {
      const value = {
        Action: 'getListSendAlert',
        idUser: currentUser.idUser
      };
      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) { // ok
          console.log(responseJson);
          if (responseJson.code === 1) {
            this.props.dispatch({ type: 'GET_LIST_SEND', data: responseJson.listSend });
          }
          //this.props.dispatch({ type: 'GET_LIST_SEND', data: responseJson });
        }
      })
      .catch(error => {
          console.log(error);
      });
    }
  }
  sendPage(id) {
    const { currentUser } = this.props;
    if (currentUser !== null) {
      const value = {
          Action: 'sendPage',
          idUser: currentUser.idUser,
          idUserAlert: id
      };
      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
          if (responseJson) { // ok
            console.log(responseJson);
            Toast.show(responseJson.mess, {
              duration: 1000,
              position: Toast.positions.BOTTOM,
              shadow: false,
              animation: true,
              hideOnPress: true,
              delay: 0
            });
            //this.props.dispatch({ type: 'GET_LIST_PENDING_INVITE', data: responseJson});
          }
      })
      .catch(error => {
        console.log(error);
      });
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
  }
  renderData() {
    const listData = [];
    const { listSend } = this.props;
    const { rowItem, textItem, avaiableStyle, btn, textBtn, avaiableAtive } = SendStyle;
    if (listSend !== null) {
      listSend.map((item, i) => listData.push(
        <View key={i} style={rowItem}>
          <Text style={textItem}>{item.name}</Text>
          <View style={[avaiableStyle, item.avaiable ? avaiableAtive : null]} />
          <TouchableOpacity onPress={() => this.sendPage(item.id)} style={btn}>
            <Text style={textBtn}>Send Page</Text>
          </TouchableOpacity>
        </View>
      ));
    }
    return listData;
  }
  render() {
    const { container, label, line, title } = AccountStyle;
    const { listSend } = this.props;
    return (
      <ScrollView>
        <View style={container}>
          <Text style={label}>Send Red Page ({listSend !== null ? listSend.length : 0})</Text>
          <View style={line} />
          {listSend !== null ? this.renderData() : null}
        </View>
      </ScrollView>
    );
  }
}
//function call sate from store
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    listSend: state.listSend
  };
}

export default connect(mapStateToProps)(Send);