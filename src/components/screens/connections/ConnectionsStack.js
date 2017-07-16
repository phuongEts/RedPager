import { StackNavigator } from 'react-navigation';

import Connections from './Connections';
import Init from '../../assets/Init';

const { menuBgColor, whiteColor, FontSize18 } = Init;
const ConnectionsStack = StackNavigator({
    Screen_Connections: {
        screen: Connections,
        navigationOptions: {
            title: 'Connections',
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
export default ConnectionsStack;