'user trict';
const listSendReducer = (state = null, action) => {
  if(action.type === 'GET_LIST_SEND') return action.data;
  return state;
}
export default listSendReducer;