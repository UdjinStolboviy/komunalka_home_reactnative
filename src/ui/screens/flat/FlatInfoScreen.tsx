import {RouteProp, useRoute} from '@react-navigation/native';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {ContentProgressScrollView} from 'app/ui/components/Common/Scroll/ContentProgressScrollView';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ImageFlat} from './ImageFlat';

export interface IFlatInfoScreenProps {
  flat?: IFlat;
}

export const FlatInfoScreen = (props: any) => {
  const app: IAppCoreService = useAppInjection();
  const [flatStage, setFlatStage] = useState<IFlat>(
    props.route.params && props.route.params.flat,
  );
  const [contentProgress, setContentProgress] = useState<number>(0);
  const flatIndex = props.route.params && props.route.params.flatIndex;
  const homeIndex = props.route.params && props.route.params.homeIndex;
  console.log('flatIndex', flatStage);

  return (
    <View style={style.container}>
      <AppHeader progress={contentProgress} title={flatStage.title} />
      <ContentProgressScrollView
        onProgressChange={progress => setContentProgress(progress)}>
        <ImageFlat imagStack={flatStage.images!} />
        <Text>{flatStage.title}</Text>
        <Text>{flatStage.rooms}</Text>
        <Text>{flatStage.emailOccupant}</Text>
        <Text>{flatStage.area}</Text>
      </ContentProgressScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  middleWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
