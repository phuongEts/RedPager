import { StackNavigator } from 'react-navigation';

import Init from '../../assets/Init';
import Pages from './Pages';

const { menuBgColor, whiteColor, FontSize18 } = Init;

const PagesStack = StackNavigator({
    Screen_Pages: {
        screen: Pages,
        navigationOptions: {
            title: 'Pages',
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

export default PagesStack;