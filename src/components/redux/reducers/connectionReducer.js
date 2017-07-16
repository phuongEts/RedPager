'user trict';
const connectionReducer = (state = null, action) => {
  if(action.type === 'GET_CONNECTION') return action.data;
  return state;
}
export default connectionReducer;