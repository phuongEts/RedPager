import { StackNavigator } from 'react-navigation';

import Login from './Login';
import Register from './Register';
import Init from '../../assets/Init';

const { menuBgColor, whiteColor, FontSize18 } = Init;
const LoginStack = StackNavigator({
    Screen_Login: {
        screen: Login,
        navigationOptions: {
            title: 'Login',
        }
    },
    Screen_Register: {
        screen: Register,
        navigationOptions: {
            title: 'Register',
        }
    }
},{
  navigationOptions: {
    headerStyle: {
      backgroundColor: menuBgColor
    },
    headerTitleStyle: {
      color: whiteColor,
      fontSize: FontSize18
    }
  }
});
export default LoginStack;
