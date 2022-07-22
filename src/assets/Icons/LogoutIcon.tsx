import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const LogoutIcon = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.422 8.422A.578.578 0 0 0 6.834 9c0 .315.26.578.588.578H12v3.585C12 15 10.482 16.5 8.604 16.5H4.888c-1.87 0-3.388-1.492-3.388-3.33V4.838C1.5 2.993 3.026 1.5 4.896 1.5H8.62C10.482 1.5 12 2.993 12 4.83v3.592H7.422Zm7.3-2.017 2.19 2.183a.573.573 0 0 1 0 .817l-2.19 2.183a.582.582 0 0 1-.404.172.58.58 0 0 1-.412-.99l1.2-1.192H12V8.423h3.105l-1.2-1.193a.58.58 0 0 1 0-.817.573.573 0 0 1 .818-.008Z"
      fill="#6A6B7E"
    />
  </Svg>
);
