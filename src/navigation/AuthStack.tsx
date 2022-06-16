import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {MainScreen} from 'app/ui/screens/Main/mainScreen';
import {FirstScreen} from 'app/ui/screens/Main/firstScreen';
import {Screens} from 'app/res-const/codes/Screens';

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
