import { createStore } from 'redux';
import reducer from './reducers/Reducer';


// create store
const store = createStore(reducer);
export default store;
