import {Type} from 'app/assets/constants/codes/Type';
import {Colors} from 'app/assets/constants/colors/Colors';
import {CalculatorIcon} from 'app/assets/Icons/CalculatorIcon';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {UniversalButton} from '../../button/AppButton/UniversalButton';

export interface IElementItemHomeProps {
  onPress?: () => void;
  title: string;
  description?: string;
  titleButton: string;
}

export const ElementItem = (props: IElementItemHomeProps) => {
  const app: IAppCoreService = useAppInjection();
  const _renderIcon = () => {
    switch (props.title) {
      case Type.CALCULATOR:
        return <CalculatorIcon width={45} height={45} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity style={style.container} onPress={props.onPress}>
      {_renderIcon()}
      <View style={style.middleWrapper}>
        <Text numberOfLines={1} style={style.mainText}>
          {props.title}
        </Text>
        <Text numberOfLines={4} style={style.descriptionText}>
          {props.description}
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
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '5%',
    justifyContent: 'space-between',
  },
  middleWrapper: {
    height: 100,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors._007AFF,
  },
  descriptionText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors._979797,
  },
  containerButton: {
    width: '35%',
    marginHorizontal: 10,
  },
});
