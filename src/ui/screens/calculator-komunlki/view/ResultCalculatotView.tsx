import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle, Text} from 'react-native';

import {EqualIcon} from 'app/assets/Icons/EqualIcon';
import {Colors} from 'app/assets/constants/colors/Colors';

export interface ResultCalculatorViewProps {
  containerStyle?: StyleProp<ViewStyle>;
  nameTariff: string;
  currentData: number;
  unitOfMeasurement: string;
}

export const ResultCalculatorView = (props: ResultCalculatorViewProps) => {
  return (
    <View style={[style.container, props.containerStyle]}>
      <Text style={style.textTitle}>{props.nameTariff}</Text>
      <EqualIcon />
      <Text style={style.textDescription}>{props.currentData}</Text>
      <Text style={style.text}>{props.unitOfMeasurement}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textTitle: {
    textAlign: 'center',
    minHeight: 24,
    fontSize: 23,
    marginTop: -3,
    fontWeight: '500',
    paddingHorizontal: 5,
    color: Colors._808080,
  },
  textDescription: {
    textAlign: 'center',
    minHeight: 24,
    fontSize: 18,
    marginTop: 3,
    marginLeft: 5,
    color: Colors._007AFF,
  },
  text: {
    paddingTop: 2,
    textAlign: 'center',
    minHeight: 18,
    fontSize: 18,

    fontWeight: '500',
    paddingHorizontal: 5,
    color: Colors._007AFF,
  },
  inputContainer: {
    width: '30%',
  },
});
