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
}

export const HomeItem = (props: IHomeItemProps) => {
  const app: IAppCoreService = useAppInjection();
  const _renderIcon = () => {
    switch (props.type) {
      case Type.HOME_RED:
        return <HomeIcon color={Colors._CF480E} width={55} height={55} />;
      case Type.HOME_WHITE:
        return <HomeIcon color={Colors._979797} width={55} height={55} />;
      default:
        return null;
    }
  };

  return (
    <View style={style.container}>
      {_renderIcon()}
      <View style={style.middleWrapper}>
        <Text numberOfLines={2} style={style.mainText}>
          {props.title}
        </Text>
        <Text numberOfLines={4} style={style.descriptionText}>
          {props.description}
        </Text>
      </View>
      <UniversalButton
        onPress={props.onPress}
        title={props.titleButton}
        containerStyle={style.containerButton}
        activeOpacity={0.7}
      />
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
    width: '42%',
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
