import { StackNavigator } from 'react-navigation';

import Init from '../../assets/Init';
import Invite from './Invite';

const { menuBgColor, whiteColor, FontSize18 } = Init;


const InviteStack = StackNavigator({
    Screen_Invite: {
        screen: Invite,
        navigationOptions: {
            title: 'Invite',
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

export default InviteStack;
