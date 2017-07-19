import React from 'react';
import { ScrollView } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import Init from '../../../components/assets/Init';
import HomeStack from '../home/HomeStack';
import LoginStack from '../login/LoginStack';
import AccountStack from '../account/AccountStack';
import ConnectionsStack from '../connections/ConnectionsStack';
import Menu from './Menu';
import InviteStack from '../Invite/InviteStack';
import PendingInviteStack from '../pendingInvite/PendingInviteStack';
import PagesStack from '../pages/PagesStack';
import SendStack from '../send/SendStack';

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
    },
    Connections: {
        screen: ConnectionsStack
    },
    Invite: {
        screen: InviteStack
    },
    PendingInvite: {
        screen: PendingInviteStack
    },
    Pages: {
        screen: PagesStack
    },
    Send: {
        screen: SendStack
    }
},
    {
        drawerWidth: (width / 4) * 3,
        drawerPosition: 'left',
        contentComponent: props =>
        <ScrollView style={{ backgroundColor: whiteColor }}><Menu {...props} /></ScrollView>

    }
);
