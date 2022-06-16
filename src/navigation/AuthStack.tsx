import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {MainScreen} from 'src/ui/screens/Main/MainScreen';
import {FirstScreen} from 'src/ui/screens/Main/FirstScreen';
import {Screens} from 'src/assets/constants/codes/Screens';

const Stack = createStackNavigator();

export const AuthStack = (props: any) => {
  return (
    <Stack.Navigator
      initialRouteName={!!props.route.params && props.route.params.name}
      headerMode="none">
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
    </Stack.Navigator>
  );
};