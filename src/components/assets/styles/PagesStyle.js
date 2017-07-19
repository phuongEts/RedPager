'user trict';
import { StyleSheet } from 'react-native';

import Init from '../Init';
const { 
  FontSize16, menuBgColor, height, mainFontSize, 
  width, FontSize18, whiteColor, colorTitleGray, colorTextGray,
  FontSize12
} = Init;


const Styles = StyleSheet.create({
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 3
  },
  textItem: {
    fontSize: mainFontSize,
    color: colorTextGray
  }
});

export default Styles;