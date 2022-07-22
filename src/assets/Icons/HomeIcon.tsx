import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const HomeIcon = (props: SvgProps) => (
  <Svg width={props.width} height={props.height} fill="none" {...props}>
    <Path
      d="M11.458 26.05c0-2.771 0-4.157.63-5.376.628-1.218 1.81-2.12 4.172-3.924L18.552 15c4.27-3.26 6.405-4.891 8.948-4.891s4.678 1.63 8.948 4.891l2.292 1.75c2.362 1.804 3.544 2.706 4.173 3.924.629 1.219.629 2.605.629 5.377v8.657c0 3.85 0 5.775-1.343 6.971-1.342 1.196-3.503 1.196-7.824 1.196h-13.75c-4.321 0-6.482 0-7.824-1.196-1.343-1.196-1.343-3.12-1.343-6.97V26.05Z"
      stroke={props.color}
      strokeWidth={2}
    />
    <Path
      d="M33.23 42.875v-11.25a1 1 0 0 0-1-1h-9.46a1 1 0 0 0-1 1v11.25"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
