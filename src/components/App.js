import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { Worker } from 'react-native-workers';

import Main from './screens/main/Main';
import store from './redux/Store';

class App extends Component {
    componentDidMount() {
        this.worker = new Worker('workers.js');

        this.worker.onmessage = (message) => {
            console.log("Got message from worker", message);
        }
    }
    render() {
        return (
            <Provider store={store} >
                <Main />
            </Provider>
        );
    }
    
}
export default App;
