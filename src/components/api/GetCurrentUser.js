'user trict';
import { AsyncStorage } from 'react-native';

const getCurrentUser = async() => {
  try {
    const currentUser = await AsyncStorage.getItem('current_user');
    //return currentUser;
    if (currentUser !== null) {
      return currentUser;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export default getCurrentUser;
