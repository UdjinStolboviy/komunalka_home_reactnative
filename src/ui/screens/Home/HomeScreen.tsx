import React, {useEffect, useState} from 'react';
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
import {firebase} from '@react-native-firebase/database';
import {HomeItem} from './HomeItem';
import {Home, IHome} from 'app/data/storage/home/home.model';

export const MainScreen = (props: any) => {
  const app: IAppCoreService = useAppInjection();
  const reference = firebase
    .app()
    .database('https://komunalka-home-default-rtdb.firebaseio.com/')
    .ref('/homes');
  const [contentProgress, setContentProgress] = useState<number>(0);
  const [homeStage, setHomeStage] = useState<IHome[]>([]);

  useEffect(() => {
    const onValueChange = reference.on('value', snapshot => {
      console.log('A new node has been added', snapshot.val());
      setHomeStage(snapshot.val());
    });
    // Stop listening for updates when no longer required
    return () => reference.off('value', onValueChange);
  }, []);

  // const setRenderedAuthStore = async (code: boolean) => {
  //   await AsyncStorageFacade.saveBoolean(
  //     AsyncStorageKey.RenderedAuthStore,
  //     code,
  //   );
  // };

  const renderHomeItem = () => {
    return homeStage.map((item: IHome, index: number) => (
      <HomeItem
        key={index}
        title={item.title}
        titleButton={Texts.OPEN}
        description={Texts.OPEN}
        onPress={() => {
          app.navigationService.navigate(Screens._FLATS, {
            title: `${Texts.FLAT} ${item.title}`,
            home: new Home(item),

            // onFocusLose: () => {
            //   dialogsShareState.setEntityShareType(entityShareType);
            //   dialogsShareState.setEntityToShareMetadata(entityToShareMetadata);
            //   dialogsShareState.setEntityToShare(entityToShare);
            // },
          });
          //reference.set(homeStage).then(() => console.log('Data set.'));
        }}
      />
    ));
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
        {renderHomeItem()}
        <ElementItem
          title={Type.CALCULATOR}
          titleButton={Texts.OPEN}
          description={Texts.OPEN}
          onPress={() => {
            //setRenderedAuthStore(false);
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
