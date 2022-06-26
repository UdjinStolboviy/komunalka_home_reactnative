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
import {AdditionalTariffs} from './view/AdditionalTariffs';
import {SwitchUniversal} from 'app/ui/components/Common/SwitchUniversal';
import {OtherOptionView} from './view/OtherOptionView';

export interface ICalculatorScreenProps {}

export const CalculatorScreen = (props: ICalculatorScreenProps) => {
  const app: IAppCoreService = useAppInjection();
  const [contentProgress, setContentProgress] = useState<number>(0);
  const [resultInternet, setResultInternet] = useState<string>('');
  const [resultRent, setResultRent] = useState<string>('');
  const [enableOtherOptions, setEnableOtherOptions] = useState<boolean>(true);
  const [multiplicationElectricity, setMultiplicationElectricity] =
    useState<number>(0);
  const [resultElectricity, setResultElectricity] = useState<number>(0);
  const [resultOtherOption, setResultOtherOption] = useState<number>(0);
  const _closeAllPopUps = () => {
    Keyboard.dismiss();
  };

  console.log('CalculatorScreen', resultOtherOption);

  return (
    <View style={style.container}>
      <AppHeader title={Texts.CALCULATOR} progress={contentProgress} />
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
          <TitleUniversal title={Texts.WATER} />
          <SubtractionCalculator
            unitOfMeasurement={Texts.KUBM}
            onTextChange={(text: number) => setResultElectricity(text)}
          />
          <MultiplicationCalculator
            unitOfMeasurement={Texts.KUBM}
            currentData={resultElectricity}
            tariffData={34.6}
            onTextChange={(text: number) => setMultiplicationElectricity(text)}
          />
          <AdditionalTariffs
            nameTariff={Texts.INTERNET}
            currentData={70}
            unitOfMeasurement={Texts.UHG}
            onTextChange={(text: string) => setResultInternet(text)}
          />
          <AdditionalTariffs
            nameTariff={Texts.RENT}
            currentData={6500}
            unitOfMeasurement={Texts.UHG}
            onTextChange={(text: string) => setResultRent(text)}
          />
          <SwitchUniversal
            unitOfMeasurement={Texts.OTHER_OPTIONS}
            onSwitchChange={(isEnabled: boolean) =>
              setEnableOtherOptions(isEnabled)
            }
          />
          {enableOtherOptions ? null : (
            <OtherOptionView
              onResultOther={(result: number) => setResultOtherOption(result)}
            />
          )}
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
