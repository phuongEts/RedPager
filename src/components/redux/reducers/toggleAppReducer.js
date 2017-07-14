const toggleAppReducer = (state = false, action ) => {
  if(action.type === 'TOGGLE_APP') return !state;
  if(action.type === 'SET_TOGGLE_APP') return action.isOn;
  return state
}
export default toggleAppReducer;
