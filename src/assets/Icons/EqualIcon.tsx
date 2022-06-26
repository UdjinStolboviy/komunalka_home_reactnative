import * as React from 'react';
import {StyleProp, View, ViewStyle, StyleSheet} from 'react-native';
import {SubtractionIcon} from './SubtractionIcon';

export interface EqualIconProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export const EqualIcon = (props: EqualIconProps) => (
  <View style={style.container}>
    <SubtractionIcon />
    <SubtractionIcon />
  </View>
);

const style = StyleSheet.create({
  container: {
    marginTop: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 15,
    width: '10%',
  },
});
