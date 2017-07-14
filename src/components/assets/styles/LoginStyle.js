import { StyleSheet } from 'react-native';

import Init from '../Init';

const { height, width, FontSize18 } = Init;

const Styles = StyleSheet.create({
    bgLogin: {
        height,
        width,
        resizeMode: 'cover',
    },
    contentSignIn: {
        backgroundColor: 'transparent',
        paddingTop: 30
    },
    rowLogo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    Logo: {
        width: width / 4,
        height: (width / (4 * 230)) * 202
    },
    logoText: {
        color: '#fff',
        fontSize: FontSize18,
        marginTop: 15,
        fontWeight: 'bold'
    },
    formLogin: {
        justifyContent: 'center',
        paddingTop: 10,
        alignItems: 'center',
    },
    textFieldWrap: {
        marginTop: 15
    },
    bgInput: {
        resizeMode: 'cover',
        width: width - (width / 3),
        height: ((width - (width / 3)) / 380) * 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textField: {
        color: '#fff',
        flex: 1,
        paddingHorizontal: 10,
        fontSize: FontSize18,
        marginHorizontal: 10
    },
    buttonimg: {
        width: width - (width / 2),
        height: ((width - (width / 2)) / 300) * 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        flex: 1,
        paddingHorizontal: 10,
        fontSize: FontSize18,
        marginHorizontal: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: ((width - (width / 2)) / 300) * 80,
    }

});
export default Styles;
