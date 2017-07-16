import React, { Component } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-checkbox';
import Styles from '../../assets/styles/Styles';
import AccountStyle from '../../assets/styles/AccountStyle';
import Init from '../../assets/Init';
import Fetch from '../../api/Fetch';
import ConnectionsStyle from '../../assets/styles/ConnectionsStyle';
import checkedImageUrl from '../../../img/check.png';
import uncheckedImageUrl from '../../../img/uncheck.png';

const { buttonMenu, touchBtnMenu } = Styles;
const { mainBgColor } = Init;

class Connections extends Component {
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
      isChecked: false
    }
  }
  componentDidMount() {
    const { currentUser, connections, listPendings } = this.props;
    if(currentUser !== null && connections === null) {
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
    }

    if(currentUser !== null && listPendings === null) {
      const value = {
        Action: 'listPendings',
        idUser: currentUser.idUser
      };

      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) { // ok
          console.log(responseJson);
          this.props.dispatch({ type: 'GET_PENDINGS', data: responseJson});
        }
      })
      .catch(error => {
          console.log(error);
      });
    }
  }
  clickEdit(id) {
    console.log(id);
  }
  checkboxProcess(id) {
    console.log(id);
  }
  renderData(data) {
    if(data !== null && data !== '') {
      const arrayRender = [];
      const {
        btnEdit, btnFa, btnText, checkBoxStyle, ConnectionsContainer,
        checkBoxContainer
      } = ConnectionsStyle;
      const { container, label, line, title } = AccountStyle;
      data.map((item, i) => arrayRender.push(
        <View style={ConnectionsContainer} key={i}>
          <TouchableOpacity onPress={() => this.clickEdit(item.id)} style={btnEdit} >
              <FontAwesome name='pencil-square-o' style={btnFa} />
          </TouchableOpacity>
          <TouchableOpacity style={btnText}>
            <Text style={title}>{item.name}</Text>
          </TouchableOpacity>
          <CheckBox
            style={checkBoxStyle}
            label=''
            checkedImage={checkedImageUrl}
            uncheckedImage={uncheckedImageUrl}
            checked={item.connected}
            containerStyle={checkBoxStyle}
            underlayColor={'transparent'}
            onChange={(checked) => console.log('I am checked', checked)}
          />
        </View>
      ));
      return arrayRender;
    }
  }
  renderPendings(data) {
    if(data !== null && data !== '') {
      const arrayRender = [];
      const { ConnectionsContainer } = ConnectionsStyle;
      const { title } = AccountStyle;
      data.map((item, i) => arrayRender.push(
        <View style={ConnectionsContainer} key={i}>
          <Text style={title}>{item.name}</Text>
          <Text style={title}>{item.date}</Text>
        </View>
      ));
      return arrayRender;
    }
  }
  render() {
    const { container, label, line, title } = AccountStyle;
    const {
      btnEdit, btnFa, btnText, checkBoxStyle, ConnectionsContainer,
      checkBoxContainer
    } = ConnectionsStyle;
    const { connections, listPendings } = this.props;
    return (
      <ScrollView>
        <View style={container}>
          <Text style={label}>Connections ({connections !== null ? connections.length : 0})</Text>
          <View style={line} />
          {connections !== null ? this.renderData(connections) : null}
          <View style={{ marginVertical: 15 }} />
          <Text style={label}>Pendings ({listPendings !== null ? listPendings.length : 0})</Text>
          <View style={line} />
          {listPendings !== null ? this.renderPendings(listPendings) : null}
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

export default connect(mapStateToProps)(Connections);