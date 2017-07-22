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
import listSendReducer from './listSendReducer';
import contactsReducer from './contactsReducer';
import textShareReducer from './textShareReducer';
import activeMenuReducer from './activeMenuReducer';

const reducer = combineReducers({
    filterStatus: filterStatusReducer,
    toggleApp: toggleAppReducer,
    isLoading: loadingReducer,
    currentUser: authorReducer,
    dataUser: dataUserReducer,
    connections: connectionReducer,
    listPendings: listPendingsReducer,
    listInvited: listInvitedReducer,
    listPendingInvite: listPendingInviteReducer,
    listSend: listSendReducer,
    listContacts: contactsReducer,
    textShare: textShareReducer,
    activeMenu: activeMenuReducer
});
const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = {
            filterStatus: null,
            filterStatus: null,
            toggleApp: false,
            isLoading: false,
            currentUser: null,
            dataUser: null,
            connections: null,
            listPendings: null,
            listInvited: null,
            listPendingInvite: null,
            listSend: null,
            listContacts: null,
            textShare: null,
            activeMenu: 'Home'
        }
    }

    return reducer(state, action);
}
export default rootReducer;
