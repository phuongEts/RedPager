import React, { Component } from 'react';

import { Provider } from 'react-redux';
import Main from './screens/main/Main';
import store from './redux/Store';

class App extends Component {
    render() {
        return (
            <Provider store={store} >
                <Main />
            </Provider>
        );
    }
    
}
export default App;
