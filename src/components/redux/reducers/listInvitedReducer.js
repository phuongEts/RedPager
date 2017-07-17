'user trict';
const listInvitedReducer = (state = null, action) => {
  if(action.type === 'GET_LIST_INVITED' || action.type === 'UPDATE_LIST_INVITED') return action.data;
  return state;
}
export default listInvitedReducer;