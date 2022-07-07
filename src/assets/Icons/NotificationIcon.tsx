import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const NotificationIcon = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.03 6.597c0 .942.25 1.497.797 2.137.415.472.548 1.077.548 1.733a2.71 2.71 0 0 1-.647 1.783 3.402 3.402 0 0 1-2.175 1.06c-1.179.1-2.358.185-3.553.185-1.195 0-2.374-.05-3.552-.185a3.398 3.398 0 0 1-2.175-1.06 2.712 2.712 0 0 1-.648-1.783c0-.656.133-1.261.548-1.733.565-.64.797-1.195.797-2.137v-.32c0-1.26.315-2.086.963-2.893C5.896 2.206 7.44 1.5 8.967 1.5h.067c1.56 0 3.154.74 4.1 1.969.614.79.896 1.58.896 2.809v.32Zm-7.225 8.449c0-.378.347-.551.667-.625.375-.08 2.66-.08 3.035 0 .32.074.667.247.667.625-.019.36-.23.678-.521.88a2.725 2.725 0 0 1-1.285.549 2.846 2.846 0 0 1-.756 0 2.713 2.713 0 0 1-1.285-.55c-.292-.201-.503-.52-.522-.88Z"
      fill="#0B0E31"
    />
  </Svg>
);