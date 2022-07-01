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
import {InputUniversal} from 'app/ui/components/input/app-input/InputUniversal';
import {FunctionButtons} from './view/FunctionButtons';

export interface ICalculatorScreenProps {}

export const CalculatorScreen = (props: ICalculatorScreenProps) => {
  const app: IAppCoreService = useAppInjection();
  const test1 = app.storage;

  const [contentProgress, setContentProgress] = useState<number>(0);
  const [resultInternet, setResultInternet] = useState<number>(70);
  const [resultRent, setResultRent] = useState<number>(6500);

  const [enableOtherOptions, setEnableOtherOptions] = useState<boolean>(true);
  const [enableComments, setEnableComments] = useState<boolean>(true);
  const [multiplicationElectricity, setMultiplicationElectricity] =
    useState<number>(0);
  const [multiplicationWater, setMultiplicationWater] = useState<number>(0);
  const [resultElectricity, setResultElectricity] = useState<number>(0);
  const [resultWater, setResultWater] = useState<number>(0);
  const [resultOtherOption, setResultOtherOption] = useState<number>(0);
  const [comments, setComments] = useState<string>('');
  const [messageElectricity, setMessageElectricity] = useState<string>('');
  const [messageWater, setMessageWater] = useState<string>('');

  const _closeAllPopUps = () => {
    Keyboard.dismiss();
  };
  const resultAllCalculate =
    multiplicationElectricity +
    multiplicationWater +
    resultInternet +
    resultRent +
    resultOtherOption;

  const massage = `Доброго дня!\n
  Порахували комунальні: \n
  Електроенергія: ${resultElectricity} кВт\n
  ${messageElectricity}
  1,6 грн за кВт\n
  ${resultElectricity} * 1.6 грн = ${multiplicationElectricity} грн \n
  Вода: ${resultWater} куб.м\n
   ${messageWater}
    30,38 грн за куб.м\n
    ${resultWater} * 30,38 грн = ${multiplicationWater} грн \n
  Інтернет: ${resultInternet} грн\n
  Квартплата: ${resultRent} грн\n
  Додаткові послуги: ${resultOtherOption} грн\n
  Коментар: ${comments}\n
  Всього:  ${multiplicationElectricity} + ${multiplicationWater} + \n
    ${resultInternet} + ${resultRent} + ${resultOtherOption} = ${resultAllCalculate} грн\n `;

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
            onTextChangeMessage={(text: string) => setMessageElectricity(text)}
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
            onTextChange={(text: number) => setResultWater(text)}
            onTextChangeMessage={(text: string) => setMessageWater(text)}
          />
          <MultiplicationCalculator
            unitOfMeasurement={Texts.KUBM}
            currentData={resultWater}
            tariffData={34.6}
            onTextChange={(text: number) => setMultiplicationWater(text)}
          />
          <AdditionalTariffs
            nameTariff={Texts.INTERNET}
            currentData={Number(resultInternet)}
            unitOfMeasurement={Texts.UHG}
            onTextChange={(text: string) => setResultInternet(text)}
          />
          <AdditionalTariffs
            nameTariff={Texts.RENT}
            currentData={Number(resultRent)}
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
          <AdditionalTariffs
            nameTariff={Texts.CONSOLIDATED_CALCULATION}
            currentData={resultAllCalculate}
            unitOfMeasurement={Texts.UHG}
            onTextChange={(text: string) => text}
          />
          <SwitchUniversal
            unitOfMeasurement={Texts.COMMENTS}
            onSwitchChange={(isEnabled: boolean) =>
              setEnableComments(isEnabled)
            }
          />
          {enableComments ? null : (
            <InputUniversal
              onTextChange={text => setComments(text)}
              typeKeyboard={'default'}
              validateText={'default'}
              placeholderInput={Texts.COMMENTS}
              containerStyle={style.inputContainer}
            />
          )}
          <FunctionButtons massage={massage} />
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
  inputContainer: {
    width: '95%',
    marginTop: 10,
  },
});
