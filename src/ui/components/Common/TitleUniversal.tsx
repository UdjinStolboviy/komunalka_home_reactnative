import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export interface ITitleUniversalProps {
  title: string;
  containerStyle?: object;
  textStyle?: object;
  disabled?: boolean;
}

export const TitleUniversal = (props: ITitleUniversalProps) => {
  return (
    <View style={[style.container, props.containerStyle]}>
      <Text style={[style.text, props.textStyle]}>{props.title}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 21,
    fontWeight: '500',
  },
});
