import * as React from "react"
import Svg, { SvgProps, Ellipse, Path } from "react-native-svg"

export const AttentionCircleIcon = (props: SvgProps) => (
  <Svg
    width={35}
    height={35}
    fill="none"
    {...props}
  >
    <Ellipse
      cx={17.5}
      cy={16.5}
      rx={13.125}
      ry={12.375}
      stroke="#CF480E"
      strokeWidth={2}
    />
    <Path d="M26.25 24.75 8.75 8.25" stroke="#CF480E" strokeWidth={2} />
  </Svg>
)