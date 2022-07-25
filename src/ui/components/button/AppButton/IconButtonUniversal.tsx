import {Colors} from 'app/assets/constants/colors/Colors';
import {OpenIcon} from 'app/assets/Icons/OpenIcon';
import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export interface IconButtonUniversalProps {
  containerStyle?: object;
  textStyle?: object;
  activeOpacity?: number;
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const IconButtonUniversal = (props: IconButtonUniversalProps) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[style.container, props.containerStyle]}
      activeOpacity={0.7}
      onPress={() => (props.onPress ? props.onPress() : null)}>
      {props.children}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: '20%',
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors._FFFFFF,
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 21,
  },
});
