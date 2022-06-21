import {Colors} from 'app/assets/constants/colors/Colors';
import {HomeIcon} from 'app/assets/Icons/HomeIcon';
import React, {FC, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Svg from 'react-native-svg';
import {
  VictoryAnimation,
  VictoryLabel,
  VictoryPie,
  VictoryContainer,
} from 'victory-native';
export interface CircularProgressBarProps {
  colorIcon?: string;
}

export const CircularProgressBar = (props: CircularProgressBarProps) => {
  const getData = (percent: number) => {
    return [
      {x: 1, y: percent},
      {x: 2, y: 100 - percent},
    ];
  };
  const [state, setState] = React.useState({
    percent: 25,
    data: getData(0),
  });
  useEffect(() => {
    let percent = 25;
    const interval = setInterval(() => {
      percent += Math.random() * 25;
      percent = percent > 100 ? 0 : percent;
      setState({
        percent,
        data: getData(percent),
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  return (
    <View
      style={{
        height: 180,
      }}>
      <View style={{position: 'absolute', marginTop: '36%', marginLeft: '26%'}}>
        <HomeIcon
          color={props.colorIcon || Colors._007AFF}
          width={55}
          height={55}
        />
      </View>

      <Svg height={200} width={200}>
        <VictoryPie
          standalone={false}
          animate={{duration: 1000}}
          width={200}
          height={200}
          data={state.data}
          innerRadius={55}
          cornerRadius={30}
          labels={() => null}
          style={{
            data: {
              fill: ({datum}) => {
                const color = datum.y > 30 ? Colors._007AFF : Colors._CF480E;
                return datum.x === 1 ? color : 'transparent';
              },
            },
          }}
          // events={[
          //   {
          //     target: 'data',
          //     eventHandlers: {
          //       onPress: () => {
          //         return console.log('onPress');
          //       },
          //     },
          //   },
          // ]}
        />

        <VictoryAnimation duration={1000} data={state.data}>
          {NewState => {
            return (
              <VictoryLabel
                textAnchor="middle"
                verticalAnchor="middle"
                x={120}
                y={100}
                text={`${Math.round(state.percent)}%`}
                style={{fontSize: 20, fill: Colors._007AFF}}
              />
            );
          }}
        </VictoryAnimation>
      </Svg>
    </View>
  );
};
