import React, { Component } from 'react';
import { 
    View, Text, TouchableOpacity, Switch, Image, AsyncStorage, Alert
} from 'react-native';

import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';

import Styles from '../../assets/styles/Styles';
import btShare from '../../../img/bgBtnSendMenu.png';
import shareIMGsource from '../../../img/icon_share.png';
import Logout from './Logout';
import Fetch from '../../api/Fetch';


class Menu extends Component {
    logOut() {
        Logout().then(() => {
            this.props.dispatch({ type: 'SET_TOGGLE_APP', isOn: false });
            this.props.dispatch({ type: 'LOGOUT' });
        })
    }
    clickItemMenu(name) {
        const { currentUser, navigation } = this.props; 
        this.props.dispatch({ type: 'SET_ACTIVE_MENU', data: name });
        if (currentUser === null) {
            Alert.alert(
              'You are not sign in',
              'Go to login?',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('Login')
                }
              ]
            );
        } else {
            navigation.navigate(name);
        }
    }
    toggleAppProcees() {
        const { toggleApp, currentUser } = this.props;
        if (currentUser !== null) {
            const value = {
                Action: 'changeToggleApp',
                avaiable: !toggleApp,
                idUser: currentUser.idUser
            };
            this.props.dispatch({ type: 'TOGGLE_APP' });
            Fetch(value)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code === 1) { // ok
                    AsyncStorage.setItem('toggleApp', JSON.stringify(!toggleApp));
                }
                Toast.show(responseJson.mess, {
                    duration: 1000,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0
                });
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            Toast.show('Not Login', {
                duration: 1000,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0
            });
        }
    }
    render() {
        const { navigation, toggleApp, currentUser, listPendingInvite, activeMenu } = this.props;
        const {
            containerMenu, mainMenu, switchWrap, switchBtn, switchText, menuItem,
            textMenuItem, lineMenu, sendWrap, shareText, shareIMG, btnsend, bottomMenu,
            btnsendText, menuItemActive, textMenuItemActive
        } = Styles;
        return (
            <View style={containerMenu}>
                <View style={mainMenu}>
                    <View style={switchWrap}>
                        <Text style={switchText}>{toggleApp ? 'On' : 'Off'}</Text>
                        <Switch
                            onValueChange={this.toggleAppProcees.bind(this)}
                            style={switchBtn}
                            value={toggleApp}
                        />
                    </View>
                    <TouchableOpacity style={[menuItem, activeMenu === 'Home' ? menuItemActive : null]} onPress={() => this.clickItemMenu('Home')}>
                        <Text style={[textMenuItem, activeMenu === 'Home' ? textMenuItemActive : null]}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[menuItem, activeMenu === 'Send' ? menuItemActive : null]} onPress={() => this.clickItemMenu('Send')}>
                        <Text style={[textMenuItem, activeMenu === 'Send' ? textMenuItemActive : null]}>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[menuItem, activeMenu === 'Connections' ? menuItemActive : null]} onPress={() => this.clickItemMenu('Connections')}>
                        <Text style={[textMenuItem, activeMenu === 'Connections' ? textMenuItemActive : null]}>My Connections</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[menuItem, activeMenu === 'Invite' ? menuItemActive : null]} onPress={() => this.clickItemMenu('Invite')}>
                        <Text style={[textMenuItem, activeMenu === 'Invite' ? textMenuItemActive : null]}>Invite a user to Connect</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[menuItem, activeMenu === 'PendingInvite' ? menuItemActive : null]} onPress={() => this.clickItemMenu('PendingInvite')}>
                        <Text style={[textMenuItem, activeMenu === 'PendingInvite' ? textMenuItemActive : null]}>Pending Invites ({listPendingInvite !== null ? listPendingInvite.length : 0})</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[menuItem, activeMenu === 'Pages' ? menuItemActive : null]} onPress={() => this.clickItemMenu('Pages')}>
                        <Text style={[textMenuItem, activeMenu === 'Pages' ? textMenuItemActive : null]}>Pages</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[menuItem, activeMenu === 'Account' ? menuItemActive : null]} onPress={() => this.clickItemMenu('Account')}>
                        <Text style={[textMenuItem, activeMenu === 'Account' ? textMenuItemActive : null]}>Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[menuItem, activeMenu === 'Share' ? menuItemActive : null]} 
                        onPress={() => {
                            navigation.navigate('Share');
                            this.props.dispatch({ type: 'SET_ACTIVE_MENU', data: 'Share' });
                        }}
                    >
                        <Text style={[textMenuItem, activeMenu === 'Share' ? textMenuItemActive : null]}>Tell a friend to download Red Pager</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[menuItem, activeMenu === 'FAQ' ? menuItemActive : null]} onPress={() => console.log('click menu')}>
                        <Text style={[textMenuItem, activeMenu === 'FAQ' ? textMenuItemActive : null]}>FAQ</Text>
                    </TouchableOpacity>
                    {currentUser !== null ? 
                        <TouchableOpacity style={[menuItem, activeMenu === 'Login' ? menuItemActive : null]} onPress={this.logOut.bind(this)}>
                            <Text style={[textMenuItem, activeMenu === 'Login' ? textMenuItemActive : null]}>Logout</Text>
                        </TouchableOpacity>
                        
                    :
                        <TouchableOpacity style={[menuItem, activeMenu === 'Login' ? menuItemActive : null]} onPress={() => navigation.navigate('Login')}>
                            <Text style={[textMenuItem, activeMenu === 'Login' ? textMenuItemActive : null]}>Login</Text>
                        </TouchableOpacity>
                    }
                    <View style={lineMenu} />
                    <View style={bottomMenu}>
                        <View style={sendWrap}>
                            <TouchableOpacity onPress={() => this.clickItemMenu('Send')}>
                                <Image style={btnsend} source={btShare} >
                                <Text style={btnsendText}>Send</Text>
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={sendWrap}>
                            <TouchableOpacity 
                                onPress={() => {
                                    navigation.navigate('Share');
                                    this.props.dispatch({ type: 'SET_ACTIVE_MENU', data: 'Share' });
                                }}
                            >
                                <Image style={shareIMG} source={shareIMGsource} />
                                <Text style={shareText}>Share</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

//function call sate from store
function mapStateToProps(state) {
  return {
    toggleApp: state.toggleApp,
    currentUser: state.currentUser,
    listPendingInvite: state.listPendingInvite,
    activeMenu: state.activeMenu
  };
}

export default connect(mapStateToProps)(Menu);
