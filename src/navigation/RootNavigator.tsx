import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Screen} from '../models/navigator/navigator.screen.config';
import {appCoreService} from 'app/data/ioc/inversify.config';

import {MainStack} from './MainStack';
import {BottomTabBar} from './BottomTabBar';
import {Screens} from 'app/assets/constants/codes/Screens';
import {MainScreen} from 'app/ui/screens/Home/HomeScreen';
import {FirstScreen} from 'app/ui/screens/Home/FirstScreen';
import {CalculatorScreen} from 'app/ui/screens/calculator-komunlki/CalculatorScreen';
import {PersonalInfoScreen} from 'app/ui/screens/accounts/AccountSetting/PersonalInfoScreen';
import {AccountSettingScreen} from 'app/ui/screens/accounts/AccountSetting/AccountSettingScreen';
import {CalculatorTariffSetting} from 'app/ui/screens/accounts/AccountSetting/CalculatorTariffSetting';
import {NotificationSetting} from 'app/ui/screens/accounts/AccountSetting/NotificationSetting';
import {LanguageSetting} from 'app/ui/screens/accounts/AccountSetting/LanguageSetting';
import {PolicyScreen} from 'app/ui/screens/accounts/AccountSetting/PolicyScreen';
import {TermsScreen} from 'app/ui/screens/accounts/AccountSetting/TermsScreen';

const Stack = createStackNavigator();

export interface RootNavigatorProps {
  initialScreen: Screen;
}

export const RootNavigator = (props: RootNavigatorProps) => {
  useEffect(() => {}, [props.initialScreen]);
  // () =>
  //   navigationService.navigate(Screens.STACK_MAIN, {
  //     screen: Screens._TERMS,
  //   });
  {
    /* <Stack.Screen
            initialParams={props.initialScreen.getNext()}
            name={Screens.STACK_MAIN}
            component={MainStack}
            options={{gestureEnabled: false}}
          /> */
  }
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
            name={Screens.SCREEN_MAIN}
            component={MainScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name={Screens.SCREEN_FIRST}
            component={FirstScreen}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen
            name={Screens._CALCULATOR}
            component={CalculatorScreen}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen
            name={Screens._PERSONAL_INFO}
            component={PersonalInfoScreen}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen
            name={Screens._ACCOUNT_SETTING}
            component={AccountSettingScreen}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen
            name={Screens._CALCULATOR_TARIFF_SETTING}
            component={CalculatorTariffSetting}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen
            name={Screens._NOTIFICATION_SETTING}
            component={NotificationSetting}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen
            name={Screens._LANGUAGE_SETTING}
            component={LanguageSetting}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen
            name={Screens._POLICY}
            component={PolicyScreen}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen
            name={Screens._TERMS}
            component={TermsScreen}
            options={{gestureEnabled: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else return null;
};
