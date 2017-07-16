'user trict';

const dataUserReducer = (state = null, action) => {
  if(action.type === 'GET_DATA_USER') return action.data;
  return state;
}
export default dataUserReducer;