import {Type} from 'app/assets/constants/codes/Type';
import {Colors} from 'app/assets/constants/colors/Colors';
import {CalculatorIcon} from 'app/assets/Icons/CalculatorIcon';
import {HomeIcon} from 'app/assets/Icons/HomeIcon';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {UniversalButton} from 'app/ui/components/button/AppButton/UniversalButton';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export interface IHomeItemProps {}

export const AddHome = (props: IHomeItemProps) => {
  const app: IAppCoreService = useAppInjection();

  const addHome = () => {
    console.log('addHome');
  };

  return (
    <TouchableOpacity style={style.container} onPress={addHome}>
      <View style={style.middleWrapper}>
        <Text numberOfLines={2} style={style.mainText}>
          Додати новий будинок
        </Text>
        <Text numberOfLines={4} style={style.descriptionText}>
          Ви можете додати ще будинки до цього списку та вибрати один з них
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,

    borderColor: Colors._007AFF,
    borderRadius: 30,
    marginHorizontal: '5%',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '2%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  middleWrapper: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
  },
  mainText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors._007AFF,
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    color: Colors._979797,
  },
  containerButton: {
    width: '35%',
    marginHorizontal: 10,
  },
});
