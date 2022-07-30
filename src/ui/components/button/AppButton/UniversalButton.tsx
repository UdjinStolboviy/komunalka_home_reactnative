import {Colors} from 'app/assets/constants/colors/Colors';
import {OpenIcon} from 'app/assets/Icons/OpenIcon';
import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Shadow} from 'react-native-shadow-2';

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
    <Shadow
      viewStyle={[style.container]}
      containerViewStyle={[props.containerStyle]}
      startColor={Colors._007AFF_A}
      distance={4}>
      <TouchableOpacity
        disabled={props.disabled}
        style={[]}
        activeOpacity={0.7}
        onPress={() => (props.onPress ? props.onPress() : null)}>
        <Text style={[style.text, props.textStyle]}>{props.title}</Text>
      </TouchableOpacity>
    </Shadow>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors._007AFF,
  },
  text: {
    color: Colors._007AFF,
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 21,
  },
  shadowContainer: {},
});
