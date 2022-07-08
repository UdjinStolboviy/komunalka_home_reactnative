import {Colors} from 'app/assets/constants/colors/Colors';
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from '../../components/Common/Text';

interface IProps {
  text?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export const ActionButton: React.FC<IProps> = props => {
  const {text, onPress, disabled} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={disabled ? styles.touchableDisabled : styles.touchable}
        disabled={disabled}
        onPress={() => onPress && onPress()}>
        <Text bold style={styles.text}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  touchable: {
    width: '100%',
    height: 54,
    backgroundColor: Colors._0148B3,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableDisabled: {
    width: '100%',
    flex: 1,
    backgroundColor: Colors._979797,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors._FFFFFF,
    fontSize: 15,
  },
});
