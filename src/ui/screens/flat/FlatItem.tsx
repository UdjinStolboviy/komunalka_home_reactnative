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
          {`Власник: ${props.owner}`}
        </Text>
        <Text numberOfLines={1} style={style.descriptionText}>
          {`Орендар: ${props.occupant}`}
        </Text>
        <Text numberOfLines={1} style={style.descriptionText}>
          {`Дата заселення ${props.dateSettlement}`}
        </Text>
      </View>
      <TouchableOpacity
        style={[style.buttonFlat]}
        activeOpacity={0.7}
        onPress={() =>
          app.navigationService.navigate(Screens._FLAT_INFO, {
            flat: props.flat,
            homeIndex: props.homeIndex,
            flatIndex: props.flatIndex,
          })
        }>
        <OpenIcon color={Colors._FFFFFF} />
      </TouchableOpacity>
    </View>
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
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '2%',
    justifyContent: 'space-between',
  },
  buttonFlat: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors._007AFF,
    marginRight: '2%',
  },
  middleWrapper: {
    height: 100,
    width: '60%',
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
