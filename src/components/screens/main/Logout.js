import { AsyncStorage } from 'react-native';

const LogOut = async () => {
    try {
        await AsyncStorage.removeItem('current_user');
    } catch (error) {
    // Error retrieving data
        return '';
    }
};

export default LogOut;