'user trict';
const activeMenuReducer = (state = 'Home', action) => {
  if(action.type === 'SET_ACTIVE_MENU') return action.data;
  return state;
}
export default activeMenuReducer;