import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const PrivacyPolicyIcon = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.857 1.5h6.286c2.317 0 3.607 1.335 3.607 3.622v7.748c0 2.325-1.29 3.63-3.607 3.63H5.857c-2.28 0-3.607-1.305-3.607-3.63V5.123C2.25 2.834 3.578 1.5 5.857 1.5Zm.203 3.495v-.007h2.242a.588.588 0 0 1 0 1.178H6.06a.585.585 0 0 1 0-1.171Zm0 4.56h5.88a.586.586 0 0 0 0-1.17H6.06a.586.586 0 0 0 0 1.17Zm0 3.428h5.88c.3-.03.525-.286.525-.585a.588.588 0 0 0-.525-.593H6.06a.596.596 0 0 0-.563.908c.12.187.338.3.563.27Z"
      fill="#0B0E31"
    />
  </Svg>
);
