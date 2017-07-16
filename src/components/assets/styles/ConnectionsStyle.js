'user trict';
import { StyleSheet } from 'react-native';
import Init from '../Init';
const { 
  FontSize16, menuBgColor, height, mainFontSize, 
  width, FontSize18, whiteColor, colorTitleGray, colorTextGray,
  FontSize20
} = Init;

const Styles = StyleSheet.create({
  ConnectionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnFa: {
    fontSize: FontSize20
  }
});
export default Styles;