import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const AddBigIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={100}
    height={100}
    fill="none"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M87.5 50c0 20.71-16.79 37.5-37.5 37.5S12.5 70.71 12.5 50 29.29 12.5 50 12.5 87.5 29.29 87.5 50ZM52 52v18.833h-4V52H29.167v-4H48V29.167h4V48h18.833v4H52Z"
      fill="#007AFF"
    />
  </Svg>
);

export default AddBigIcon;
