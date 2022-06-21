import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {MainScreen} from 'app/ui/screens/Home/HomeScreen';
import {FirstScreen} from 'app/ui/screens/Home/FirstScreen';
import {Screens} from 'app/assets/constants/codes/Screens';
import {CalculatorScreen} from 'app/ui/screens/calculator-komunlki/CalculatorScreen';

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
      <Stack.Screen
        name={Screens._CALCULATOR}
        component={CalculatorScreen}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};
