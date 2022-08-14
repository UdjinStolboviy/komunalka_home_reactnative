import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {Colors} from 'app/assets/constants/colors/Colors';

export interface FlatCardAdvancedInfoProps {
  flat: IFlat;
  index: number;
  homeIndex: number;
  flatIndex: number;
  onPublishPress?: () => void;
}

export const FlatCardAdvancedInfo = observer(
  ({flat, onPublishPress}: FlatCardAdvancedInfoProps) => {
    return (
      <View style={[FlatCardAdvancedInfoStyle.container]}>
        <Text
          style={
            FlatCardAdvancedInfoStyle.textD
          }>{`Дата заселення: ${flat.dateSettlement}`}</Text>
        <Text
          style={
            FlatCardAdvancedInfoStyle.textD
          }>{`Дата виселення: ${flat.dateEviction}`}</Text>
        <Text
          style={
            FlatCardAdvancedInfoStyle.textD
          }>{`Ціна оренди за місяць: ${flat.price} грн`}</Text>
        <Text
          style={
            FlatCardAdvancedInfoStyle.textD
          }>{`Кількість кімнат: ${flat.rooms}`}</Text>
        <Text
          style={
            FlatCardAdvancedInfoStyle.textD
          }>{`Поверх: ${flat.floor}`}</Text>
        <Text
          style={
            FlatCardAdvancedInfoStyle.textD
          }>{`Площя: ${flat.area} m2`}</Text>
        <Text
          style={
            FlatCardAdvancedInfoStyle.textD
          }>{`Імя WiFi: ${flat.wifiName}`}</Text>
        <Text
          style={
            FlatCardAdvancedInfoStyle.textD
          }>{`Пароль WiFi: ${flat.wifiPassword}`}</Text>
        <Text
          style={
            FlatCardAdvancedInfoStyle.textD
          }>{`Адреса: ${flat.address}`}</Text>
        <Text
          style={
            FlatCardAdvancedInfoStyle.textD
          }>{`Додаткова інформація: ${flat.description}`}</Text>
        <Text
          style={
            FlatCardAdvancedInfoStyle.textD
          }>{`Oрендарь: ${flat.occupant}`}</Text>
        <Text
          style={
            FlatCardAdvancedInfoStyle.textD
          }>{`Електрона адреса орендаря: ${flat.emailOccupant}`}</Text>
        <Text
          style={
            FlatCardAdvancedInfoStyle.textD
          }>{`Телефон орендаря: ${flat.phoneOccupant}`}</Text>
        <Text
          style={
            FlatCardAdvancedInfoStyle.textD
          }>{`Власник квартири: ${flat.owner}`}</Text>
        <Text
          style={
            FlatCardAdvancedInfoStyle.textD
          }>{`Телефон власника квартири: ${flat.ownerPhone}`}</Text>
        <Text
          style={
            FlatCardAdvancedInfoStyle.textD
          }>{`Електрона адреса власника квартири: ${flat.ownerEmail}`}</Text>
      </View>
    );
  },
);

const FlatCardAdvancedInfoStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: 700,
    marginTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  textD: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
    color: Colors._007AFF,
  },
});
