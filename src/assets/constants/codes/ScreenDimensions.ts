import { Dimensions, StatusBar} from "react-native";
// @ts-ignore
var ExtraDimensions  =  require('react-native-extra-dimensions-android');


export class ScreenDimensions {
  public static readonly SCREEN_WIDTH: number = Dimensions.get('screen').width;
  public static readonly SCREEN_HEIGHT: number = Dimensions.get('screen').height - (StatusBar.currentHeight || 0) - (ExtraDimensions.isSoftMenuBarEnabled() ? 54 : 0);
}
