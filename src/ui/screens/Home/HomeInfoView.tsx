import {Colors} from 'app/assets/constants/colors/Colors';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {IHome} from 'app/data/storage/home/home.model';
import {UniversalButton} from 'app/ui/components/button/AppButton/UniversalButton';
import {uid} from 'app/utils/id-random';
import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {StyleProp, View, ViewStyle, StyleSheet, Text} from 'react-native';
import {TitleFlatView} from '../flat/TitelFlatView';

export interface FlatInfoViewProps {
  containerStyle?: StyleProp<ViewStyle>;
  home: IHome;
  isAdmin: boolean;
  homeIndex: number;
  onChangeAddressHome: (value: string) => void;
  onChangeTitleHome: (value: string) => void;
}

export const HomeInfoView = observer((props: FlatInfoViewProps) => {
  const {home, isAdmin, homeIndex} = props;

  const [addressText, setAddressText] = useState<string>(home.address);

  const [titleHome, setTitleHome] = useState<string>(home.title);

  useEffect(() => {
    props.onChangeAddressHome && props.onChangeAddressHome(addressText);
    props.onChangeTitleHome && props.onChangeTitleHome(titleHome);
  }, [addressText, titleHome]);
  return (
    <View style={[style.container, props.containerStyle]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={style.headerText}>Інформація</Text>
      </View>

      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Адреса'}
        description={addressText}
        onChange={text => setAddressText(text)}
      />
      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Назва будинку'}
        description={titleHome}
        onChange={text => setTitleHome(text)}
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
    fontSize: 20,
    color: Colors._007AFF_A_7,
  },
});
