import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Screen} from '../models/navigator/navigator.screen.config';
import {appCoreService} from 'app/data/ioc/inversify.config';
import {Screens} from 'app/res-const/codes/Screens';
import {AuthStack} from './AuthStack';
import {BottomTabBar} from './BottomTabBar';
import {MainScreen} from 'app/ui/screens/Main/MainScreen';

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
          headerMode="none">
          {/*<Stack.Navigator  initialRouteName={Screens.SCREEN_PROFILE} headerMode='none'>*/}
          <Stack.Screen
            initialParams={props.initialScreen.getNext()}
            name={Screens.STACK_AUTH}
            component={AuthStack}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen
            name={Screens.STACK_TAB}
            component={BottomTabBar}
            options={{gestureEnabled: false}}
          />

          <Stack.Screen
            name={Screens.SCREEN_MAIN}
            component={MainScreen}
            options={{gestureEnabled: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else return null;
};
