import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {createContext, useCallback, useEffect, useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Screen} from '../models/navigator/navigator.screen.config';
import {appCoreService, useAppInjection} from 'app/data/ioc/inversify.config';

import {BottomTabBar} from './BottomTabBar';
import {Screens} from 'app/assets/constants/codes/Screens';
import {MainScreen} from 'app/ui/screens/Home/HomeScreen';
import {NotificationsScreen} from 'app/ui/screens/Home/NotificationsScreen';
import {CalculatorScreen} from 'app/ui/screens/calculator-komunlki/CalculatorScreen';
import {PersonalInfoScreen} from 'app/ui/screens/accounts/AccountSetting/PersonalInfoScreen';
import {AccountSettingScreen} from 'app/ui/screens/accounts/AccountSetting/AccountSettingScreen';
import {CalculatorTariffSetting} from 'app/ui/screens/accounts/AccountSetting/CalculatorTariffSetting';
import {NotificationSetting} from 'app/ui/screens/accounts/AccountSetting/NotificationSetting';
import {LanguageSetting} from 'app/ui/screens/accounts/AccountSetting/LanguageSetting';
import {PolicyScreen} from 'app/ui/screens/accounts/AccountSetting/PolicyScreen';
import {TermsScreen} from 'app/ui/screens/accounts/AccountSetting/TermsScreen';

import {Colors} from 'app/assets/constants/colors/Colors';
import {Platform} from 'react-native';

import {Confirm} from 'app/ui/screens/auth/Login/Confirm';
import {observer} from 'mobx-react';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AsyncStorageFacade, AsyncStorageKey} from 'app/data/async-storege';
import {FlatsScreen} from 'app/ui/screens/flat/FlatScreen';
import {FlatInfoScreen} from 'app/ui/screens/flat/FlatInfoScreen';
import {FlatListUtilityBillsScreen} from 'app/ui/screens/flat/FlatListUtilityBillsScreen';
import {FlatCalculatorScreen} from 'app/ui/screens/flat/FlatCalculatorScreen';
import {ActivityIndicatorScreen} from 'app/ui/screens/common/ActivityIndicatorScreen';
import {BecTask} from 'app/services/background-task/background.fetch.task';

export interface ThemeContext {
  theme?: string;
  setTheme?: (theme: string) => void;
}
export const ThemeContext = createContext<ThemeContext>(null as any);

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors._007AFF,
    background: Colors._000000,
    card: Colors._007AFF,
    text: Colors._34C759,
    border: Colors._007AFF,
    notification: Colors._007AFF,
  },
};

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors._007AFF,
    background: Colors._FFFFFF,
    card: Colors._FFFFFF,
    text: Colors._000000,
    border: Colors._007AFF,
    notification: Colors._007AFF,
  },
};
const forFade = ({current}: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
export interface RootNavigatorProps {
  initialScreen: Screen;
}
const MainStack = createStackNavigator();

const AuthStack = (props: RootNavigatorProps) => {
  // const { translate } = useContext<LocalizationContext>(localizationContext);
  return (
    <MainStack.Navigator
      initialRouteName={Screens._CONFIRM}
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen
        name={Screens._CONFIRM}
        component={Confirm}
        options={{title: 'Main_SingUp'}}
      />
      <MainStack.Screen
        name={Screens.SCREEN_MAIN}
        component={MainScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <MainStack.Screen
        name={Screens._ACTIVITY_INDICATOR}
        component={ActivityIndicatorScreen}
        options={{
          cardStyle: {backgroundColor: 'transparent'},
          cardStyleInterpolator: forFade,
          gestureEnabled: false,
        }}
      />
    </MainStack.Navigator>
  );
};

const AppStack = (props: RootNavigatorProps) => {
  return (
    <MainStack.Navigator
      //initialRouteName={props.initialScreen.getName()}
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen
        name={Screens.STACK_TAB}
        component={BottomTabBar}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={Screens.SCREEN_MAIN}
        component={MainScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <MainStack.Screen
        name={Screens._NOTIFICATION}
        component={NotificationsScreen}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={Screens._CALCULATOR}
        component={CalculatorScreen}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={Screens._PERSONAL_INFO}
        component={PersonalInfoScreen}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={Screens._ACCOUNT_SETTING}
        component={AccountSettingScreen}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={Screens._CALCULATOR_TARIFF_SETTING}
        component={CalculatorTariffSetting}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={Screens._NOTIFICATION_SETTING}
        component={NotificationSetting}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={Screens._LANGUAGE_SETTING}
        component={LanguageSetting}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={Screens._POLICY}
        component={PolicyScreen}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={Screens._TERMS}
        component={TermsScreen}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={Screens._FLATS}
        component={FlatsScreen}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={Screens._FLAT_INFO}
        component={FlatInfoScreen}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={Screens._FLAT_LIST_UTILITY_BILLS}
        component={FlatListUtilityBillsScreen}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={Screens._FLAT_CALCULATOR}
        component={FlatCalculatorScreen}
        options={{gestureEnabled: false}}
      />
      {/* <MainStack.Screen
        name={Screens._TEST}
        component={BecTask}
        options={{gestureEnabled: false}}
      /> */}
      <MainStack.Screen
        name={Screens._ACTIVITY_INDICATOR}
        component={ActivityIndicatorScreen}
        options={{
          cardStyle: {backgroundColor: 'transparent'},
          cardStyleInterpolator: forFade,
          gestureEnabled: false,
        }}
      />
    </MainStack.Navigator>
  );
};
export const RootNavigator: React.FC<any> = observer(
  (props: RootNavigatorProps) => {
    const [renderAuth, setRenderAuth] = useState(false);
    useEffect(() => {
      getRenderedAuthStore();
    }, [props.initialScreen]);
    const [theme, setTheme] = useState('Light');
    const themeData = {theme, setTheme};

    const getRenderedAuthStore = async (): Promise<void> => {
      try {
        const result = await AsyncStorageFacade.getBoolean(
          AsyncStorageKey.RenderedAuthStore,
        );
        if (result !== null) {
          return setRenderAuth(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (props.initialScreen) {
      return (
        <ThemeContext.Provider value={themeData}>
          <NavigationContainer
            theme={theme == 'Light' ? LightTheme : DarkTheme}
            onStateChange={appCoreService.listenerService.onNavigationStateChange.bind(
              appCoreService.listenerService,
            )}
            ref={ref => appCoreService.navigationService.setNavigator(ref)}>
            <MainStack.Navigator
              screenOptions={{
                animationEnabled: false,
                headerStyle: {
                  height: Platform.OS === 'ios' ? 60 : 0,
                  borderBottomWidth: 0,
                  shadowColor: 'transparent',
                },
                headerShown: false,
              }}>
              {renderAuth ? (
                <MainStack.Screen
                  name={Screens.STACK_APP}
                  component={AppStack}
                />
              ) : (
                <MainStack.Screen
                  name={Screens.STACK_AUTH}
                  component={AuthStack}
                />
              )}
            </MainStack.Navigator>
          </NavigationContainer>
        </ThemeContext.Provider>
      );
    } else return null;
  },
);
