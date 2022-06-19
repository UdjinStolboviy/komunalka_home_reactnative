import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Screens} from 'app/assets/constants/codes/Screens';
import {Texts} from 'app/assets/constants/codes/Texts';
import {useAppInjection} from 'app/data/ioc/inversify.config';

import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {ContentProgressScrollView} from 'app/ui/components/Common/Scroll/ContentProgressScrollView';

export const MainScreen = (props: any) => {
  const app: IAppCoreService = useAppInjection();
  const [contentProgress, setContentProgress] = useState<number>(0);
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}>
      <AppHeader leftButtonDisabled title={Texts.HOME} />
      <ContentProgressScrollView
        onProgressChange={progress => setContentProgress(progress)}>
        <TouchableOpacity
          onPress={() => app.navigationService.navigate(Screens.STACK_TAB)}
          style={{
            width: '100%',
            height: 600,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>MAINE</Text>
        </TouchableOpacity>
      </ContentProgressScrollView>
    </View>
  );
};
