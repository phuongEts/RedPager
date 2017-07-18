'user trict';
const connectionReducer = (state = null, action) => {
  if(action.type === 'GET_CONNECTION') return action.data;
  if(action.type === 'UPDATE_CONNECTIONS') {
    return state.map(e => {
      if (e.id !== action.id) return e;
      return { ...e, name: action.name };
    })
  }
  if (action.type === 'TOGGLE_CONNECT') {
    return state.map(e => {
      if (e.id !== action.id) return e;
      return { ...e, connected: !action.checked };
    })
  }
  return state;
}
export default connectionReducer;