import React, { Component } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Alert, Switch
} from 'react-native';

import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-checkbox';
import Toast from 'react-native-root-toast';

import Styles from '../../assets/styles/Styles';
import AccountStyle from '../../assets/styles/AccountStyle';
import Init from '../../assets/Init';
import Fetch from '../../api/Fetch';
import ConnectionsStyle from '../../assets/styles/ConnectionsStyle';
import checkedImageUrl from '../../../img/check.png';
import uncheckedImageUrl from '../../../img/uncheck.png';
import ModalStyle from '../../assets/styles/ModalStyle';
import Loading from '../main/Loading';

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
      modalVisible: false,
      action: null,
      id: null,
      name: '',
      isLoading: false,
      Vibrate: true,
      Light: true,
      Sound: true
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
  editName() {
    console.log(this.state);
    const { currentUser } = this.props;
    if (this.state.name !== '') {
      this.setState({ isLoading: true });
      const value = {
        Action: 'editNameUserConnect',
        idUser: currentUser.idUser,
        idUserConnect: this.state.id,
        title: this.state.name
      }

      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) { // ok
          console.log(responseJson);
          if(responseJson.code === 1) {
            //success
            this.props.dispatch({ type: 'UPDATE_CONNECTIONS', id: this.state.id, name: this.state.name });
            this.setState({ modalVisible: false });
            console.log(this.props.connections);
          } else {
            Alert.alert(
              'Error!',
              'Have an error, please try again!',
              [
                { text: 'OK', onPress: () => console.log('OK Pressed!') },
              ]
            );
          }
        }
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });

    } else {
      Alert.alert(
        'Error!',
        'Field name is empty',
        [
            { text: 'OK', onPress: () => console.log('OK Pressed!') },
        ]
      );
    }
  }
  configUser() {
    const { currentUser } = this.props;
    if (this.state.id !== null) {
      this.setState({ isLoading: true });
      const value = {
        Action: 'setConfigUser',
        idUser: currentUser.idUser,
        idUserConnect: this.state.id,
        vibrate: this.state.Vibrate,
        light: this.state.Light,
        sound: this.state.Sound
      };
      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) { // ok
          console.log(responseJson);
          const mess = '';
          if(responseJson.code === 1) {
            //success
            mess = 'Config user success!';
          } else {
            mess = 'Error, try again!';
          }
          this.setState({ modalVisible: false });
          Toast.show(mess, {
            duration: 1000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          });
        }
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
    }
  }
  renderModal() {
    let contentModal = '';
    let titleModal = 'Modal';
    const { 
      modalContainer, modalWrap, closebtn, closeModal, textInput , inputWrap, addTextbtn,
      addButton, titleModalContainer, titleStyle, switchContainer, item, textItem, switchBtn
    } = ModalStyle;
    const { action, id, name } = this.state;
    if (action === 'edit') {
      titleModal = 'Edit name:';
      contentModal = (
        <View style={inputWrap}>
          <TextInput
            style={textInput}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder='Edit name'
            placeholderTextColor='#d1d0d0'
          />
          {this.state.isLoading ? <Loading animating /> : 
            <TouchableOpacity style={addButton} onPress={this.editName.bind(this)}>
              <Text style={addTextbtn}>ADD</Text>
            </TouchableOpacity>
          }
        </View>
      );
    } else if (action === 'config') {
      titleModal = 'config for ' + name;
      contentModal = (
        <View style={inputWrap}>
          <View style={switchContainer}>
            <View style={item}>
              <Text style={textItem}>Vibrate</Text>
              <Switch
                onValueChange={() => this.setState({ Vibrate: !this.state.Vibrate })}
                style={switchBtn}
                value={this.state.Vibrate}
              />
            </View>
            <View style={item}>
              <Text style={textItem}>Light</Text>
              <Switch
                onValueChange={() => this.setState({ Light: !this.state.Light })}
                style={switchBtn}
                value={this.state.Light}
              />
            </View>
            <View style={item}>
              <Text style={textItem}>Sound</Text>
              <Switch
                onValueChange={() => this.setState({ Sound: !this.state.Sound })}
                style={switchBtn}
                value={this.state.Sound}
              />
            </View>
          </View>
          {this.state.isLoading ? <Loading animating /> : 
            <TouchableOpacity style={addButton} onPress={this.configUser.bind(this)}>
              <Text style={addTextbtn}>SAVE</Text>
            </TouchableOpacity>
          }
        </View>
      );
    }
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalVisible}
      >
         <View style={modalContainer}>
          <View style={modalWrap}>
            <View style={titleModalContainer}>
              <View />
              <Text style={titleStyle}>{titleModal}</Text>
              <TouchableOpacity style={closeModal} onPress={() => this.setState({ modalVisible: false })}>
                <FontAwesome name='times' style={closebtn} />
              </TouchableOpacity>
            </View>

            {contentModal}

          </View>
         </View>
       </Modal>
    );
  }
  openmodal(action, id, name) {
    if (action !== null && id !== null) {
      const { currentUser } = this.props;
      if (action === 'config') {
        const value = {
          Action: 'getDataConfigUser',
          idUser: currentUser.idUser,
          idUserConnect: id
        };
        Fetch(value)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson) { // ok
            console.log(responseJson);
            if(responseJson.code === 1) {
              //success, set new state
              this.setState({
                modalVisible: true,
                action,
                id,
                name,
                Vibrate: responseJson.data.vibrate,
                Light: responseJson.data.light,
                Sound: responseJson.data.sound
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        this.setState({
          modalVisible: true,
          action,
          id,
          name
        });
      }

    }
  }
  checkConnected(checked, id) {
    console.log(id + ' : ' + checked);
    const { currentUser } = this.props;
    if (checked !== null && id !== null) {
      const value = {
        Action: 'changeConnect',
        id,
        checked,
        idUser: currentUser.idUser
      };
      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) { // ok
          console.log(responseJson);
          if(responseJson.code === 1) {
            //success
            this.props.dispatch({ type: 'TOGGLE_CONNECT', id, checked });
            console.log(this.props.connections);
          } else {
            Alert.alert(
              'Error!',
              responseJson.mess,
              [
                { text: 'OK', onPress: () => console.log('OK Pressed!') },
              ]
            );
          }
          Toast.show(responseJson.mess, {
            duration: 1000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
    
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
          <TouchableOpacity onPress={() => this.openmodal('edit', item.id, item.name)} style={btnEdit} >
              <FontAwesome name='pencil-square-o' style={btnFa} />
          </TouchableOpacity>
          <TouchableOpacity style={btnText} onPress={() => this.openmodal('config', item.id, item.name)}>
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
            onChange={(checked) => this.checkConnected(checked, item.id)}
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
        {this.renderModal()}
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