import { combineReducers } from 'redux';
import filterStatusReducer from './filterReducer';
import toggleAppReducer from './toggleAppReducer';
import loadingReducer from './loadingReducer';
import authorReducer from './authorReducer';

const reducer = combineReducers({
    filterStatus: filterStatusReducer,
    toggleApp: toggleAppReducer,
    isLoading: loadingReducer,
    currentUser: authorReducer
});
export default reducer;
