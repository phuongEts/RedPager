import React, { Component } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, TextInput, Alert
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

class PendingInvite extends Component {
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
      isLoading1: false,
      isLoading2: false
    };
  }
  acceptInvite(idInvite) {
    const { currentUser, dispatch } = this.props;
    if (idInvite !== null && currentUser !== null) {
      this.setState({ isLoading1: true });
      const value = {
        Action: 'accpetInvite',
        idUser: currentUser.idUser,
        idInvite
      };
      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) { // ok
          console.log(responseJson);
          if (responseJson.code === 1) { // accpet successfully
            Alert.alert(
              'Success!',
              responseJson.mess,
              [
                  { text: 'OK', onPress: () => this.updatelistPendingInvite(idInvite) },
              ]
            );
          } else {
            Alert.alert(
              'Error!',
              responseJson.mess,
              [
                  { text: 'OK', onPress: () => console.log('error') },
              ]
            );
          }
          //this.props.dispatch({ type: 'GET_LIST_INVITED', data: responseJson});
          this.setState({ isLoading1: false })
        }
      })
      .catch(error => {
          console.log(error);
      });
    }
  }
  updatelistPendingInvite(idInvite) {
    const { currentUser } = this.props;
    const value = {
      Action: 'listConnections',
      idUser: currentUser.idUser
    };

    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) { // ok
        console.log(responseJson);
        this.props.dispatch({ type: 'GET_CONNECTION', data: responseJson});
      }
    })
    .catch(error => {
        console.log(error);
    });
    this.props.dispatch({ type: 'UPDATE_LIST_PENDING_INVITE', id: idInvite});
  }
  renderData(data) {
    const { listPendingInvite } = this.props;
    if (listPendingInvite !== null) {
      console.log(listPendingInvite);
      const arrayRender = [];
      const { ConnectionsContainer } = ConnectionsStyle;
      const { title, btn, textBtn } = PendingInviteStyle;
      data.map((item, i) => arrayRender.push(
        <View style={[ConnectionsContainer, { marginVertical: 5 }]} key={i}>
          <Text style={title}>{item.name}</Text>
          <Text style={title}>{item.date}</Text>
          {this.state.isLoading1 ? <Loading animating /> : 
            <TouchableOpacity style={btn} onPress={() => this.acceptInvite(item.id)}>
              <Text style={textBtn}>Accept</Text>
            </TouchableOpacity>
          }
          <TouchableOpacity style={btn} onPress={() => console.log('dsf')}>
            <Text style={textBtn}>Delete</Text>
          </TouchableOpacity>
        </View>
      ));
      return arrayRender;
    }
  }
  render() {
    const { 
      container, label, line, title
    } = AccountStyle;
    const { listLabel, listContainer } = PendingInviteStyle;
    const { listPendingInvite } = this.props;
    return (
      <ScrollView>
        <View style={container}>
          <Text style={label}>Invite Waiting ({listPendingInvite !== null ? listPendingInvite.length : 0})</Text>
          <View style={line} />
          <View style={listLabel}>
            <Text style={title}>Name</Text>
            <View /><View />
            <Text style={title}>Action</Text>
          </View>
          <View style={listContainer}>
            {listPendingInvite !== null ? this.renderData(listPendingInvite) : null}
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
    listPendingInvite: state.listPendingInvite
  };
}

export default connect(mapStateToProps)(PendingInvite);