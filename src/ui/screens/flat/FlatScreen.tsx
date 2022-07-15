import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import {Screens} from 'app/assets/constants/codes/Screens';
import {Texts} from 'app/assets/constants/codes/Texts';
import {useAppInjection} from 'app/data/ioc/inversify.config';

import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {ContentProgressScrollView} from 'app/ui/components/Common/Scroll/ContentProgressScrollView';
import {Colors} from 'app/assets/constants/colors/Colors';
import {IHome} from 'app/data/storage/home/home.model';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {BottomNavigatorBar} from 'app/ui/components/Common/BottomNavigatorBar';
import {ScreenDimensions} from 'app/assets/constants/codes/ScreenDimensions';
import {FlatExploreCard} from './flat-card/FlatExploreCard';

export const FlatsScreen = (props: any) => {
  const app: IAppCoreService = useAppInjection();

  useEffect(() => {}, []);
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

  const renderFlatItemFloor = (floor: number) => {
    return homeStage.flats!.map((item: IFlat, index: number) => {
      if (item.floor === floor) {
        return (
          <FlatExploreCard
            key={index}
            index={index}
            flat={item}
            title={item.title}
            homeIndex={homeIndex}
            flatIndex={index}
            type={homeStage.id}
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
        progress={contentProgress}
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
    width: '100%',
    height: '100%',
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
  wrapperFlat: {
    width: '100%',
    height: '100%',
  },
});
