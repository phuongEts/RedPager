'user trict';
import { StyleSheet } from 'react-native';

import Init from '../Init';
const { 
  FontSize16, menuBgColor, height, mainFontSize, 
  width, FontSize18, whiteColor, colorTitleGray, colorTextGray,
  FontSize12
} = Init;
const Styles = StyleSheet.create({
  container: {
    padding: 15
  },
  label: {
    color: menuBgColor,
    fontSize: FontSize18,
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
  line: {
    borderTopWidth: 1,
    borderTopColor: menuBgColor,
    marginVertical: 10
  },
  purcharContainer: {
    padding: 10
  },
  title: {
    color: colorTitleGray,
    fontSize: FontSize16,
    fontWeight: 'bold'
  },
  textStyle: {
    color: colorTextGray,
    fontSize: mainFontSize,
    lineHeight: 22
  },
  formPuschase: {
    marginVertical: 10,
    flexDirection: 'row'
  },
  radioFormContainer: {
    flex: 2
  },
  textRadioContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buyContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textRadio: {
    fontSize: FontSize12,
    color: colorTextGray,
  },
  buyBtn: {
    backgroundColor: menuBgColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  buyText: {
    color: whiteColor,
    fontSize: mainFontSize,
    fontWeight: 'bold'
  },
  textFieldContainer: {
    borderBottomWidth: 1,
    borderBottomColor: menuBgColor,
    flex: 3
  },
  sendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  textField: {
    height: 40,
    color: colorTextGray
  },
  sendBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: menuBgColor,
    borderRadius: 5,
    marginLeft: 5
  }
});

export default Styles;