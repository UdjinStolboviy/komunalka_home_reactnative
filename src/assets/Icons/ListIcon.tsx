import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const ListIcon = (props: SvgProps) => (
  <Svg width={45} height={45} fill="none" {...props}>
    <Path
      d="M33.75 5.625c2.466 0 3.698 0 4.528.681.152.125.291.264.416.416.681.83.681 2.062.681 4.528v4.625c0 .471 0 .707-.146.854-.147.146-.383.146-.854.146h-10.25m5.625-11.25c-2.466 0-3.698 0-4.528.681a2.996 2.996 0 0 0-.416.416c-.681.83-.681 2.062-.681 4.528v5.625m5.625-11.25H9.625c-1.886 0-2.828 0-3.414.586-.586.586-.586 1.528-.586 3.414v29.75L11.25 37.5l5.625 1.875L22.5 37.5l5.625 1.875v-22.5"
      stroke="#007AFF"
      strokeWidth={2}
    />
    <Path
      d="M13.125 13.125h7.5M15 20.625h-1.875M13.125 28.125h5.625"
      stroke="#007AFF"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
