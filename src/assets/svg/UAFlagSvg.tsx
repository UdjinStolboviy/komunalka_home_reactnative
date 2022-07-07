import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const UAFlagSvg = (props: SvgProps) => (
  <Svg width={45} height={30} fill="none" {...props}>
    <Path
      d="M0 3a3 3 0 0 1 3-3h39a3 3 0 0 1 3 3v24a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3Z"
      fill="#FFDA2C"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0h45v16H0V0Z"
      fill="#3A99FF"
    />
  </Svg>
);
