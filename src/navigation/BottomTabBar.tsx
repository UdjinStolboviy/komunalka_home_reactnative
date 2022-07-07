import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TouchableOpacity, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';

import {IAppCoreService} from '../services/core/app.core.service.interface';
import {MainScreen} from 'app/ui/screens/Home/HomeScreen';
import {FirstScreen} from 'app/ui/screens/Home/FirstScreen';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {Screens} from 'app/assets/constants/codes/Screens';
import {HomeIcon} from 'app/assets/Icons/HomeIcon';
import {BellIcon} from 'app/assets/Icons/BellIcon';
import {CalculatorIcon} from 'app/assets/Icons/CalculatorIcon';
import {SettingIcon} from 'app/assets/Icons/SettingIcon';
import {Colors} from 'app/assets/constants/colors/Colors';
import {CalculatorScreen} from 'app/ui/screens/calculator-komunlki/CalculatorScreen';
import {AccountSettingScreen} from 'app/ui/screens/accounts/AccountSetting/AccountSettingScreen';
import {useTheme} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

interface IconContainerProps {
  index: number;
  routeName: string;
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
}

export const BottomTabBar = () => {
  const app: IAppCoreService = useAppInjection();
  const {colors} = useTheme();

  const IconContainer = (props: IconContainerProps) => {
    switch (props.index) {
      case 0:
        return (
          <TouchableOpacity
            onPress={props.onPress}
            onLongPress={props.onLongPress}
            activeOpacity={0.5}
            style={{
              height: '100%',
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <HomeIcon color={Colors._007AFF} width={55} height={55} />
          </TouchableOpacity>
        );
      case 1:
        return (
          <TouchableOpacity
            onPress={props.onPress}
            onLongPress={props.onLongPress}
            activeOpacity={0.5}
            style={{
              height: '100%',
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <BellIcon />
          </TouchableOpacity>
        );
      case 2:
        return (
          <TouchableOpacity
            onPress={props.onPress}
            onLongPress={props.onLongPress}
            activeOpacity={0.5}
            style={{
              height: '100%',
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CalculatorIcon />
          </TouchableOpacity>
        );
      case 3:
        return (
          <TouchableOpacity
            onPress={props.onPress}
            onLongPress={props.onLongPress}
            activeOpacity={0.5}
            style={{
              height: '100%',
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SettingIcon />
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  const renderIcon = (
    {state, descriptors, navigation}: BottomTabBarProps,
    start: number,
    end: number,
  ) => {
    return state.routes.slice(start, end).map((route, index) => {
      index = index + start;
      const {options} = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

      const isFocused = state.index === index;

      const onPress = () => {
        const routeAvailable =
          route.name === Screens.SCREEN_FIRST ||
          route.name === Screens.SCREEN_MAIN ||
          route.name === Screens.SCREEN_END ||
          route.name === Screens._ACCOUNT_SETTING;

        if (!routeAvailable) {
          app.navigationService.navigate(Screens._CALCULATOR);
          return;
        }
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      return (
        <IconContainer
          isFocused={isFocused}
          onLongPress={onLongPress}
          onPress={onPress}
          key={index}
          index={index}
          routeName={route.name}
        />
      );
    });
  };

  const renderTabBar = (navigationOptions: BottomTabBarProps) => {
    const focusedOptions =
      navigationOptions.descriptors[
        navigationOptions.state.routes[navigationOptions.state.index].key
      ].options;
    if (focusedOptions.unmountOnBlur === false) return null;
    return (
      <View
        style={{
          height: 80,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: '100%',
            width: '50%',
          }}>
          {renderIcon(navigationOptions, 0, 3)}
        </View>
        <View style={{flexDirection: 'row', height: '100%', width: '50%'}}>
          {renderIcon(navigationOptions, 2, 4)}
        </View>
      </View>
    );
  };

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      initialRouteName={Screens.SCREEN_MAIN}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name={Screens.SCREEN_MAIN} component={MainScreen} />
      <Tab.Screen
        name={Screens.SCREEN_FIRST}
        component={FirstScreen}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen name={Screens._CALCULATOR} component={CalculatorScreen} />
      <Tab.Screen
        name={Screens._ACCOUNT_SETTING}
        component={AccountSettingScreen}
      />
    </Tab.Navigator>
  );
};
