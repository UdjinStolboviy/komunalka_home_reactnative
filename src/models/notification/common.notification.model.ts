import { ImageSourcePropType } from "react-native";

export interface IImageReplacer {
  symbol: string;
  color: string;
}

export interface ICommonNotification {
  title: string;
  text: string;
  date: string;
  image?: ImageSourcePropType;
  imageReplacer?: IImageReplacer;
  redirect?: boolean;
  data?: any
}
