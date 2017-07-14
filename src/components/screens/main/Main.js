import React, { Component } from 'react';

import { connect } from 'react-redux';
import { SideMenu } from './Router';
import GetCurrentUser from '../../api/GetCurrentUser';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        GetCurrentUser().then(user => {
            const currentUser = JSON.parse(user);
            this.props.dispatch({ type: 'SET_CURRENT_USER', currentUser });
            this.props.dispatch({ type: 'SET_TOGGLE_APP', isOn: currentUser.avaiable })
        });
    }
    render() {
        return (
            <SideMenu style={{ backgroundColor: 'transparent' }} />
        );
    }

}
/*
function mapStateToProps(state) {
  return { myFilterStatus: state.filterStatus };
}
*/
export default connect()(Main);
