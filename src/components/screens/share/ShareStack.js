import { StackNavigator } from 'react-navigation';

import Init from '../../assets/Init';
import Share from './Share';

const { menuBgColor, whiteColor, FontSize18 } = Init;

const ShareStack = StackNavigator({
    Screen_Share: {
        screen: Share,
        navigationOptions: {
            title: 'Share',
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

export default ShareStack;