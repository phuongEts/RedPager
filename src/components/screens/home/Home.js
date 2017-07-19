import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ScrollView, Image, Switch, Modal
} from 'react-native';

import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';

import Styles from '../../assets/styles/Styles';
import logo from '../../../img/logo.png';
import bgBtnSendMenu from '../../../img/bgBtnSendMenu.png';
import shareImg from '../../../img/icon_share.png';
import Fetch from '../../api/Fetch';
import ModalStyle from '../../assets/styles/ModalStyle';
import Loading from '../main/Loading';
import SendStyle from '../../assets/styles/SendStyle';

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
        this.state = {
            isLoading: false,
            modalVisible: false,
        };
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
    sendPage(id) {
        const { currentUser } = this.props;
        if (currentUser !== null) {
            const value = {
                Action: 'sendPage',
                idUser: currentUser.idUser,
                idUserAlert: id
            };
            Fetch(value)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson) { // ok
                    console.log(responseJson);
                    Toast.show(responseJson.mess, {
                        duration: 1000,
                        position: Toast.positions.BOTTOM,
                        shadow: false,
                        animation: true,
                        hideOnPress: true,
                        delay: 0
                    });
                    //this.props.dispatch({ type: 'GET_LIST_PENDING_INVITE', data: responseJson});
                }
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            Toast.show('Error, please try again!', {
                duration: 1000,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0
            });
        }
    }
    openListSend() {
        const { currentUser, listSend } = this.props;
        if (currentUser !== null && listSend === null) {
            const value = {
                Action: 'getListSendAlert',
                idUser: currentUser.idUser
            };
            Fetch(value)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson) { // ok
                console.log(responseJson);
                if (responseJson.code === 1) {
                    this.props.dispatch({ type: 'GET_LIST_SEND', data: responseJson.listSend });
                }
                //this.props.dispatch({ type: 'GET_LIST_SEND', data: responseJson });
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
        this.setState({ modalVisible: true });
    }
    renderModal() {
        let contentModal = [];
        let titleModal = 'List Send';
        const { 
            modalContainer, modalWrap, closebtn, closeModal, titleModalContainer, titleStyle
        } = ModalStyle;
        const { rowItem, textItem, avaiableStyle, btn, textBtn, avaiableAtive } = SendStyle;
        const { listSend } = this.props;
        if (listSend !== null) {
            listSend.map((item, i) => contentModal.push(
                <View key={i} style={rowItem}>
                <Text style={textItem}>{item.name}</Text>
                <View style={[avaiableStyle, item.avaiable ? avaiableAtive : null]} />
                <TouchableOpacity onPress={() => this.sendPage(item.id)} style={btn}>
                    <Text style={textBtn}>Send Page</Text>
                </TouchableOpacity>
                </View>
            ));
        } else {
            contentModal.push(
                <Loading animating />
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
    toggleAppProcees() {
        //this.props.dispatch({ type: 'TOGGLE_APP' });
        const { toggleApp, currentUser } = this.props;
        const value = {
            Action: 'changeToggleApp',
            avaiable: !toggleApp,
            idUser: currentUser.idUser
        };
        Fetch(value)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.code === 1) { // ok
                this.props.dispatch({ type: 'TOGGLE_APP' });
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
                            onValueChange={this.toggleAppProcees.bind(this)}
                            style={switchBtn}
                            thumbTintColor='#b30b0d'
                            tintColor="#b30b0d"
                            value={toggleApp}
                        />
                    </View>
                </View>
                <View style={sendContainer}>
                    <TouchableOpacity onPress={this.openListSend.bind(this)}>
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
                {this.renderModal()}
            </ScrollView>
        );
    }
}

//function call sate from store
function mapStateToProps(state) {
  return {
    toggleApp: state.toggleApp,
    currentUser: state.currentUser,
    listPendingInvite: state.listPendingInvite,
    listSend: state.listSend
  };
}
export default connect(mapStateToProps)(Home);
