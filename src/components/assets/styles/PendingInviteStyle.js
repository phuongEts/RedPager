'user trict';
import { StyleSheet } from 'react-native';

import Init from '../Init';

const { 
  FontSize16, menuBgColor, height, mainFontSize, 
  width, FontSize18, whiteColor, colorTitleGray, colorTextGray,
  FontSize12
} = Init;

const Styles = StyleSheet.create({
  listLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    color: colorTextGray,
    fontSize: mainFontSize
  },
  btn: {
    backgroundColor: menuBgColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  textBtn: {
    color: whiteColor
  }
});

export default Styles;