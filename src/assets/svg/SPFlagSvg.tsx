import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const SPFlagSvg = (props: SvgProps) => (
  <Svg width={45} height={30} fill="none" {...props}>
    <Path
      d="M0 3a3 3 0 0 1 3-3h39a3 3 0 0 1 3 3v24a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3Z"
      fill="#F93939"
    />
    <Path
      d="M40.714 0H4.286C1.919 0 0 1.79 0 4v22c0 2.21 1.919 4 4.286 4h36.428C43.081 30 45 28.21 45 26V4c0-2.21-1.919-4-4.286-4Z"
      fill="#F93939"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 8h45v14H0V8Z"
      fill="#FFDA2C"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.286 12.444v5.04c0 1.4-1.44 2.52-3.215 2.52h-4.285C10.016 20 8.57 18.874 8.57 17.48v-5.04c0-1.144.96-2.1 2.28-2.41.399-1.04 1.625-.108 3.078-.108 1.461 0 2.678-.926 3.077.11 1.315.318 2.28 1.276 2.28 2.412Z"
      fill="#D4AF2C"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.286 14h2.143v6h-2.143v-6ZM6.429 14H8.57v6H6.43v-6Z"
      fill="#CBCBCB"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.286 18h2.143v2h-2.143v-2ZM6.429 18H8.57v2H6.43v-2Z"
      fill="#1A47B8"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.286 12h2.143v2h-2.143v-2ZM6.429 12H8.57v2H6.43v-2Z"
      fill="#D4AF2C"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.714 12h2.143v3h-2.143v-3ZM15 16h2.143v3H15v-3Z"
      fill="#AF010D"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.714 16h2.143v3h-2.143v-3Z"
      fill="#FFDA2C"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 12h2.143v3H15v-3Z"
      fill="#AE6A3E"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m12.857 12-2.143-2h6.429L15 12h-2.143Z"
      fill="#AF010D"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.857 8H15v2h-2.143V8Z"
      fill="#D4AF2C"
    />
  </Svg>
);
