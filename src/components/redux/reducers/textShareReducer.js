'user trict';
const textShareReducer = (state = null, action) => {
  if(action.type === 'GET_TEXT_SHARE') return action.data;
  return state;
}
export default textShareReducer;