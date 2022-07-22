import * as React from 'react';
import Svg, {SvgProps, Path, Ellipse} from 'react-native-svg';

export const SettingHeaderIcon = (props: SvgProps) => (
  <Svg width={24} height={29} fill="none" {...props}>
    <Path
      d="M11 9.667h9M4 19.333h10"
      stroke="#007AFF"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Ellipse
      cx={7}
      cy={9.667}
      rx={3.625}
      ry={3}
      transform="rotate(90 7 9.667)"
      stroke="#007AFF"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Ellipse
      cx={17}
      cy={19.333}
      rx={3.625}
      ry={3}
      transform="rotate(90 17 19.333)"
      stroke="#007AFF"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
