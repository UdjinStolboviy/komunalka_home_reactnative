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

import BackgroundFetch from "react-native-background-fetch";

let MyHeadlessTask = async (event: { taskId: any; timeout: any; }) => {
  // Get task id from event {}:
  let taskId = event.taskId;
  let isTimeout = event.timeout;  // <-- true when your background-time has expired.
  if (isTimeout) {
    // This task has exceeded its allowed running-time.
    // You must stop what you're doing immediately finish(taskId)
    console.log('[BackgroundFetch] Headless TIMEOUT:', taskId);
    BackgroundFetch.finish(taskId);
    return;
  }
  console.log('[BackgroundFetch HeadlessTask] start: ', taskId);

  // Perform an example HTTP request.
  // Important:  await asychronous tasks when using HeadlessJS.
  let response = await fetch('https://reactnative.dev/movies.json');
  let responseJson = await response.json();
  console.log('[BackgroundFetch HeadlessTask] response: ', responseJson);

  // Required:  Signal to native code that your task is complete.
  // If you don't do this, your app could be terminated and/or assigned
  // battery-blame for consuming too much time in background.
  BackgroundFetch.finish(taskId);
}

// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

const MainComponent: React.FC = () => {
  const [initialScreen, setInitialScreen] = useState<any>();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    appCoreService.listenerService.setupListeners();
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
