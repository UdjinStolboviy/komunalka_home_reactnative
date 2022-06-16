import {Screens} from 'src/assets/constants/codes/Screens';
import {useAppInjection} from 'app/data/ioc/inversify.config';

import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export const MainScreen = (props: any) => {
  const app: IAppCoreService = useAppInjection();
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() => app.navigationService.navigate(Screens.STACK_TAB)}>
        <Text>MAINE</Text>
      </TouchableOpacity>
    </View>
  );
};
