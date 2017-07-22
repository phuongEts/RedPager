import React, { Component } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, Alert
} from 'react-native';

import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import Contacts from 'react-native-contacts';
import Communications from 'react-native-communications';

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
    const { listContacts } = this.props;
    if (listContacts === null) {
      Contacts.getAll((err, contacts) => {
        if(err === 'denied'){
            // error
          Toast.show('can not get list contacts on phone', {
            duration: 1000,
            position: Toast.positions.BOTTOM,
            shadow: false,
            animation: true,
            hideOnPress: true,
            delay: 0
          });
        } else {
            // contacts returned in []
            console.log(contacts);
            this.props.dispatch({ type: 'GET_LIST_CONTACTS', data: contacts });
        }
      });
    }
  }
  clickShare(item) {
    const { textShare } = this.props;
    const name = item.familyName === '' || item.familyName === null ? item.givenName : item.familyName;
    if (item.phoneNumbers !== null) {
      item.phoneNumbers.map(val => {
        if (val.number !== null && val.number !== '') {
          return Communications.text(val.number, textShare);
        }
      });
    }
  }
  renderData() {
    const listData = [];
    const { listContacts } = this.props;
    const { rowItem, textItem, avaiableStyle, btn, textBtn, avaiableAtive } = SendStyle;
    if (listContacts !== null) {
      listContacts.map((item, i) => listData.push(
        <View key={i} style={rowItem}>
          <Text style={textItem}>{item.familyName === null || item.familyName === '' ? item.givenName : item.familyName}</Text>
          <TouchableOpacity onPress={() => this.clickShare(item)} style={btn}>
            <Text style={textBtn}>Share</Text>
          </TouchableOpacity>
        </View>
      ));
    }
    return listData;
  }
  render() {
    const { container, label, line, title } = AccountStyle;
    const { listContacts } = this.props;
    return (
      <ScrollView>
        <View style={container}>
          <Text style={label}>Contacts List ({listContacts !== null ? listContacts.length : 0})</Text>
          <View style={line} />
          {listContacts !== null ? this.renderData() : null}
        </View>
      </ScrollView>
    );
  }
}
//function call sate from store
function mapStateToProps(state) {
  return {
    listContacts: state.listContacts,
    textShare: state.textShare
  };
}

export default connect(mapStateToProps)(Send);