'user trict';
import { AsyncStorage } from 'react-native';

const getToggleApp = async() => {
  try {
    const currentUser = await AsyncStorage.getItem('toggleApp');
    //return currentUser;
    if (currentUser !== null) {
      return currentUser;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export default getToggleApp;