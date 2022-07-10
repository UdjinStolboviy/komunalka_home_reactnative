import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

import {Screens} from 'app/assets/constants/codes/Screens';
import {Texts} from 'app/assets/constants/codes/Texts';
import {useAppInjection} from 'app/data/ioc/inversify.config';

import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {ContentProgressScrollView} from 'app/ui/components/Common/Scroll/ContentProgressScrollView';
import {HomePageCharts} from 'app/ui/screens/Home/HomePageCharts';
import {ElementItem} from 'app/ui/components/Main/ScreenView/ElemetItemHome';
import {Type} from 'app/assets/constants/codes/Type';
import {Colors} from 'app/assets/constants/colors/Colors';
import {AsyncStorageFacade, AsyncStorageKey} from 'app/data/async-storege';

export const MainScreen = (props: any) => {
  const app: IAppCoreService = useAppInjection();
  const [contentProgress, setContentProgress] = useState<number>(0);
  const [homeStage, setHomeStage] = useState([
    {
      id: 'homeRed',
      title: 'Home Red',
      flats: [{id: 'homeRedFlat1'}, {id: 'homeRedFlat2'}],
    },
    {
      id: 'homeWhit',
      title: 'Home White',
      flats: [{id: 'homeWhitFlat1'}, {id: 'homeWhitFlat2'}],
    },
  ]);
  const setRenderedAuthStore = async (code: boolean) => {
    await AsyncStorageFacade.saveBoolean(
      AsyncStorageKey.RenderedAuthStore,
      code,
    );
  };

  return (
    <View style={style.container}>
      <AppHeader
        leftButtonDisabled
        title={Texts.HOME}
        onSettingsPress={() =>
          app.navigationService.navigate(Screens._ACCOUNT_SETTING)
        }
      />

      <ContentProgressScrollView
        onProgressChange={progress => setContentProgress(progress)}>
        <HomePageCharts />
        <ElementItem
          title={homeStage[0].title}
          titleButton={Texts.OPEN}
          description={Texts.OPEN}
        />
        <ElementItem
          title={homeStage[1].title}
          titleButton={Texts.OPEN}
          description={Texts.OPEN}
        />
        <ElementItem
          title={Type.CALCULATOR}
          titleButton={Texts.OPEN}
          description={Texts.OPEN}
          onPress={() => {
            setRenderedAuthStore(false);
            app.navigationService.navigate(Screens._CALCULATOR);
          }}
        />
      </ContentProgressScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
