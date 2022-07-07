import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const ENFlagSvg = (props: SvgProps) => (
  <Svg width={45} height={30} fill="none" {...props}>
    <Path
      d="M0 3a3 3 0 0 1 3-3h39a3 3 0 0 1 3 3v24a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3Z"
      fill="#fff"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0h19.286v14H0V0Z"
      fill="#1A47B8"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.286 0v2H45V0H19.286Zm0 4v2H45V4H19.286Zm0 4v2H45V8H19.286Zm0 4v2H45v-2H19.286ZM0 16v2h45v-2H0Zm0 4v2h45v-2H0Zm0 4v2h45v-2H0Zm0 4v2h45v-2H0Z"
      fill="#F93939"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.143 2v2h2.143V2H2.143Zm4.286 0v2H8.57V2H6.43Zm4.285 0v2h2.143V2h-2.143ZM15 2v2h2.143V2H15Zm-2.143 2v2H15V4h-2.143ZM8.571 4v2h2.143V4H8.571ZM4.286 4v2h2.143V4H4.286ZM2.143 6v2h2.143V6H2.143Zm4.286 0v2H8.57V6H6.43Zm4.285 0v2h2.143V6h-2.143ZM15 6v2h2.143V6H15ZM2.143 10v2h2.143v-2H2.143Zm4.286 0v2H8.57v-2H6.43Zm4.285 0v2h2.143v-2h-2.143ZM15 10v2h2.143v-2H15Zm-2.143-2v2H15V8h-2.143ZM8.571 8v2h2.143V8H8.571ZM4.286 8v2h2.143V8H4.286Z"
      fill="#fff"
    />
  </Svg>
);
