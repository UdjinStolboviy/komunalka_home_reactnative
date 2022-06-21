import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Screen} from '../models/navigator/navigator.screen.config';
import {appCoreService} from 'app/data/ioc/inversify.config';

import {MainStack} from './MainStack';
import {BottomTabBar} from './BottomTabBar';
import {MainScreen} from 'app/ui/screens/Home/HomeScreen';
import {Screens} from 'app/assets/constants/codes/Screens';

const Stack = createStackNavigator();

export interface RootNavigatorProps {
  initialScreen: Screen;
}

export const RootNavigator = (props: RootNavigatorProps) => {
  useEffect(() => {}, [props.initialScreen]);

  if (props.initialScreen) {
    return (
      <NavigationContainer
        onStateChange={appCoreService.listenerService.onNavigationStateChange.bind(
          appCoreService.listenerService,
        )}
        ref={ref => appCoreService.navigationService.setNavigator(ref)}>
        <Stack.Navigator
          initialRouteName={props.initialScreen.getName()}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name={Screens.STACK_TAB}
            component={BottomTabBar}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen
            initialParams={props.initialScreen.getNext()}
            name={Screens.STACK_MAIN}
            component={MainStack}
            options={{gestureEnabled: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else return null;
};
