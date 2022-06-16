import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Text} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';

import {IAppCoreService} from '../services/core/app.core.service.interface';
import {MainScreen} from 'src/ui/screens/Main/MainScreen';
import {FirstScreen} from 'src/ui/screens/Main/FirstScreen';
import {SecondScreen} from 'src/ui/screens/Main/SecondScreen';
import {EndScreen} from 'src/ui/screens/Main/EndScreen';
import {useAppInjection} from 'src/data/ioc/inversify.config';
import {Screens} from 'src/assets/constants/codes/Screens';

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

  const IconContainer = (props: IconContainerProps) => {
    switch (props.index) {
      case 0:
        return (
          <TouchableOpacity
            onPress={props.onPress}
            onLongPress={props.onLongPress}
            activeOpacity={1}
            style={{
              height: '100%',
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>M</Text>
          </TouchableOpacity>
        );
      case 1:
        return (
          <TouchableOpacity
            onPress={props.onPress}
            onLongPress={props.onLongPress}
            activeOpacity={1}
            style={{
              height: '100%',
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>1</Text>
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
            <Text>2</Text>
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
            <Text>3</Text>
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
          route.name === Screens.SCREEN_MAIN;

        if (!routeAvailable) {
          app.navigationService.navigate(Screens.SCREEN_SECOND);
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
    if (focusedOptions.tabBarVisible === false) return null;
    return (
      <View style={{height: 58, flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', height: '100%', width: '42%'}}>
          {renderIcon(navigationOptions, 0, 2)}
        </View>
        <View
          style={{
            height: '100%',
            width: '16%',
            alignItems: 'center',
            paddingBottom: 100,
          }}>
          <Text>E</Text>
        </View>
        <View style={{flexDirection: 'row', height: '100%', width: '42%'}}>
          {renderIcon(navigationOptions, 2, 4)}
        </View>
      </View>
    );
  };

  return (
    <Tab.Navigator tabBar={renderTabBar} initialRouteName={Screens.SCREEN_MAIN}>
      <Tab.Screen name={Screens.SCREEN_MAIN} component={MainScreen} />
      <Tab.Screen
        name={Screens.SCREEN_FIRST}
        component={FirstScreen}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen name={Screens.SCREEN_SECOND} component={SecondScreen} />
      <Tab.Screen name={Screens.SCREEN_END} component={EndScreen} />
    </Tab.Navigator>
  );
};