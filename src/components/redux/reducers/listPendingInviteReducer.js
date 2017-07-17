'user trict';
const listPendingInviteReducer = (state = null, action) => {
  if( action.type === 'GET_LIST_PENDING_INVITE') return action.data;
  if (action.type === 'UPDATE_LIST_PENDING_INVITE') {
    return state.map((e, i) => {
        if (e.id !== action.id) return e;
        return delete state[i];
    });
  }
  return state;
}
export default listPendingInviteReducer;