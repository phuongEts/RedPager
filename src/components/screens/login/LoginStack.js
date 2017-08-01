import { StackNavigator } from 'react-navigation';

import Login from './Login';
import Register from './Register';
import ForgotPassStep1 from './ForgotPassStep1';
import ForgotPassStep2 from './ForgotPassStep2';
import ForgotPassStep3 from './ForgotPassStep3';
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
    },
    Screen_ForgotPassStep1: {
        screen: ForgotPassStep1,
        navigationOptions: {
            title: 'Forgot Password Step 1',
        }
    },
    Screen_ForgotPassStep2: {
        screen: ForgotPassStep2,
        navigationOptions: {
            title: 'Forgot Password Step 2',
        }
    },
    Screen_ForgotPassStep3: {
        screen: ForgotPassStep3,
        navigationOptions: {
            title: 'Forgot Password Step 3',
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
