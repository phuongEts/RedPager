import React, { Component } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, Alert
} from 'react-native';

import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from '../../assets/styles/Styles';
import AccountStyle from '../../assets/styles/AccountStyle';
import PendingInviteStyle from '../../assets/styles/PendingInviteStyle';
import ConnectionsStyle from '../../assets/styles/ConnectionsStyle';
import Init from '../../assets/Init';
import Fetch from '../../api/Fetch';
import Loading from '../main/Loading';

const { buttonMenu, touchBtnMenu, colorTextGray } = Styles;

class Pages extends Component {
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
      container, label, line, title
    } = AccountStyle;
    const { listLabel, listContainer } = PendingInviteStyle;
    
    return (
      <ScrollView>
        <View style={container}>
          <Text style={label}>Received</Text>
          <View style={line} />
          <View style={listLabel}>
            <Text style={title}>Name</Text>
            <View /><View />
            <Text style={title}>Date</Text>
          </View>


          <Text style={label}>Sent</Text>
          <View style={line} />
          <View style={listLabel}>
            <Text style={title}>Name</Text>
            <View /><View />
            <Text style={title}>Date</Text>
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
  };
}

export default connect(mapStateToProps)(Pages);