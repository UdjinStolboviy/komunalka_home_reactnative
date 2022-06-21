import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {Texts} from 'app/assets/constants/codes/Texts';
import {SubtractionCalculator} from './view/SubtractionCalculator';
import {TitleUniversal} from 'app/ui/components/Common/TitleUniversal';
import {ContentProgressScrollView} from 'app/ui/components/Common/Scroll/ContentProgressScrollView';

export interface ICalculatorScreenProps {}

export const CalculatorScreen = (props: ICalculatorScreenProps) => {
  const app: IAppCoreService = useAppInjection();
  const [contentProgress, setContentProgress] = useState<number>(0);

  return (
    <View style={style.container}>
      <AppHeader title={Texts.CALCULATOR} />
      <ContentProgressScrollView
        onProgressChange={progress => setContentProgress(progress)}>
        <TitleUniversal title={Texts.ELECTRICITY} />
        <SubtractionCalculator />
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
