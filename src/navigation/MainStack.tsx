import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {MainScreen} from 'app/ui/screens/Main/MainScreen';
import {FirstScreen} from 'app/ui/screens/Main/FirstScreen';
import {Screens} from 'app/assets/constants/codes/Screens';

const Stack = createStackNavigator();

export const MainStack = (props: any) => {
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
    </Stack.Navigator>
  );
};
