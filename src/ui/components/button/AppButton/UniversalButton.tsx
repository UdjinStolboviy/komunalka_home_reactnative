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
      // offset={[5, 10]}
      // startColor={Colors._D1D9E6_A_9}
      //paintInside={true}
      distance={4}>
      <TouchableOpacity
        disabled={props.disabled}
        style={[]}
        activeOpacity={0.7}
        onPress={() => (props.onPress ? props.onPress() : null)}>
        <OpenIcon color={Colors._007AFF} />
      </TouchableOpacity>
    </Shadow>
  );
};

const style = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors._007AFF_A_1,
  },

  shadowContainer: {},
});
