import {Screens} from 'app/assets/constants/codes/Screens';
import {useAppInjection} from 'app/data/ioc/inversify.config';

import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export const MainScreen = (props: any) => {
  const app: IAppCoreService = useAppInjection();
  return (
    <View
      style={{
        paddingTop: '10%',
        height: '100%',
        width: '100%',
      }}>
      <AppHeader
        onBackPress={() => app.navigationService.navigate(Screens.STACK_TAB)}
      />
      <TouchableOpacity
        onPress={() => app.navigationService.navigate(Screens.STACK_TAB)}
        style={{
          width: '100%',
          height: '90%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>MAINE</Text>
      </TouchableOpacity>
    </View>
  );
};
