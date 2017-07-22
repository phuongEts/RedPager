'user trict';
import { StyleSheet } from 'react-native';

import Init from '../Init';
const { 
  FontSize16, menuBgColor, height, mainFontSize, 
  width, FontSize18, whiteColor, colorTitleGray, colorTextGray,
  FontSize12
} = Init;

const Styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20
  },
  modalWrap: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#ebebeb',
    padding: 10,
    width: width - 40,
  },
  titleModalContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: width - 40,
    paddingHorizontal: 15
  },
  closebtn: {
    color: menuBgColor,
    fontSize: FontSize18
  },
  inputWrap: {
    width: width - 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: menuBgColor,
    fontSize: FontSize16,
    fontWeight: 'bold'
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    marginHorizontal: 10
  },
  switchContainer: {
    width: width - 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: menuBgColor,
    marginVertical: 5
  },
  addTextbtn: {
    color: whiteColor,
    fontWeight: 'bold'
  }
});

export default Styles;