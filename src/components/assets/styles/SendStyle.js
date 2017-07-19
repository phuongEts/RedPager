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
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3
  },
  textItem: {
    fontSize: mainFontSize,
    color: colorTextGray,
    flex: 2
  },
  avaiableStyle: {
    width: 10,
    height: 10,
    backgroundColor: menuBgColor,
  },
  avaiableAtive: {
    backgroundColor: 'green'
  },
  btn: {
    flex: 1,
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: menuBgColor,
    borderRadius: 5,
  },
  textBtn: {
    textAlign: 'center',
    color: whiteColor,
  }
});

export default Styles;