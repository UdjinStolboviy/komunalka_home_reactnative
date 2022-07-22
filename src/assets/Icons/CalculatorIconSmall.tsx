import * as React from 'react';
import Svg, {SvgProps, Rect, Path} from 'react-native-svg';

export const CalculatorIconSmall = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Rect
      x={3}
      y={3}
      width={12}
      height={3.75}
      rx={1}
      stroke="#0B0E31"
      strokeWidth={2}
    />
    <Path
      d="M3 13.125c0-.822 0-1.233.227-1.51a.998.998 0 0 1 .139-.138c.276-.227.687-.227 1.509-.227H6.75v1.875c0 .822 0 1.233-.227 1.51a.998.998 0 0 1-.139.138C6.108 15 5.697 15 4.875 15c-.822 0-1.233 0-1.51-.227a.998.998 0 0 1-.138-.139C3 14.358 3 13.947 3 13.125ZM11.25 11.25h1.875c.822 0 1.233 0 1.51.227.05.041.097.088.138.139.227.276.227.687.227 1.509 0 .822 0 1.233-.227 1.51a.998.998 0 0 1-.139.138c-.276.227-.687.227-1.509.227-.822 0-1.233 0-1.51-.227a.998.998 0 0 1-.138-.139c-.227-.276-.227-.687-.227-1.509V11.25Z"
      stroke="#0B0E31"
      strokeWidth={2}
    />
  </Svg>
);
