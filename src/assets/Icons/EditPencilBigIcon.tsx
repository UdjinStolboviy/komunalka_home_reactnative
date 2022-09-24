import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const EditPencilIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={46}
    height={45}
    fill="none"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m24.588 13.446 5.198-5.085c1.321-1.292 1.982-1.938 2.797-1.938.816 0 1.476.646 2.797 1.938l1.947 1.905c1.375 1.345 2.063 2.018 2.063 2.859 0 .841-.688 1.514-2.063 2.86l-5.035 4.925a21.295 21.295 0 0 1-7.704-7.464Zm-1.464 1.433-12.86 12.58c-.338.331-.508.497-.633.696-.126.199-.202.423-.355.872l-3.203 9.401c-.141.413-.212.62-.103.73.109.11.316.042.73-.093l9.661-3.15c.443-.144.664-.217.861-.336.197-.12.364-.282.696-.608l12.891-12.61a23.299 23.299 0 0 1-7.685-7.482Z"
      fill="#007AFF"
    />
  </Svg>
);

export default EditPencilIcon;
