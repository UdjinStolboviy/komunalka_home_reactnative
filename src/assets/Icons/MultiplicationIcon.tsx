import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const MultiplicationIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M18 6 6 18M6 6l12 12"
      stroke="#007AFF"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
