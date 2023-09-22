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

import {
  appContainer,
  appCoreService,
  useAppInjection,
} from './data/ioc/inversify.config';
import {Screen} from './models/navigator/navigator.screen.config';
import {RootNavigator} from './navigation/RootNavigator';
import {Screens} from './assets/constants/codes/Screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LocalizationContextWrapper from './localization/localizationProvider';
import {observer} from 'mobx-react';
import {IAppCoreService} from './services/core/app.core.service.interface';

const MainComponent: React.FC = observer(() => {
  const [initialScreen, setInitialScreen] = useState<any>();

  useEffect(() => {
    createClientDate();
  }, []);

  const createClientDate = async (): Promise<boolean> => {
    try {
      appCoreService.listenerService.setupListeners();
      setInitialScreen(new Screen(Screens._INITIAL));
      setTimeout(() => {
        SplashScreen.hide();
      }, 100);
      return true;
    } catch (e) {
      setInitialScreen(new Screen(Screens._ERROR));
      SplashScreen.hide();
      return false;
    }
  };

  const defineAppContainer = () => {
    return (
      <SafeAreaProvider>
        <RootNavigator initialScreen={initialScreen} />
      </SafeAreaProvider>
    );
  };

  if (!initialScreen) {
    return null;
  }
  return (
    <LocalizationContextWrapper>
      <Provider container={appContainer}>{defineAppContainer()}</Provider>
    </LocalizationContextWrapper>
  );
});

export default MainComponent;
