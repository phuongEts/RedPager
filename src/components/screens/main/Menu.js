import React, { Component } from 'react';
import { 
    View, Text, TouchableOpacity, Switch, Image, AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';
import Styles from '../../assets/styles/Styles';
import btShare from '../../../img/bgBtnSendMenu.png';
import shareIMGsource from '../../../img/icon_share.png';
import Logout from './Logout';


class Menu extends Component {
    logOut() {
        Logout().then(() => {
            this.props.dispatch({ type: 'LOGOUT' });
            this.props.dispatch({ type: 'SET_TOGGLE_APP', isOn: false });
        })
    }
    clickItemMenu(name) {
        const { currentUser, navigation } = this.props; 
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
    render() {
        const { navigation, toggleApp, currentUser } = this.props;
        const {
            containerMenu, mainMenu, switchWrap, switchBtn, switchText, menuItem,
            textMenuItem, lineMenu, sendWrap, shareText, shareIMG, btnsend, bottomMenu,
            btnsendText
        } = Styles;
        return (
            <View style={containerMenu}>
                <View style={mainMenu}>
                    <View style={switchWrap}>
                        <Text style={switchText}>{toggleApp ? 'On' : 'Off'}</Text>
                        <Switch
                            onValueChange={() => this.props.dispatch({ type: 'TOGGLE_APP' })}
                            style={switchBtn}
                            value={toggleApp}
                        />
                    </View>
                    <TouchableOpacity style={menuItem} onPress={() => console.log('click menu')}>
                        <Text style={textMenuItem}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuItem} onPress={() => console.log('click menu')}>
                        <Text style={textMenuItem}>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuItem} onPress={() => console.log('click menu')}>
                        <Text style={textMenuItem}>My Connections</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuItem} onPress={() => console.log('click menu')}>
                        <Text style={textMenuItem}>Invite a user to Connect</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuItem} onPress={() => console.log('click menu')}>
                        <Text style={textMenuItem}>Pending Invites(0)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuItem} onPress={() => console.log('click menu')}>
                        <Text style={textMenuItem}>Pages</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuItem} onPress={() => this.clickItemMenu('Account')}>
                        <Text style={textMenuItem}>Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuItem} onPress={() => console.log('click menu')}>
                        <Text style={textMenuItem}>Tell a friend to download Red Pager</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={menuItem} onPress={() => console.log('click menu')}>
                        <Text style={textMenuItem}>FAQ</Text>
                    </TouchableOpacity>
                    {currentUser !== null ? 
                        <TouchableOpacity style={menuItem} onPress={this.logOut.bind(this)}>
                            <Text style={textMenuItem}>Logout</Text>
                        </TouchableOpacity>
                        
                    :
                        <TouchableOpacity style={menuItem} onPress={() => navigation.navigate('Login')}>
                            <Text style={textMenuItem}>Login</Text>
                        </TouchableOpacity>
                    }
                    <View style={lineMenu} />
                    <View style={bottomMenu}>
                        <View style={sendWrap}>
                            <TouchableOpacity>
                                <Image style={btnsend} source={btShare} >
                                <Text style={btnsendText}>Send</Text>
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={sendWrap}>
                            <TouchableOpacity>
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
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(Menu);
