import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';

export const RemoveIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Circle cx={12} cy={12} r={9} stroke="#007AFF" strokeWidth={2} />
    <Path d="M7.5 12h9" stroke="#007AFF" strokeWidth={2} />
  </Svg>
);
