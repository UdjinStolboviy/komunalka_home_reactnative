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
import NetInfo from '@react-native-community/netinfo';
import {databaseFirebase} from 'app/services/firebase/firebase.database';

export const MainScreen = (props: any) => {
  const app: IAppCoreService = useAppInjection();
  const reference = databaseFirebase('/homes');
  const [homeStage, setHomeStage] = useState<IHome[]>([]);
  const [connectionNet, setConnectionNet] = useState<boolean | null>(false);

  useEffect(() => {
    saveHomeStore();
  }, [connectionNet]);

  NetInfo.fetch().then(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
    app.storage.getHomesState().setConnectNetwork(state.isConnected);
    setConnectionNet(state.isConnected);
  });

  const saveHomeStore = () => {
    if (connectionNet) {
      cleanStore();
      const onValueChange = reference.on('value', snapshot => {
        console.log('A new node has been added', snapshot.val());
        setHomeStage(snapshot.val());
        setHomeStore(snapshot.val());
        app.storage.getHomesState().setHomes(snapshot.val());
        app.storage.getNotificationsState().setUnreadNotificationsCount(2);
      });
      // Stop listening for updates when no longer required

      return () => reference.off('value', onValueChange);
    }
    getHomeStore();
  };

  const getHomeStore = async (): Promise<void> => {
    try {
      const result: IHome[] | null = await AsyncStorageFacade.get(
        AsyncStorageKey.HomeStore,
      );
      if (result !== null) {
        app.storage.getHomesState().setHomes(result);
        return setHomeStage(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setHomeStore = async (home: IHome[]) => {
    app.navigationService.navigate(Screens._ACTIVITY_INDICATOR);
    await AsyncStorageFacade.save(AsyncStorageKey.HomeStore, home);
    app.navigationService.goBack();
  };

  const cleanStore = async () => {
    app.navigationService.navigate(Screens._ACTIVITY_INDICATOR);
    await AsyncStorageFacade.remove(AsyncStorageKey.HomeStore);
    app.navigationService.goBack();
  };

  const renderHomeItem = () => {
    return homeStage.map((item: IHome, index: number) => (
      <HomeItem
        key={index}
        title={item.title}
        type={item.id}
        titleButton={Texts.OPEN}
        description={Texts.OPEN}
        onPress={() => {
          app.navigationService.navigate(Screens._FLATS, {
            title: `${Texts.FLAT} ${item.title}`,
            home: new Home(item),
            homeIndex: index,
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

      <ContentProgressScrollView onProgressChange={progress => progress}>
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
