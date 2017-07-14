import { StackNavigator } from 'react-navigation';

import Account from './Account';
import Init from '../../assets/Init';

const { menuBgColor, whiteColor, FontSize18 } = Init;
const AccountStack = StackNavigator({
  Screen_Account: {
      screen: Account,
      navigationOptions: {
          title: 'Account',
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
export default AccountStack;