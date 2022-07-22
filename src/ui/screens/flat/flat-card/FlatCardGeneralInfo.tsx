import {Flat, IFlat} from 'app/data/storage/flat/flat.model';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FlatItem} from '../FlatItem';

export interface FlatCardGeneralInfoProps {
  flat: IFlat;
  title: string;
  type: string;
  homeIndex: number;
  flatIndex: number;
  onPress: () => void;
}

export const FlatCardGeneralInfo = ({
  flat,
  onPress,
  title,
  type,
  homeIndex,
  flatIndex,
}: FlatCardGeneralInfoProps) => {
  return (
    <View style={FlatCardGeneralInfoStyle.container}>
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <FlatItem
          title={title}
          type={type}
          flat={flat}
          homeIndex={homeIndex}
          flatIndex={flatIndex}
        />
      </TouchableOpacity>
    </View>
  );
};
const FlatCardGeneralInfoStyle = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});
