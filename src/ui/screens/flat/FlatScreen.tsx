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

import {IHome} from 'app/data/storage/home/home.model';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {FlatItem} from './FlatItem';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import {BottomNavigatorBar} from 'app/ui/components/Common/BottomNavigatorBar';

export const FlatsScreen = (props: any) => {
  const app: IAppCoreService = useAppInjection();
  const [contentProgress, setContentProgress] = useState<number>(0);
  const [homeStage, setHomeStage] = useState<IHome>(
    props.route.params && props.route.params.home,
  );

  useEffect(() => {}, []);

  const renderFlatItem = () => {
    return homeStage.flats!.map((item: IFlat, index: number) => (
      <FlatItem
        key={index}
        type={homeStage.id}
        title={item.title}
        owner={item.owner}
        occupant={item.occupant}
        dateSettlement={item.dateSettlement}
        flat={item}
        onPress={() => {}}
      />
    ));
  };

  return (
    <View style={style.container}>
      <AppHeader
        title={props.route.params && props.route.params.title}
        onSettingsPress={() =>
          app.navigationService.navigate(Screens._ACCOUNT_SETTING)
        }
      />
      <ContentProgressScrollView
        onProgressChange={progress => setContentProgress(progress)}>
        {renderFlatItem()}
      </ContentProgressScrollView>
      <BottomNavigatorBar />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
