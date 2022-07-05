import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const ProfileIcon = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.97 5.468A3.956 3.956 0 0 1 9 9.438a3.956 3.956 0 0 1-3.97-3.97A3.955 3.955 0 0 1 9 1.5a3.955 3.955 0 0 1 3.97 3.968ZM9 16.5c-3.253 0-6-.529-6-2.569s2.764-2.55 6-2.55c3.254 0 6 .528 6 2.568 0 2.041-2.764 2.551-6 2.551Z"
      fill="#0B0E31"
    />
  </Svg>
);
