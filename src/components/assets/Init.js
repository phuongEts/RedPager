'user trict';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

module.exports = {
    webUri: 'http://demo.tntechs.com.vn/bninh/RedPager/wp-content/themes/RedPager/process-data-IOS.php',
    height,
    width,
    FontSize16: width > 767 ? 22 : 16,
    FontSize18: width > 767 ? 25 : 18,
    FontSize12: width > 767 ? 18 : 12,
    mainFontSize: width > 767 ? 20 : 14,
    mainColor: '#184e55',
    menuBgColor: '#b40b0d',
    mainBgColor: '#b30b0d',
    whiteColor: '#fff',
    colorTitleGray: '#636363',
    colorTextGray: '#9f9ea2'
};
