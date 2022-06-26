import {Texts} from 'app/assets/constants/codes/Texts';
import {Colors} from 'app/assets/constants/colors/Colors';
import {AddIcon} from 'app/assets/Icons/AddIcon';
import {AddPluse} from 'app/assets/Icons/AddPluse';
import {RemoveIcon} from 'app/assets/Icons/RemoveIcon';
import {SubtractionIcon} from 'app/assets/Icons/SubtractionIcon';
import {InputUniversal} from 'app/ui/components/input/app-input/InputUniversal';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
export interface OtherOptionElementProps {
  containerStyle?: StyleProp<ViewStyle>;
  onInputChange: (text: number) => void;
  type?: string;
  onReturnAdd: (text: string) => void;
  onReturnRemove: (text: string) => void;
}

export const OtherOptionElement = (props: OtherOptionElementProps) => {
  const renderIcon = () => {
    switch (props.type) {
      case 'add':
        return <AddIcon />;
      case 'subtract':
        return <SubtractionIcon />;
    }
  };
  const validInputNumber = (text: string) => {
    if (props.type === 'add') {
      return props.onInputChange && props.onInputChange(Number(text));
    } else if (props.type === 'subtract') {
      return props.onInputChange && props.onInputChange(Number(text));
    }
  };
  return (
    <View style={[styles.container, props.containerStyle]}>
      {renderIcon()}
      <InputUniversal
        containerStyle={styles.continueInput}
        onTextChange={text => validInputNumber(text)}
        typeKeyboard={'numeric'}
        validateText={'numeric'}
        placeholderInput={Texts.O_UHG}
      />
      <TouchableOpacity
        onPress={() =>
          props.onReturnAdd && props.onReturnAdd(props.type ? props.type : '')
        }>
        <AddPluse />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          props.onReturnRemove &&
          props.onReturnRemove(props.type ? props.type : '')
        }>
        <RemoveIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  continueInput: {
    width: '60%',
  },
});
