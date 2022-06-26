import {Colors} from 'app/assets/constants/colors/Colors';
import React, {useState} from 'react';
import {
  View,
  Switch,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Text,
} from 'react-native';
export interface SwitchUniversalProps {
  containerStyle?: StyleProp<ViewStyle>;
  onSwitchChange: (isEnabled: boolean) => void;
  unitOfMeasurement?: string;
}

export const SwitchUniversal = (props: SwitchUniversalProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    props.onSwitchChange && props.onSwitchChange(isEnabled);
    setIsEnabled(previousState => !previousState);
  };

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Text style={styles.text}>{props.unitOfMeasurement}</Text>
      <Switch
        trackColor={{false: Colors._979797, true: Colors._34C759}}
        thumbColor={isEnabled ? Colors._FFFFFF : Colors._DBDBDB}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
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
  text: {
    textAlign: 'center',
    fontSize: 23,
    lineHeight: 24,
    fontWeight: '500',
    color: Colors._808080,
  },
});
