import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const Subtraction = (props: SvgProps) => (
  <Svg width={22} height={4} fill="none" {...props}>
    <Path d="M20 2H2" stroke="#007AFF" strokeWidth={4} strokeLinecap="round" />
  </Svg>
);
