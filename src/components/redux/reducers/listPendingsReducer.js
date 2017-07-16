'user trict';
const listPendingsReducer = (state = null, action) => {
  if(action.type === 'GET_PENDINGS') return action.data;
  return state;
}
export default listPendingsReducer;