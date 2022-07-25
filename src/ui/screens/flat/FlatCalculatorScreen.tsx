import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Keyboard} from 'react-native';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {Texts} from 'app/assets/constants/codes/Texts';
import {TitleUniversal} from 'app/ui/components/Common/TitleUniversal';
import {ContentProgressScrollView} from 'app/ui/components/Common/Scroll/ContentProgressScrollView';
import {SwitchUniversal} from 'app/ui/components/Common/SwitchUniversal';
import {InputUniversal} from 'app/ui/components/input/app-input/InputUniversal';
import {observer} from 'mobx-react';
import {financialFixed} from 'app/utils/comparator';
import {Colors} from 'app/assets/constants/colors/Colors';
import {Screens} from 'app/assets/constants/codes/Screens';
import {MultiplicationCalculator} from '../calculator-komunlki/view/MultiplicationCalculator';
import {AdditionalTariffs} from '../calculator-komunlki/view/AdditionalTariffs';
import {OtherOptionView} from '../calculator-komunlki/view/OtherOptionView';
import {ResultCalculatorView} from '../calculator-komunlki/view/ResultCalculatotView';
import {FunctionButtons} from '../calculator-komunlki/view/FunctionButtons';
import {IFlatCalculator} from 'app/data/storage/flat/flat.calculator.model';
import {FlatSubtractionCalculator} from './calculatorFlat/FlatSubtractionCalculator';

import moment from 'moment';

import {databaseFirebase} from 'app/services/firebase/firebase.database';
import {ModalDoneScreen} from '../modal/action-modal/ModalDone';

export interface IFlatCalculatorScreenProps {}

export const FlatCalculatorScreen = observer((props: any) => {
  const app: IAppCoreService = useAppInjection();

  const flatIndex = props.route.params && props.route.params.flatIndex;
  const homeIndex = props.route.params && props.route.params.homeIndex;
  const price = app.storage.getHomesState().getHomes()[homeIndex].flats[
    flatIndex
  ].price;
  const calculatorFlatStage: any = app.storage.getHomesState().getHomes()[
    homeIndex
  ].flats[flatIndex].calculatorFlat;
  // const calculatorFlatStage: IFlatCalculator[] =
  //   props.route.params && props.route.params.calculatorFlat;
  const preResultCalculatorFlat: IFlatCalculator =
    calculatorFlatStage && calculatorFlatStage[0];

  const calculatorState = app.storage.getCalculatorState();
  const settingAccountTariffState = app.storage.getSettingAccountTariffState();
  const resultInternet = settingAccountTariffState.getInternetTariff();
  const resultRent = settingAccountTariffState.getRentTariff();
  const electricityTariff = settingAccountTariffState.getElectricityTariff();
  const waterTariff = settingAccountTariffState.getWaterTariff();
  const garbageRemovalTariff =
    settingAccountTariffState.getGarbageRemovalTariff();
  const [enableComments, setEnableComments] = useState<boolean>(true);

  const [connectionNet, setConnectionNet] = useState<boolean | null>(
    app.storage.getHomesState().getConnectNetwork(),
  );

  const [contentProgress, setContentProgress] = useState<number>(0);
  const [enableOtherOptions, setEnableOtherOptions] = useState<boolean>(true);
  const [currentDataElectricity, setCurrentDataElectricity] =
    useState<number>(0);
  const [currentDataWater, setCurrentDataWater] = useState<number>(0);
  const [preliminaryDataElectricity, setPreliminaryDataElectricity] =
    useState<number>(0);
  const [preliminaryDataWater, setPreliminaryDataWater] = useState<number>(0);

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
  const resultAllUtilityPayments = financialFixed(
    multiplicationElectricity +
      multiplicationWater +
      resultInternet +
      garbageRemovalTariff,
  );
  const resultAllCalculate = financialFixed(
    multiplicationElectricity +
      multiplicationWater +
      resultInternet +
      resultRent +
      garbageRemovalTariff +
      resultOtherOption,
  );

  const SubtractionElectricityRef: any = useRef();
  const SubtractionWaterRef: any = useRef();
  const modalDoneRef: any = useRef();

  const _closeAllPopUps = () => {
    Keyboard.dismiss();
  };

  const _onPressTrash = () => {
    calculatorState.clearState();
    setContentProgress(0);
    setEnableOtherOptions(true);
    setEnableComments(true);
    SubtractionElectricityRef.current &&
      SubtractionElectricityRef.current.clear();
    SubtractionWaterRef.current && SubtractionWaterRef.current.clear();
  };

  const INITIAL_DATE = moment(new Date())
    .format('YYYY-MM-DD')
    .split('-')
    .reverse()
    .join('.');

  const reference = databaseFirebase(`homes/${homeIndex}/flats/${flatIndex}/`);

  // useFocusEffect(
  //   useCallback(() => {
  //     if (currentDataElectricity && currentDataWater) {
  //       console.log('useFocusEffect', currentDataElectricity, currentDataWater);
  //     }
  //   }, [currentDataElectricity, currentDataWater]),
  // );

  const _onPressSave = () => {
    if (connectionNet) {
      const result: IFlatCalculator = {
        id: preResultCalculatorFlat.id + Math.random().toString(16).slice(2),
        dateCalculator: INITIAL_DATE,
        currentDataElectricity: currentDataElectricity,
        currentDataWater: currentDataWater,
        preliminaryDataElectricity: preliminaryDataElectricity,
        preliminaryDataWater: preliminaryDataWater,
        resultElectricity: resultElectricity,
        messageElectricity: messageElectricity,
        electricityTariff: electricityTariff,
        multiplicationElectricity: multiplicationElectricity,
        resultWater: resultWater,
        messageWater: messageWater,
        waterTariff: waterTariff,
        multiplicationWater: multiplicationWater,
        resultInternet: resultInternet,
        garbageRemovalTariff: garbageRemovalTariff,
        resultAllUtilityPayments: resultAllUtilityPayments,
        resultRent: resultRent,
        resultOtherOptions: resultOtherOption,
        comments: comments,
        resultAllCalculate: resultAllCalculate,
        index: 0,
      };
      reference.update({calculatorFlat: [result, ...calculatorFlatStage]});
      modalDoneRef.current && modalDoneRef.current.toggleModal();
      app.storage.getHomesState().refreshHome();
    }
  };

  const massage = `
________________________________
              
              Доброго дня!
    Порахували комунальні:
    Електроенергія: ${resultElectricity} кВт
    ${messageElectricity}
    ${electricityTariff} грн за кВт
    ${resultElectricity} * ${electricityTariff} грн = ${multiplicationElectricity} грн 
     
    Вода: ${resultWater} куб.м
    ${messageWater}
    ${waterTariff} грн за куб.м
    ${resultWater} * ${waterTariff} грн = ${multiplicationWater} грн 
     
    Інтернет: ${resultInternet} грн
    Вивіз сміття: ${garbageRemovalTariff} грн
     
    Комунальні: ${resultAllUtilityPayments} грн
     
    Квартплата: ${resultRent} грн
    Додаткові послуги: ${resultOtherOption} грн
    Коментар: ${comments}\n
     
    Всього:  ${multiplicationElectricity} + ${multiplicationWater} + 
    ${resultInternet} + ${garbageRemovalTariff} + 
    ${resultRent} + ${resultOtherOption} = ${resultAllCalculate} грн\n 
________________________________\n`;

  return (
    <View style={style.container}>
      <AppHeader
        title={`Комунальні: ${resultAllUtilityPayments} грн`}
        progress={contentProgress}
        result={resultAllCalculate}
        textStyle={style.headerText}
        onSettingsPress={() =>
          app.navigationService.navigate(Screens._CALCULATOR_TARIFF_SETTING)
        }
      />
      <ContentProgressScrollView
        onProgressChange={progress => setContentProgress(progress)}>
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPress={_closeAllPopUps}>
          <TitleUniversal
            title={`Дім ${homeIndex + 1} Квартира ${flatIndex + 1}`}
          />
          <TitleUniversal title={Texts.ELECTRICITY} />
          <FlatSubtractionCalculator
            ref={SubtractionElectricityRef}
            unitOfMeasurement={Texts.KWT}
            preliminaryData={preResultCalculatorFlat.currentDataElectricity.toString()}
            onTextChange={(text: number) =>
              calculatorState.setResultElectricity(text)
            }
            onTextChangeMessage={(text: string) =>
              calculatorState.setMessageElectricity(text)
            }
            onChangeCurrentData={(text: number) =>
              setCurrentDataElectricity(text)
            }
            onChangePreliminaryData={(text: number) =>
              setPreliminaryDataElectricity(text)
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
          <FlatSubtractionCalculator
            ref={SubtractionWaterRef}
            unitOfMeasurement={Texts.KUBM}
            preliminaryData={preResultCalculatorFlat.currentDataWater.toString()}
            onTextChange={(text: number) =>
              calculatorState.setResultWater(text)
            }
            onTextChangeMessage={(text: string) =>
              calculatorState.setMessageWater(text)
            }
            onChangeCurrentData={(text: number) => setCurrentDataWater(text)}
            onChangePreliminaryData={(text: number) =>
              setPreliminaryDataWater(text)
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
            currentData={price}
            unitOfMeasurement={Texts.UHG}
            onTextChange={(text: string) =>
              settingAccountTariffState.setRentTariff(Number(text))
            }
          />
          <AdditionalTariffs
            nameTariff={Texts.GARBAGE_REMOVAL}
            currentData={garbageRemovalTariff}
            unitOfMeasurement={Texts.UHG}
            onTextChange={(text: string) =>
              settingAccountTariffState.setGarbageRemovalTariff(Number(text))
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
          <FunctionButtons
            massage={massage}
            onPressTrash={_onPressTrash}
            onSave={_onPressSave}
          />
        </TouchableOpacity>
        <View style={style.separator} />
      </ContentProgressScrollView>
      <ModalDoneScreen ref={modalDoneRef} />
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
  headerText: {
    fontSize: 12,
    color: Colors._007AFF,
  },

  separator: {
    height: 60,
  },
  modalWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
