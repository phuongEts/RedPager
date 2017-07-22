'user trict';
import { StyleSheet } from 'react-native';
import Init from '../Init';
const { 
  FontSize16, menuBgColor, height, mainFontSize, 
  width, FontSize18, whiteColor, colorTitleGray, colorTextGray,
  FontSize25
} = Init;

const Styles = StyleSheet.create({
  ConnectionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3
  },
  btnFa: {
    fontSize: FontSize25
  },
  btnText: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: FontSize16,
    color: colorTitleGray
  },
  textPhone: {
    color: colorTextGray,
    fontSize: mainFontSize
  },
  checkBoxStyle: {
    width: 20,
    height: 20
  }
});
export default Styles;