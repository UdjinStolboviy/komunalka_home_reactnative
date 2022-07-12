import {Colors} from 'app/assets/constants/colors/Colors';
import {OpenIcon} from 'app/assets/Icons/OpenIcon';
import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export interface UniversalButtonProps {
  title: string;
  containerStyle?: object;
  textStyle?: object;
  activeOpacity?: number;
  onPress?: () => void;
  disabled?: boolean;
}

export const UniversalButton = (props: UniversalButtonProps) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[style.container, props.containerStyle]}
      activeOpacity={props.activeOpacity || 1}
      onPress={() => (props.onPress ? props.onPress() : null)}>
      <Text style={[style.text, props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors._007AFF,
  },
  text: {
    color: Colors._FFFFFF,
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 21,
  },
});
