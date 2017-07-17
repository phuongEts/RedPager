import React, { Component } from 'react';

import { connect } from 'react-redux';
import { SideMenu } from './Router';
import GetCurrentUser from '../../api/GetCurrentUser';
import Fetch from '../../api/Fetch';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const { currentUser, listPendingInvite } = this.props;
        if (currentUser === null) {
            GetCurrentUser().then(user => {
                const currentUser = JSON.parse(user);
                this.props.dispatch({ type: 'SET_CURRENT_USER', currentUser });
                this.props.dispatch({ type: 'SET_TOGGLE_APP', isOn: currentUser.avaiable })
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
    };
}
export default connect(mapStateToProps)(Main);
