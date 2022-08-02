import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {Screens} from 'app/assets/constants/codes/Screens';
import {Texts} from 'app/assets/constants/codes/Texts';
import {useAppInjection} from 'app/data/ioc/inversify.config';

import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {ContentProgressScrollView} from 'app/ui/components/Common/Scroll/ContentProgressScrollView';
import {Colors} from 'app/assets/constants/colors/Colors';
import {Home, IHome} from 'app/data/storage/home/home.model';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {BottomNavigatorBar} from 'app/ui/components/Common/BottomNavigatorBar';
import {ScreenDimensions} from 'app/assets/constants/codes/ScreenDimensions';
import {FlatExploreCard} from './flat-card/FlatExploreCard';
import {observer} from 'mobx-react';

export const FlatsScreen = observer((props: any) => {
  const app: IAppCoreService = useAppInjection();
  const fateful = app.storage.getHomesState();
  const homeIndex: number = props.route.params && props.route.params.homeIndex;
  const home = fateful.getHomes()[homeIndex];

  const [contentProgress, setContentProgress] = useState<number>(0);
  const [homeStage, setHomeStage] = useState<IHome>(home);

  useEffect(() => {
    setHomeStage(home);
  }, [home]);
  const floor = [0, 1, 2, 3, 4];

  const renderFlatItemFloor = (floor: number) => {
    return homeStage.flats!.map((item: IFlat, index: number) => {
      if (item.floor === floor) {
        return (
          <FlatExploreCard
            key={item.id}
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

  const renderFlatItem = (floor: number, index: number) => {
    if (renderFlatItemFloor(floor).every(item => item === null)) {
      return null;
    } else {
      return (
        <View key={index + floor}>
          <View style={style.wrapperTextFloor}>
            <Text style={style.textFloor}>{`Поверх ${floor}`}</Text>
          </View>
          {renderFlatItemFloor(floor)}
        </View>
      );
    }
  };

  const renderFlats = () => {
    return floor.map((item: number, index: number) =>
      renderFlatItem(item, index),
    );
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
        <View style={style.wrapper}>{renderFlats()}</View>
      </ContentProgressScrollView>
      <BottomNavigatorBar />
    </View>
  );
});

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  wrapperTextFloor: {
    alignItems: 'center',
    justifyContent: 'center',
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
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
});
