'user trict';
import { StyleSheet } from 'react-native';

import Init from '../Init';

const { 
    FontSize16, menuBgColor, height, mainFontSize, width, FontSize18, whiteColor,
    colorTextGray, FontSize20
} = Init;

const Styles = StyleSheet.create({
    /** style menu **/
    containerMenu: {
        backgroundColor: menuBgColor,
        flex: 1
    },
    mainMenu: {
        backgroundColor: '#fff',
        height,
        marginTop: 50,
    },
    buttonMenu: {
        fontSize: FontSize20,
        color: whiteColor
    },
    touchBtnMenu: {
        marginLeft: 15
    },
    switchWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15,
        marginRight: 10,
        alignItems: 'center'
    },
    switchBtn: {
        marginLeft: 10
    },
    switchText: {
        textAlign: 'center'
    },
    menuItem: {
        marginVertical: 3,
        paddingVertical: 7
    },
    menuItemActive: {
        backgroundColor: colorTextGray
    },
    textMenuItem: {
        color: menuBgColor,
        fontWeight: 'bold',
        fontSize: mainFontSize,
        marginHorizontal: 15
    },
    textMenuItemActive: {
        color: whiteColor
    },
    lineMenu: {
        borderTopWidth: 1,
        borderTopColor: menuBgColor,
        marginTop: 15,
        marginHorizontal: 15
    },
    bottomMenu: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendWrap: {
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnsend: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 3,
        height: ((width / 3) / 180) * 60
    },
    btnsendText: {
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    shareIMG: {
        width: width > 320 ? width / 8 : width / 4,
        height: width > 320 ? width / 8 : width / 4
    },
    shareText: {
        textAlign: 'center',
        color: menuBgColor,
        fontWeight: 'bold'
    },
    /**
     * Home style
     */
    logoStyle: {
        width: width / 4,
        height: (width / (4 * 230)) * 202
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    switchWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    sendBtnImg: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 2.5,
        height: ((width / 2.5) / 180) * 60
    },
    sendContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    textSendBtn: {
        backgroundColor: 'transparent',
        color: whiteColor,
        fontSize: FontSize18,
        fontWeight: 'bold'
    },
    shareContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    shareText: {
        marginVertical: 10,
        fontSize: FontSize16
    },
    imgShare: {
        width: width > 320 ? width / 8 : width / 4,
        height: width > 320 ? width / 8 : width / 4
    }
});

export default Styles;
