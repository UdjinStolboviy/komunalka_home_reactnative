import {Screens} from 'app/assets/constants/codes/Screens';
import {Colors} from 'app/assets/constants/colors/Colors';
import {BellIcon} from 'app/assets/Icons/BellIcon';
import {CalculatorIcon} from 'app/assets/Icons/CalculatorIcon';
import {HomeIcon} from 'app/assets/Icons/HomeIcon';
import {SettingIcon} from 'app/assets/Icons/SettingIcon';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export interface IBottomNavigatorBarProps {
  countNotification?: number;
  notHandleHomePress?: boolean;
}

export const BottomNavigatorBar = (props: IBottomNavigatorBarProps) => {
  const app: IAppCoreService = useAppInjection();
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() =>
          props.notHandleHomePress ? null : app.navigationService.goBack()
        }
        activeOpacity={0.5}
        style={[style.itemButton]}>
        <HomeIcon color={Colors._007AFF} width={55} height={55} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => app.navigationService.navigate(Screens._NOTIFICATION)}
        activeOpacity={0.5}
        style={[style.itemButton]}>
        <BellIcon countNotification={props.countNotification} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => app.navigationService.navigate(Screens._CALCULATOR)}
        // onLongPress={props.onLongPress}
        activeOpacity={0.5}
        style={[style.itemButton]}>
        <CalculatorIcon />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => app.navigationService.navigate(Screens._ACCOUNT_SETTING)}
        //onLongPress={props.onLongPress}
        activeOpacity={0.5}
        style={[style.itemButton]}>
        <SettingIcon />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    borderRadius: 30,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors._D1D9E6_A_2,
  },
  itemButton: {
    height: '100%',
    width: '15%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
