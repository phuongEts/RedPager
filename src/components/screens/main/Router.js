import React from 'react';
import { ScrollView } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import Init from '../../../components/assets/Init';
import HomeStack from '../home/HomeStack';
import LoginStack from '../login/LoginStack';
import AccountStack from '../account/AccountStack';
import Menu from './Menu';

const { width, whiteColor } = Init;

export const SideMenu = DrawerNavigator({
    Home: {
        screen: HomeStack
    },
    Login: {
        screen: LoginStack
    },
    Account: {
        screen: AccountStack
    }
},
    {
        drawerWidth: (width / 4) * 3,
        drawerPosition: 'left',
        contentComponent: props =>
        <ScrollView style={{ backgroundColor: whiteColor }}><Menu {...props} /></ScrollView>

    }
);
