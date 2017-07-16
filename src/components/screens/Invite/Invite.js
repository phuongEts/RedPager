import React, { Component } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, TextInput
} from 'react-native';

import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Styles from '../../assets/styles/Styles';
import AccountStyle from '../../assets/styles/AccountStyle';
import LoginStyle from '../../assets/styles/LoginStyle';
import Init from '../../assets/Init';
import Fetch from '../../api/Fetch';

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
    this.state = {};
  }
  render() {
    const { 
      container, label, line, textField , textFieldContainer,
      sendContainer, sendBtn
    } = AccountStyle;
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
            <TouchableOpacity style={sendBtn}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: 10 }} />
          <Text style={label}>List Invite</Text>
          <View style={line} />
        </View>
      </ScrollView>
    );
  }
}

//function call sate from store
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    connections: state.connections,
    listPendings: state.listPendings
  };
}

export default connect(mapStateToProps)(Invite);