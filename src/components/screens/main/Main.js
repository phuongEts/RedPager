import React, { Component } from 'react';

import { connect } from 'react-redux';
import Contacts from 'react-native-contacts';
import { SideMenu } from './Router';
import GetCurrentUser from '../../api/GetCurrentUser';
import GetToggleApp from '../../api/GetToggleApp';
import Fetch from '../../api/Fetch';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const { currentUser, textShare } = this.props;
        if (currentUser === null) {
            GetCurrentUser().then(user => {
                const currentUser = JSON.parse(user);
                this.props.dispatch({ type: 'SET_CURRENT_USER', currentUser });
            });
            GetToggleApp().then(user => {
                const currentUser = JSON.parse(user);
                this.props.dispatch({ type: 'SET_TOGGLE_APP', isOn: currentUser });
            });
        }
        Contacts.getAll((err, contacts) => {
            if(err === 'denied'){
                // error
            } else {
                // contacts returned in []
                console.log(contacts);
                this.props.dispatch({ type: 'GET_LIST_CONTACTS', data: contacts });
            }
        });
        if (textShare === null) {
            const value = {
                Action: 'getTextShare',
            };
            Fetch(value)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code === 1) { // ok
                    console.log(responseJson);
                    this.props.dispatch({ type: 'GET_TEXT_SHARE', data: responseJson.textShare });
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    render() {
        return (
            <SideMenu style={{ backgroundColor: 'transparent' }} />
        );
    }

}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        textShare: state.textShare
    };
}
export default connect(mapStateToProps)(Main);
