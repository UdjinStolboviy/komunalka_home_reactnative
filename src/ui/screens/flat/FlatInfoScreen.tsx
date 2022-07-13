import {RouteProp, useRoute} from '@react-navigation/native';
import {Colors} from 'app/assets/constants/colors/Colors';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {ContentProgressScrollView} from 'app/ui/components/Common/Scroll/ContentProgressScrollView';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FlatInfoView} from './FlatInfoView';
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
        <View style={style.middleWrapper}>
          <FlatInfoView
            isAdmin={true}
            flat={flatStage}
            flatIndex={flatIndex}
            homeIndex={homeIndex}
          />
        </View>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textDescription: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 7,
    color: Colors._007AFF,
  },
});
