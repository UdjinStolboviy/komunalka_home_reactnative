import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

export const CalculatorIcon = (props: SvgProps) => (
  <Svg width={45} height={47} fill="none" {...props}>
    <G filter="url(#a)">
      <Rect
        x={7.5}
        y={7.5}
        width={30}
        height={9.375}
        rx={1}
        stroke="#007AFF"
        strokeWidth={2}
        shapeRendering="crispEdges"
      />
    </G>
    <Path
      d="M7.5 30.125c0-.943 0-1.414.293-1.707.293-.293.764-.293 1.707-.293h7.375V35.5c0 .943 0 1.414-.293 1.707-.293.293-.764.293-1.707.293H9.5c-.943 0-1.414 0-1.707-.293-.293-.293-.293-.764-.293-1.707v-5.375Z"
      stroke="#007AFF"
      strokeWidth={2}
    />
    <G filter="url(#b)">
      <Path
        d="M28.125 28.125H35.5c.943 0 1.414 0 1.707.293.293.293.293.764.293 1.707V35.5c0 .943 0 1.414-.293 1.707-.293.293-.764.293-1.707.293h-5.375c-.943 0-1.414 0-1.707-.293-.293-.293-.293-.764-.293-1.707v-7.375Z"
        stroke="#007AFF"
        strokeWidth={2}
        shapeRendering="crispEdges"
      />
    </G>
    <Defs></Defs>
  </Svg>
);
