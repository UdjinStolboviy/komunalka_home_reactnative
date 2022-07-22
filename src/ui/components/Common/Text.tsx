import {FONTS} from 'app/assets/constants/codes/Fonts';
import React, {ReactNode} from 'react';
import {Text as TextRN, TextProps} from 'react-native';

interface IProps extends TextProps {
  bold?: boolean;
  medium?: boolean;
  normal?: boolean;
  children?: ReactNode;
  isSFP?: boolean;
}

export const Text: React.FC<IProps> = props => {
  const {children, style, onPress, medium, bold, normal, isSFP = false} = props;

  const sfProHandler = () => {
    if (normal) {
      return FONTS.SFPro400;
    }
    if (medium) {
      return FONTS.SFPro500;
    }

    if (bold) {
      return FONTS.SFPro700;
    }

    return FONTS.SFPro300;
  };

  const paralucentHandler = () => {
    if (normal) {
      return FONTS.PARALUCENT400;
    }
    if (medium) {
      return FONTS.PARALUCENT600;
    }
    if (bold) {
      return FONTS.PARALUCENT700;
    }

    return FONTS.PARALUCENT400;
  };

  return (
    <TextRN
      {...props}
      style={[
        style,
        {fontFamily: isSFP ? sfProHandler() : paralucentHandler()},
      ]}
      onPress={onPress}>
      {children}
    </TextRN>
  );
};
