import {RouteProp, useRoute} from '@react-navigation/native';
import {Screens} from 'app/assets/constants/codes/Screens';
import {Colors} from 'app/assets/constants/colors/Colors';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {UniversalButton} from 'app/ui/components/button/AppButton/UniversalButton';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {ContentProgressScrollView} from 'app/ui/components/Common/Scroll/ContentProgressScrollView';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FlatBottomNavigatorBar} from './FlatBottomNavigatorBar';
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
          <UniversalButton
            title={'Список комунальних розрахунків'}
            onPress={() =>
              app.navigationService.navigate(Screens._FLAT_LIST_UTILITY_BILLS, {
                calculatorFlat: flatStage.calculatorFlat,
                flatIndex: flatIndex,
                homeIndex: homeIndex,
              })
            }
            containerStyle={[style.buttonContainer, {marginTop: 25}]}
          />
          <UniversalButton
            title={'Конкулятор комунальних послуг'}
            containerStyle={style.buttonContainer}
          />
          <UniversalButton
            title={'Зберегти всю інформацію'}
            containerStyle={style.buttonContainer}
          />
          <View style={{height: 40}} />
        </View>
      </ContentProgressScrollView>
      <FlatBottomNavigatorBar />
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
  buttonContainer: {
    marginVertical: 15,
  },
});
