import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const HeaderBackIcon = (props: SvgProps) => (
  <Svg width={11} height={19} fill="none" {...props}>
    <Path
      d="M0 9.324c0 .269.097.505.3.71l8.52 8.324c.182.194.418.29.698.29a.963.963 0 0 0 .988-.977c0-.28-.118-.516-.29-.698l-7.82-7.649 7.82-7.648c.172-.183.29-.43.29-.698A.963.963 0 0 0 9.518 0a.956.956 0 0 0-.699.28L.301 8.614a.95.95 0 0 0-.301.71Z"
      fill="#007AFF"
    />
  </Svg>
);
