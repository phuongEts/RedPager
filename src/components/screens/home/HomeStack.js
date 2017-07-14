
import { StackNavigator } from 'react-navigation';

import Home from './Home';
import Init from '../../assets/Init';

const { menuBgColor, whiteColor, FontSize18 } = Init;
const HomeStack = StackNavigator({
    Screen_Home: {
        screen: Home,
        navigationOptions: {
            title: 'RedPager',
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
export default HomeStack;
