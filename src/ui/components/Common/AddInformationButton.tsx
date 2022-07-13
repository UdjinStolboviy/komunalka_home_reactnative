import {Colors} from 'app/assets/constants/colors/Colors';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export interface AddInformationButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const AddInformationButton = (props: AddInformationButtonProps) => {
  return (
    <TouchableOpacity
      style={[style.container, props.containerStyle]}
      activeOpacity={0.8}
      onPress={props.onPress}>
      <Text style={style.text}>Add Information</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors._FFFFFF,
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontWeight: 'normal',
    fontSize: 16,
    color: Colors._808080,
  },
});
