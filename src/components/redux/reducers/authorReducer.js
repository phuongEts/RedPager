'user trict';

const currentUser = null;

const authorReducer = (state = currentUser, action ) => {
  if(action.type === 'LOGIN') return action.user;
  if(action.type === 'LOGOUT') return null;
  if(action.type === 'SET_CURRENT_USER' && action.currentUser !== null ) return action.currentUser;
  return state;
}
export default authorReducer;