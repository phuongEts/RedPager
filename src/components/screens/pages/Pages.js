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
import PagesStyle from '../../assets/styles/PagesStyle';
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
    this.state = {
      data: null,
      isLoading: false,
      isLoading2: false
    };
  }
  componentDidMount() {
    const { currentUser } = this.props;
    console.log(currentUser);
    if (currentUser !== null) {
      const value = {
        Action: 'getListPages',
        idUser: currentUser.idUser
      };
      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) { // ok
          console.log(responseJson);
          if (responseJson.code === 1) {
            this.setState({ data: responseJson });
          }
        }
      })
      .catch(error => {
          console.log(error);
      });
    }
  }
  renderReveiced(action) {
    const renderData = [];
    const { data } = this.state;
    console.log(data);
    const { rowItem, textItem } = PagesStyle;
    if (action === 'received') {
      if (data !== null && data.listReceived.length > 0) {
        console.log('check');
        data.listReceived.map((item, i) => renderData.push(
          <View key={i} style={rowItem}>
            <Text style={textItem}>{item.name}</Text>
            <Text style={textItem}>{item.date}</Text>
          </View>
        ));
      }
    }
    if (action === 'sended') {
      if (data !== null && data.listSended.length > 0) {
        data.listSended.map((item, i) => renderData.push(
          <View key={i} style={rowItem}>
            <Text style={textItem}>{item.name}</Text>
            <Text style={textItem}>{item.date}</Text>
          </View>
        ));
      }
    }
    return renderData;
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
          <View style={listContainer}>
            {this.state.data !== null ? this.renderReveiced('received') : null}
          </View>

          <Text style={label}>Sent</Text>
          <View style={line} />
          <View style={listLabel}>
            <Text style={title}>Name</Text>
            <View /><View />
            <Text style={title}>Date</Text>
          </View>
          <View style={listContainer}>
            {this.state.data !== null ? this.renderReveiced('sended') : null}
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