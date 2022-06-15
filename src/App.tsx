/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import "reflect-metadata";
import React, { useEffect } from 'react';
import { Provider } from 'inversify-react';
import { RootNavigator } from './navigator/RootNavigator';


import SplashScreen from 'react-native-splash-screen'



const App = () => {
 
  useEffect(() => {
    SplashScreen.hide();
  }, []);

 const defineAppContainer = () => {
    return (<RootNavigator initialScreen={initialScreen}/>)
  };

  return (
    <Provider container={appContainer}>
      {defineAppContainer()}
    </Provider>
  );
};

export default App;
