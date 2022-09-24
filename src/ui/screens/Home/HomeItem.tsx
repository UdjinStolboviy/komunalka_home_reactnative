import {Type} from 'app/assets/constants/codes/Type';
import {Colors} from 'app/assets/constants/colors/Colors';
import {CalculatorIcon} from 'app/assets/Icons/CalculatorIcon';
import {HomeIcon} from 'app/assets/Icons/HomeIcon';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {UniversalButton} from 'app/ui/components/button/AppButton/UniversalButton';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export interface IHomeItemProps {
  onPress?: () => void;
  title: string;
  type: string;
  description?: string;
  titleButton: string;
  address: string;
}

export const HomeItem = (props: IHomeItemProps) => {
  const app: IAppCoreService = useAppInjection();

  return (
    <TouchableOpacity style={style.container} onPress={props.onPress}>
      <HomeIcon color={Colors._979797} width={55} height={55} />
      <View style={style.middleWrapper}>
        <Text numberOfLines={2} style={style.mainText}>
          {props.title}
        </Text>
        <Text numberOfLines={4} style={style.descriptionText}>
          {props.description}
        </Text>
        <Text numberOfLines={4} style={style.descriptionText}>
          {`Адресса ${props.address}`}
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
    // shadowOpacity: 0.15,
    // shadowRadius: 4,
    // shadowOffset: {
    //   width: 0.2,
    //   height: 4,
    // },
    // elevation: 3,
  },
  middleWrapper: {
    height: 100,
    width: '50%',
    justifyContent: 'center',
    marginRight: 30,
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
});
