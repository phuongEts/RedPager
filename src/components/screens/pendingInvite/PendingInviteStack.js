import { StackNavigator } from 'react-navigation';

import Init from '../../assets/Init';
import PendingInvite from './PendingInvite';

const { menuBgColor, whiteColor, FontSize18 } = Init;


const PendingInviteStack = StackNavigator({
    Screen_PendingInvite: {
        screen: PendingInvite,
        navigationOptions: {
            title: 'Invites Waiting',
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

export default PendingInviteStack;