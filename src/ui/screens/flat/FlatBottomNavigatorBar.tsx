import {Screens} from 'app/assets/constants/codes/Screens';
import {Colors} from 'app/assets/constants/colors/Colors';
import {BellIcon} from 'app/assets/Icons/BellIcon';
import {CalculatorIcon} from 'app/assets/Icons/CalculatorIcon';
import {HomeIcon} from 'app/assets/Icons/HomeIcon';
import {ListIcon} from 'app/assets/Icons/ListIcon';
import {SettingIcon} from 'app/assets/Icons/SettingIcon';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export interface IFlatBottomNavigatorBarProps {
  onPressList?: () => void;
  onPressCalculator?: () => void;
}

export const FlatBottomNavigatorBar = (props: any) => {
  const app: IAppCoreService = useAppInjection();
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => {
          app.navigationService.goBack();
          app.navigationService.goBack();
        }}
        activeOpacity={0.5}
        style={{
          height: '100%',
          width: '25%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <HomeIcon color={Colors._007AFF} width={55} height={55} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.onPressList}
        activeOpacity={0.5}
        style={{
          height: '100%',
          width: '25%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ListIcon />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.onPressCalculator}
        // onLongPress={props.onLongPress}
        activeOpacity={0.5}
        style={{
          height: '100%',
          width: '25%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CalculatorIcon />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => app.navigationService.navigate(Screens._ACCOUNT_SETTING)}
        //onLongPress={props.onLongPress}
        activeOpacity={0.5}
        style={{
          height: '100%',
          width: '25%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SettingIcon />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
