'user trict';
const contactsReducer = (state = null, action) => {
  if(action.type === 'GET_LIST_CONTACTS') return action.data;
  return state;
}
export default contactsReducer;