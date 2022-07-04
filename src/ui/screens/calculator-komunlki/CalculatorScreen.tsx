import React, {useEffect, useState} from 'react';
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
import {observer} from 'mobx-react';
import {ResultCalculatorView} from './view/ResultCalculatotView';
import {financialFixed} from 'app/utils/comparator';

export interface ICalculatorScreenProps {}

export const CalculatorScreen = observer((props: ICalculatorScreenProps) => {
  const app: IAppCoreService = useAppInjection();
  const calculatorState = app.storage.getCalculatorState();
  const settingAccountTariffState = app.storage.getSettingAccountTariffState();
  const resultInternet = settingAccountTariffState.getInternetTariff();
  const resultRent = settingAccountTariffState.getRentTariff();

  const [contentProgress, setContentProgress] = useState<number>(0);
  const [enableOtherOptions, setEnableOtherOptions] = useState<boolean>(true);
  const [enableComments, setEnableComments] = useState<boolean>(true);

  const multiplicationElectricity = financialFixed(
    calculatorState.getMultiplicationElectricity(),
  );
  const multiplicationWater = financialFixed(
    calculatorState.getMultiplicationWater(),
  );
  const resultElectricity = financialFixed(
    calculatorState.getResultElectricity(),
  );
  const resultWater = financialFixed(calculatorState.getResultWater());
  const resultOtherOption = financialFixed(
    calculatorState.getResultOtherOption(),
  );
  const comments = calculatorState.getComments();
  const messageElectricity = calculatorState.getMessageElectricity();
  const messageWater = calculatorState.getMessageWater();
  const resultAllCalculate = financialFixed(
    multiplicationElectricity +
      multiplicationWater +
      resultInternet +
      resultRent +
      resultOtherOption,
  );

  const _closeAllPopUps = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    console.log('multiplicationElectricity', multiplicationElectricity);
    console.log('multiplicationWater', multiplicationWater);
    console.log('resultInternet', resultInternet);
    console.log('resultRent', resultRent);
    console.log('resultOtherOption', resultOtherOption);
    console.log('resultAllCalculate', resultAllCalculate);
  }, [contentProgress]);

  const massage = `Доброго дня!
    Порахували комунальні:
    Електроенергія: ${resultElectricity} кВт
    ${messageElectricity}
    1,6 грн за кВт
    ${resultElectricity} * 1.6 грн = ${multiplicationElectricity} грн 

    Вода: ${resultWater} куб.м
    ${messageWater}
    30,38 грн за куб.м
    ${resultWater} * 30,38 грн = ${multiplicationWater} грн 

    Інтернет: ${resultInternet} грн
    Квартплата: ${resultRent} грн
    Додаткові послуги: ${resultOtherOption} грн
    
    Коментар: ${comments}\n
    Всього:  ${multiplicationElectricity} + ${multiplicationWater} + 
    ${resultInternet} + ${resultRent} + ${resultOtherOption} = ${resultAllCalculate} грн\n `;

  return (
    <View style={style.container}>
      <AppHeader
        title={Texts.CALCULATOR}
        progress={contentProgress}
        result={resultAllCalculate}
      />
      <ContentProgressScrollView
        onProgressChange={progress => setContentProgress(progress)}>
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPress={_closeAllPopUps}>
          <TitleUniversal title={Texts.ELECTRICITY} />
          <SubtractionCalculator
            unitOfMeasurement={Texts.KWT}
            onTextChange={(text: number) =>
              calculatorState.setResultElectricity(text)
            }
            onTextChangeMessage={(text: string) =>
              calculatorState.setMessageElectricity(text)
            }
          />
          <MultiplicationCalculator
            unitOfMeasurement={Texts.KWT}
            currentData={resultElectricity}
            tariffData={settingAccountTariffState.getElectricityTariff()}
            onTextChange={(text: number) =>
              calculatorState.setMultiplicationElectricity(text)
            }
          />
          <TitleUniversal title={Texts.WATER} />
          <SubtractionCalculator
            unitOfMeasurement={Texts.KUBM}
            onTextChange={(text: number) =>
              calculatorState.setResultWater(text)
            }
            onTextChangeMessage={(text: string) =>
              calculatorState.setMessageWater(text)
            }
          />
          <MultiplicationCalculator
            unitOfMeasurement={Texts.KUBM}
            currentData={resultWater}
            tariffData={settingAccountTariffState.getWaterTariff()}
            onTextChange={(text: number) =>
              calculatorState.setMultiplicationWater(text)
            }
          />
          <AdditionalTariffs
            nameTariff={Texts.INTERNET}
            currentData={resultInternet}
            unitOfMeasurement={Texts.UHG}
            onTextChange={(text: string) =>
              settingAccountTariffState.setInternetTariff(Number(text))
            }
          />
          <AdditionalTariffs
            nameTariff={Texts.RENT}
            currentData={resultRent}
            unitOfMeasurement={Texts.UHG}
            onTextChange={(text: string) =>
              settingAccountTariffState.setRentTariff(Number(text))
            }
          />
          <SwitchUniversal
            unitOfMeasurement={Texts.OTHER_OPTIONS}
            onSwitchChange={(isEnabled: boolean) =>
              setEnableOtherOptions(isEnabled)
            }
          />
          {enableOtherOptions ? null : (
            <OtherOptionView
              onResultOther={(result: number) =>
                calculatorState.setResultOtherOption(result)
              }
            />
          )}
          <ResultCalculatorView
            nameTariff={Texts.CONSOLIDATED_CALCULATION}
            currentData={resultAllCalculate}
            unitOfMeasurement={Texts.UHG}
          />
          <SwitchUniversal
            unitOfMeasurement={Texts.COMMENTS}
            onSwitchChange={(isEnabled: boolean) =>
              setEnableComments(isEnabled)
            }
          />
          {enableComments ? null : (
            <InputUniversal
              onTextChange={text => calculatorState.setComments(text)}
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
});

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