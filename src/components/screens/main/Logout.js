import { AsyncStorage } from 'react-native';

const LogOut = async () => {
    try {
        await AsyncStorage.removeItem('current_user');
        await AsyncStorage.removeItem('toggleApp');
    } catch (error) {
    // Error retrieving data
        return '';
    }
};

export default LogOut;