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
  const homeIndex: number = props.route.params && props.route.params.homeIndex;
  const floor0 = 0;
  const floor1 = 1;
  const floor2 = 2;
  const floor3 = 3;
  const floor4 = 4;

  //useEffect(() => {}, []);

  const renderFlatItemFloor = (floor: number) => {
    return homeStage.flats!.map((item: IFlat, index: number) => {
      if (item.floor === floor) {
        return (
          <FlatItem
            key={index}
            type={homeStage.id}
            title={item.title}
            owner={item.owner}
            occupant={item.occupant}
            dateSettlement={item.dateSettlement}
            flat={item}
            homeIndex={homeIndex}
            flatIndex={index}
            onPress={() => {}}
          />
        );
      } else {
        return null;
      }
    });
  };

  const renderFlatItem = (floor: number) => {
    if (renderFlatItemFloor(floor).every(item => item === null)) {
      return null;
    } else {
      return (
        <View>
          <View style={style.wrapperTextFloor}>
            <Text style={style.textFloor}>{`Поверх ${floor}`}</Text>
          </View>
          {renderFlatItemFloor(floor)}
        </View>
      );
    }
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
        {renderFlatItem(floor0)}
        {renderFlatItem(floor1)}
        {renderFlatItem(floor2)}
        {renderFlatItem(floor3)}
        {renderFlatItem(floor4)}
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
  wrapperTextFloor: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  textFloor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors._007AFF,
  },
});
