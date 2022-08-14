import {Colors} from 'app/assets/constants/colors/Colors';
import {IFlatCalculator} from 'app/data/storage/flat/flat.calculator.model';
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Keyboard} from 'react-native';

interface FlatListItemViewProps {
  item: IFlatCalculator;
  index: number;
}

export const FlatListItemView = (props: FlatListItemViewProps) => {
  const massage = `
   Дата розрахунку: ${props.item.dateCalculator} 

   Електроенергія: ${props.item.resultElectricity} кВт
   ${props.item.messageElectricity}
   ${props.item.electricityTariff} грн за кВт
   ${props.item.resultElectricity} * ${props.item.electricityTariff} грн = ${props.item.multiplicationElectricity} грн 

   Вода: ${props.item.resultWater} куб.м
   ${props.item.messageWater}
   ${props.item.waterTariff} грн за куб.м
   ${props.item.resultWater} * ${props.item.waterTariff} грн = ${props.item.multiplicationWater} грн 

   Інтернет: ${props.item.resultInternet} грн
   Вивіз сміття: ${props.item.garbageRemovalTariff} грн

   Комунальні: ${props.item.resultAllUtilityPayments} грн

   Квартплата: ${props.item.resultRent} грн
   Додаткові послуги: ${props.item.resultOtherOptions} грн
   Коментар: ${props.item.comments}

   Всього:  ${props.item.multiplicationElectricity} + ${props.item.multiplicationWater} + 
    ${props.item.resultInternet} + ${props.item.garbageRemovalTariff} + 
    ${props.item.resultRent} + ${props.item.resultOtherOptions} = ${Math.ceil(props.item.resultAllCalculate)} грн 
`;

  return (
    <View key={props.index} style={style.textWrapper}>
      <Text style={style.text}>{massage}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 12,
    color: Colors._007AFF,
  },
  textWrapper: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    borderColor: Colors._007AFF,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: Colors._007AFF,
  },
});
