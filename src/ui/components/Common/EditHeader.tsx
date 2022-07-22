import {Colors} from 'app/assets/constants/colors/Colors';
import {EditIcon} from 'app/assets/Icons/EditIcon';
import {StartIcon} from 'app/assets/Icons/StartIcon';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

export interface EditHeaderProps {
  title: string;
  editDisabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  requiredField?: boolean;
}

export const EditHeader = (props: EditHeaderProps) => {
  return (
    <View style={[style.container, props.containerStyle]}>
      <Text style={style.text}>
        {props.title}
        {props.requiredField ? <StartIcon /> : null}
      </Text>
      {props.editDisabled ? null : (
        <TouchableOpacity onPress={props.onPress} style={style.iconWrapper}>
          <EditIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    alignItems: 'flex-end',
    width: '20%',
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
    color: Colors._000000,
  },
});
