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
import {Screens} from './res-const/codes/Screens';
import {appContainer, appCoreService} from './data/ioc/inversify.config';
import {RootNavigator} from './navigation/RootNavigator';

const App = () => {
  const [initialScreen, setInitialScreen] = useState<any>();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    setInitialScreen(new Screen(Screens.STACK_AUTH));
  }, []);

  const defineAppContainer = () => {
    return <RootNavigator initialScreen={initialScreen} />;
  };

  return <Provider container={appContainer}>{defineAppContainer()}</Provider>;
};

export default App;
