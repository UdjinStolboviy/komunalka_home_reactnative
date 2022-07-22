import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const AddIcon = (props: SvgProps) => (
  <Svg width={40} height={35} fill="none" {...props}>
    <Path
      d="M20 8.75v17.5M30 17.5H10"
      stroke="#007AFF"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
