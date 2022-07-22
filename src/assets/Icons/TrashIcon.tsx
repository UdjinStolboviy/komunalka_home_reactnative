import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const TrashIcon = (props: SvgProps) => (
  <Svg width={36} height={31} fill="none" {...props}>
    <Path
      d="M15 19.375V15.5M21 19.375V15.5M4.5 9.042h27-.5c-1.886 0-2.828 0-3.414.585C27 10.213 27 11.156 27 13.042v8.791c0 1.886 0 2.829-.586 3.415-.586.585-1.528.585-3.414.585H13c-1.886 0-2.828 0-3.414-.585C9 24.662 9 23.717 9 21.832v-8.791c0-1.886 0-2.829-.586-3.415-.586-.585-1.528-.585-3.414-.585h-.5ZM15.102 4.354c.171-.138.548-.259 1.072-.346A11.596 11.596 0 0 1 18 3.875c.66 0 1.302.047 1.826.133.524.087.9.208 1.072.346"
      stroke="#007AFF"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
