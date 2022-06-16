import { PixelRatio, Platform } from "react-native";
import { ScreenDimensions } from "../constants/ScreenDimensions";

export const capitalizeFirst = (sample: string): string => {
  if (!sample || sample.length === 0) return sample;
  const chars = sample.split('');
  for (let i = 0; i < chars.length; i++) {
    if (i === 0) {
      chars[i] = chars[i].toUpperCase();
    }
  }
  return chars.join('');
};

export const capitalizeWords = (sample: string): string => {
  if (!sample || sample.length === 0) return sample;
  const words = sample.split(" ");
  const resultWords = [];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    resultWords.push(word.charAt(0).toUpperCase() + word.slice(1));
  }
  return resultWords.join(" ");
};

export const formatDate = (date: Date): string => {
  const options: any = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  if (!date) return '';
  return date.toLocaleDateString('en-US', options);
};


export const addHttp = (url: string) => {
  if(!/^(f|ht)tps?:\/\//i.test(url)) {
    url = 'http://' + url;
  }
  return url;
};

export const scaleText = (size: number) =>  {
  const scale = ScreenDimensions.SCREEN_WIDTH / 320;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
};
