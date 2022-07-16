import {RouteProp, useRoute} from '@react-navigation/native';
import {Screens} from 'app/assets/constants/codes/Screens';
import {Type} from 'app/assets/constants/codes/Type';
import {Colors} from 'app/assets/constants/colors/Colors';
import {CalculatorIcon} from 'app/assets/Icons/CalculatorIcon';
import {DoorIcon} from 'app/assets/Icons/DoorIcon';
import {HomeIcon} from 'app/assets/Icons/HomeIcon';
import {OpenIcon} from 'app/assets/Icons/OpenIcon';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {UniversalButton} from 'app/ui/components/button/AppButton/UniversalButton';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export interface IFlatItemProps {
  onPress?: () => void;
  title: string;
  type: string;
  dateSettlement?: string;
  occupant?: string;
  owner?: string;
  flat: IFlat;
  homeIndex: number;
  flatIndex: number;
}

export const FlatItem = (props: IFlatItemProps) => {
  const app: IAppCoreService = useAppInjection();

  const _renderIcon = () => {
    switch (props.type) {
      case Type.HOME_RED:
        return <DoorIcon color={Colors._CF480E} />;
      case Type.HOME_WHITE:
        return <DoorIcon color={Colors._979797} />;
      default:
        return null;
    }
  };

  return (
    <View style={style.container}>
      {_renderIcon()}
      <View style={style.middleWrapper}>
        <Text numberOfLines={1} style={style.mainText}>
          {props.title}
        </Text>
        <Text numberOfLines={1} style={style.descriptionText}>
          {`Власник: ${props.flat.owner}`}
        </Text>
        <Text numberOfLines={1} style={style.descriptionText}>
          {`Дата заселення ${props.flat.dateSettlement}`}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
    marginVertical: 5,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '2%',
    justifyContent: 'center',
  },
  middleWrapper: {
    justifyContent: 'center',
  },
  mainText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors._007AFF,
  },
  descriptionText: {
    marginTop: 3,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '400',
    color: Colors._979797,
  },
  containerButton: {
    width: '35%',
    marginHorizontal: 10,
  },
});
