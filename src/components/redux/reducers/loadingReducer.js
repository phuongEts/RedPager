const loadingReducer = (state = false, action ) => {
  if(action.type === 'LOADING') return !state;
  return state
}
export default loadingReducer;