import {Colors} from 'app/assets/constants/colors/Colors';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {StyleProp, View, ViewStyle, StyleSheet, Text} from 'react-native';
import {TitleFlatView} from './TitelFlatView';

export interface FlatInfoViewProps {
  containerStyle?: StyleProp<ViewStyle>;
  flat: IFlat;
  isAdmin: boolean;
  flatIndex: number;
  homeIndex: number;
}

export const FlatInfoView = observer((props: FlatInfoViewProps) => {
  const {flat, isAdmin, flatIndex, homeIndex} = props;
  const [floorText, setFloorText] = useState<number>(flat.floor);
  return (
    <View style={[style.container, props.containerStyle]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={style.headerText}>Інформація</Text>
      </View>
      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Поверх'}
        description={floorText}
        onChange={text => setFloorText(Number(text))}
      />
    </View>
  );
});

const style = StyleSheet.create({
  container: {
    width: '100%',
  },
  headerText: {
    fontWeight: '500',
    fontSize: 18,
    color: Colors._000000,
  },
  badge: {
    alignSelf: 'center',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 8,
    backgroundColor: Colors._007AFF,
  },
});
