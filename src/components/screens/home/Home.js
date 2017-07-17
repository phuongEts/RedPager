import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ScrollView, Image, Switch
} from 'react-native';

import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from '../../assets/styles/Styles';
import logo from '../../../img/logo.png';
import bgBtnSendMenu from '../../../img/bgBtnSendMenu.png';
import shareImg from '../../../img/icon_share.png';
import Fetch from '../../api/Fetch';

const { touchBtnMenu, buttonMenu } = Styles;

class Home extends Component {
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
    componentDidMount() {
        const { currentUser, listPendingInvite } = this.props;
        
        if( currentUser !== null ) {
        const value = {
            Action: 'getListPendingInvite',
            idUser: currentUser.idUser
        };
        Fetch(value)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson) { // ok
                console.log(responseJson);
                this.props.dispatch({ type: 'GET_LIST_PENDING_INVITE', data: responseJson});
            }
        })
        .catch(error => {
            console.log(error);
        });
        }

    }
    render() {
        const { container, logoStyle, logoContainer, sendBtn, sendBtnImg } = Styles;
        const { 
            switchWrap, switchBtn, switchText, sendContainer, textSendBtn,
            shareContainer,  imgShare, shareText
        } = Styles;
        const { toggleApp, currentUser } = this.props;
        return (
            <ScrollView style={container}>
                <View style={logoContainer}>
                    <Image style={logoStyle} source={logo} />
                    <View style={switchWrap}>
                        <Text style={switchText}>{toggleApp ? 'On' : 'Off'}</Text>
                        <Switch
                            onValueChange={() => this.props.dispatch({ type: 'TOGGLE_APP' })}
                            style={switchBtn}
                            thumbTintColor='#b30b0d'
                            tintColor="#b30b0d"
                            value={toggleApp}
                        />
                    </View>
                </View>
                <View style={sendContainer}>
                    <TouchableOpacity onPress={() => console.log('sdjfhsd')}>
                        <Image style={sendBtnImg} source={bgBtnSendMenu}>
                            <Text style={textSendBtn}>Send Red Page</Text>
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={shareContainer}>
                    <TouchableOpacity style={shareContainer} onPress={() => console.log('sdjfhsd')}>
                        <Image style={imgShare} source={shareImg} />
                        <Text style={shareText} >Share</Text>
                        <Text style={shareText}>Tell a friend to download Red Pager</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

//function call sate from store
function mapStateToProps(state) {
  return {
    toggleApp: state.toggleApp,
    currentUser: state.currentUser,
    listPendingInvite: state.listPendingInvite
  };
}
export default connect(mapStateToProps)(Home);
