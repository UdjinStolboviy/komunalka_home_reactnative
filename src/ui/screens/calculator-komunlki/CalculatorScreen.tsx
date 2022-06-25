import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Keyboard} from 'react-native';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {Texts} from 'app/assets/constants/codes/Texts';
import {SubtractionCalculator} from './view/SubtractionCalculator';
import {TitleUniversal} from 'app/ui/components/Common/TitleUniversal';
import {ContentProgressScrollView} from 'app/ui/components/Common/Scroll/ContentProgressScrollView';
import {MultiplicationCalculator} from './view/MultiplicationCalculator';

export interface ICalculatorScreenProps {}

export const CalculatorScreen = (props: ICalculatorScreenProps) => {
  const app: IAppCoreService = useAppInjection();
  const [contentProgress, setContentProgress] = useState<number>(0);
  const [resultElectricity, setResultElectricity] = useState<number>(0);
  const [multiplicationElectricity, setMultiplicationElectricity] =
    useState<number>(0);
  const _closeAllPopUps = () => {
    Keyboard.dismiss();
  };

  console.log('CalculatorScreen', resultElectricity, multiplicationElectricity);

  return (
    <View style={style.container}>
      <AppHeader title={Texts.CALCULATOR} />
      <ContentProgressScrollView
        onProgressChange={progress => setContentProgress(progress)}>
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPress={_closeAllPopUps}>
          <TitleUniversal title={Texts.ELECTRICITY} />
          <SubtractionCalculator
            unitOfMeasurement={Texts.KWT}
            onTextChange={(text: number) => setResultElectricity(text)}
          />
          <MultiplicationCalculator
            unitOfMeasurement={Texts.KWT}
            currentData={resultElectricity}
            tariffData={1.6}
            onTextChange={(text: number) => setMultiplicationElectricity(text)}
          />
        </TouchableOpacity>
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
