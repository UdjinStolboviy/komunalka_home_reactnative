import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const TermsIcon = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.796 16.435a.573.573 0 0 0 .538-.003l2.676-1.43c.758-.405 1.353-.857 1.816-1.384a6.184 6.184 0 0 0 1.549-4.121l-.032-4.98a1.357 1.357 0 0 0-.937-1.272l-4.978-1.67c-.3-.102-.628-.1-.923.005L3.546 3.31a1.36 1.36 0 0 0-.921 1.283l.032 4.977c.01 1.512.579 2.97 1.603 4.105.469.52 1.068.965 1.835 1.363l2.701 1.397Zm-.708-5.853a.57.57 0 0 0 .401.159.57.57 0 0 0 .4-.165l2.924-2.882a.541.541 0 0 0-.004-.78.577.577 0 0 0-.801.004L8.48 9.408l-1.034-.994a.577.577 0 0 0-.801.005.54.54 0 0 0 .005.78l1.437 1.383Z"
      fill="#0B0E31"
    />
  </Svg>
);
