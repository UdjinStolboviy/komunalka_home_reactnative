import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React, {useEffect} from 'react';
import {Colors} from 'app/assets/constants/colors/Colors';
import {DeleteIcon} from 'app/assets/Icons/DeleteIcon';
import {EditIcon} from 'app/assets/Icons/EditIcon';

export interface InputButtonProps {
  buttonType: 'add' | 'clear' | 'none' | 'loader';
  pressClear?: () => void;
  pressAdd?: () => void;
  cancelButtonColor?: string;
}

export const InputButton = (props: InputButtonProps) => {
  const type = props.buttonType;

  useEffect(() => {}, [type, props.cancelButtonColor]);

  const AddButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={style.button}
        onPress={props.pressAdd}>
        <EditIcon />
      </TouchableOpacity>
    );
  };

  const Loader = () => {
    return (
      <View>
        <ActivityIndicator color={Colors._1C9FAD} size="small" />
      </View>
    );
  };

  const ClearButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={style.button}
        onPress={props.pressClear}>
        <DeleteIcon />
      </TouchableOpacity>
    );
  };

  switch (type) {
    case 'none':
      return null;
    case 'add':
      return <AddButton />;
    case 'clear':
      return <ClearButton />;
    case 'loader':
      return <Loader />;
    default:
      return null;
  }
};

const style = StyleSheet.create({
  button: {
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  addText: {
    fontWeight: '500',
    fontSize: 14,
    color: Colors._578FA2,
  },
});
