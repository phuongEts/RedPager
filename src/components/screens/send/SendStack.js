import { StackNavigator } from 'react-navigation';

import Init from '../../assets/Init';
import Send from './Send';

const { menuBgColor, whiteColor, FontSize18 } = Init;

const SendStack = StackNavigator({
    Screen_Send: {
        screen: Send,
        navigationOptions: {
            title: 'Send',
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

export default SendStack;