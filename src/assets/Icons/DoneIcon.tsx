import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const DoneIcon = (props: SvgProps) => (
  <Svg width={139} height={134} fill="none" {...props}>
    <Path
      d="m28.958 78.167 22.417 16.208a1 1 0 0 0 1.349-.164L104.25 33.5"
      stroke="#34C759"
      strokeWidth={10}
      strokeLinecap="round"
    />
  </Svg>
);
