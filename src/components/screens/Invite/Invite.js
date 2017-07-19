import React, { Component } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, TextInput, Alert
} from 'react-native';

import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';

import Styles from '../../assets/styles/Styles';
import AccountStyle from '../../assets/styles/AccountStyle';
import LoginStyle from '../../assets/styles/LoginStyle';
import ConnectionsStyle from '../../assets/styles/ConnectionsStyle';
import Init from '../../assets/Init';
import Fetch from '../../api/Fetch';
import Loading from '../main/Loading';

const { buttonMenu, touchBtnMenu, colorTextGray } = Styles;

class Invite extends Component {
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
      phone: '',
      isLoading: false
    };
  }
  componentDidMount() {
    const { currentUser, listInvited } = this.props;
    if( currentUser !== null & listInvited === null ) {
      const value = {
        Action: 'listInvited',
        idUser: currentUser.idUser
      };
      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) { // ok
          console.log(responseJson);
          this.props.dispatch({ type: 'GET_LIST_INVITED', data: responseJson});
        }
      })
      .catch(error => {
          console.log(error);
      });
    }
  }
  sendInvited() {
    if (this.state.phone !== '') {
      this.setState({ isLoading: true });
      const { currentUser } = this.props;
      const value = {
        Action: 'sendInvite',
        idUser: currentUser.idUser,
        email: this.state.phone
      };
      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) { // ok
          console.log(responseJson);
          if( responseJson.code === 1) {
            this.props.dispatch({ type: 'UPDATE_LIST_INVITED', data: responseJson.listInvite});
          }
          Toast.show(responseJson.mess, {
            duration: 1000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          });
          this.setState({ isLoading: false });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
    } else {
      Toast.show('Phone or email not empty!', {
        duration: 1000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    }
  }
  renderListInvited(data) {
    if(data !== null && data !== '') {
      const arrayRender = [];
      const { ConnectionsContainer } = ConnectionsStyle;
      const { title } = AccountStyle;
      data.map((item, i) => arrayRender.push(
        <View style={[ConnectionsContainer, { marginVertical: 5 }]} key={i}>
          <Text style={title}>{item.name}</Text>
          <Text style={title}>{item.date}</Text>
        </View>
      ));
      return arrayRender;
    }
  }
  render() {
    const { 
      container, label, line, textField , textFieldContainer,
      sendContainer, sendBtn
    } = AccountStyle;
    const { listInvited } = this.props;
    return (
      <ScrollView>
        <View style={container}>
          <Text style={label}>Send Invite</Text>
          <View style={line} />
          <View style={ sendContainer }>
            <View style={textFieldContainer}>
              <TextInput
                style={textField}
                placeholder='Email or phone number'
                placeholderTextColor={colorTextGray}
                value={this.state.phone}
                onChangeText={
                    (phone) => this.setState({ phone })
                }
              />
            </View>
            {this.state.isLoading ? <Loading animating /> :
              <TouchableOpacity style={sendBtn} onPress={this.sendInvited.bind(this)}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
              </TouchableOpacity>
            }
          </View>
          <View style={{ marginVertical: 10 }} />
          <Text style={label}>List Invite ({listInvited !== null ? listInvited.length : 0})</Text>
          <View style={line} />
          {listInvited !== null ? this.renderListInvited(listInvited) : <Loading animating />}
        </View>
      </ScrollView>
    );
  }
}

//function call sate from store
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    listInvited: state.listInvited
  };
}

export default connect(mapStateToProps)(Invite);