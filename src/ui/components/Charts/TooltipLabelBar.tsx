import {Colors} from 'app/assets/constants/colors/Colors';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  VictoryContainer,
  VictoryLabel,
  VictoryPie,
  VictoryTooltip,
  VictoryGroup,
} from 'victory-native';

export const TooltipLabels = (props: any) => {
  const [selected, setSelected] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const CustomLabel = (item: any) => {
    return (
      <VictoryGroup>
        <VictoryLabel {...item} />
        <VictoryTooltip
          {...item}
          x={200}
          y={250}
          orientation="top"
          pointerLength={0}
          cornerRadius={50}
          flyoutWidth={100}
          flyoutHeight={100}
          flyoutStyle={{fill: selected ? 'cyan' : Colors._007AFF}}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
      </VictoryGroup>
    );
  };
  CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}>
      <TouchableOpacity
        onPress={() => setSelected(!selected)}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <VictoryContainer height={200} width={600}>
          <VictoryPie
            style={{labels: {fill: Colors._007AFF}}}
            innerRadius={70}
            labelRadius={70}
            labels={({datum}) => `# ${datum.y}`}
            labelComponent={<CustomLabel />}
            events={[
              {
                childName: ['pie', 'bar'],
                target: 'data',
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        childName: ['pie', 'bar'],
                        mutation: props => {
                          return {
                            style: Object.assign({}, props.style, {
                              fill: 'tomato',
                            }),
                          };
                        },
                      },
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        childName: ['pie', 'bar'],
                        mutation: () => {
                          return null;
                        },
                      },
                    ];
                  },
                },
              },
            ]}
            data={[
              {x: 1, y: 5},
              {x: 2, y: 4},
              {x: 3, y: 2},
              {x: 4, y: 3},
              {x: 5, y: 1},
            ]}
          />
        </VictoryContainer>
      </TouchableOpacity>
    </View>
  );
};
