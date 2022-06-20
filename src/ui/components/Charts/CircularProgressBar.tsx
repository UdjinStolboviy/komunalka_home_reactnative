import React, {FC, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {VictoryAnimation, VictoryLabel, VictoryPie} from 'victory-native';

export const CircularProgressBar: FC = (props: any) => {
  let setStateInterval;
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
    setStateInterval = window.setInterval(() => {
      percent += Math.random() * 25;
      percent = percent > 100 ? 0 : percent;
      setState({
        percent,
        data: getData(percent),
      });
    }, 2000);
  }, []);
  useEffect(() => {
    window.clearInterval(setStateInterval);
  }, [state]);
  return (
    <View
      style={{
        flex: 1,
        height: 200,
        width: '100%',
      }}>
      <TouchableOpacity
        onPress={() => console.log('end')}
        style={{
          width: '100%',
          height: '90%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <VictoryPie
          standalone={false}
          animate={{duration: 1000}}
          width={400}
          height={400}
          data={state.data}
          innerRadius={120}
          cornerRadius={25}
          labels={() => null}
          style={{
            data: {
              fill: ({datum}) => {
                const color = datum.y > 30 ? 'green' : 'red';
                return datum.x === 1 ? color : 'transparent';
              },
            },
          }}
        />
        <VictoryAnimation duration={1000} data={state.data}>
          {state => {
            return (
              <VictoryLabel
                textAnchor="middle"
                verticalAnchor="middle"
                x={200}
                y={200}
                text={`${Math.round(state.percent)}%`}
                style={{fontSize: 45}}
              />
            );
          }}
        </VictoryAnimation>
      </TouchableOpacity>
    </View>
  );
};
