import { combineReducers } from 'redux';
import filterStatusReducer from './filterReducer';
import toggleAppReducer from './toggleAppReducer';
import loadingReducer from './loadingReducer';
import authorReducer from './authorReducer';
import dataUserReducer from './dataUserReducer';
import connectionReducer from './connectionReducer';
import listPendingsReducer from './listPendingsReducer';
import listInvitedReducer from './listInvitedReducer';
import listPendingInviteReducer from './listPendingInviteReducer';

const reducer = combineReducers({
    filterStatus: filterStatusReducer,
    toggleApp: toggleAppReducer,
    isLoading: loadingReducer,
    currentUser: authorReducer,
    dataUser: dataUserReducer,
    connections: connectionReducer,
    listPendings: listPendingsReducer,
    listInvited: listInvitedReducer,
    listPendingInvite: listPendingInviteReducer
});
export default reducer;
