import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {MainScreen} from 'app/ui/screens/Home/HomeScreen';
import {FirstScreen} from 'app/ui/screens/Home/FirstScreen';
import {Screens} from 'app/assets/constants/codes/Screens';
import {CalculatorScreen} from 'app/ui/screens/calculator-komunlki/CalculatorScreen';
import {PersonalInfoScreen} from 'app/ui/screens/accounts/AccountSetting/PersonalInfoScreen';
import {AccountSettingScreen} from 'app/ui/screens/accounts/AccountSetting/AccountSettingScreen';
import {CalculatorTariffSetting} from 'app/ui/screens/accounts/AccountSetting/CalculatorTariffSetting';
import {NotificationSetting} from 'app/ui/screens/accounts/AccountSetting/NotificationSetting';
import {LanguageSetting} from 'app/ui/screens/accounts/AccountSetting/LanguageSetting';
import {PolicyScreen} from 'app/ui/screens/accounts/AccountSetting/PolicyScreen';
import {TermsScreen} from 'app/ui/screens/accounts/AccountSetting/TermsScreen';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export const MainStack = (props: any) => {
  // () =>
  //   navigationService.navigate(Screens.STACK_MAIN, {
  //     screen: Screens._TERMS,
  //   });
  return (
    <Stack.Navigator
      initialRouteName={!!props.route.params && props.route.params.name}
      screenOptions={{
        headerShown: false,
      }}>
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
  );
};
