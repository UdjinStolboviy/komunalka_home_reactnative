/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'reflect-metadata';
import React, {useEffect, useState} from 'react';
import {Provider} from 'inversify-react';

import SplashScreen from 'react-native-splash-screen';

import {appContainer, appCoreService} from './data/ioc/inversify.config';
import {Screen} from './models/navigator/navigator.screen.config';
import {RootNavigator} from './navigation/RootNavigator';
import {Screens} from './assets/constants/codes/Screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LocalizationContextWrapper from './localization/localizationProvider';

const MainComponent: React.FC = () => {
  const [initialScreen, setInitialScreen] = useState<any>();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    setInitialScreen(new Screen(Screens.STACK_AUTH));
  }, []);

  const defineAppContainer = () => {
    return (
      <SafeAreaProvider>
        <RootNavigator initialScreen={initialScreen} />
      </SafeAreaProvider>
    );
  };

  return (
    <LocalizationContextWrapper>
      <Provider container={appContainer}>{defineAppContainer()}</Provider>
    </LocalizationContextWrapper>
  );
};

export default MainComponent;
