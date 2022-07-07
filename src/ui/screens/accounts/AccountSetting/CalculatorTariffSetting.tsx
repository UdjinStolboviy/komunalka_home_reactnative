import {Texts} from 'app/assets/constants/codes/Texts';
import {Colors} from 'app/assets/constants/colors/Colors';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {observer} from 'mobx-react';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Keyboard} from 'react-native';
import {AdditionalTariffs} from '../../calculator-komunlki/view/AdditionalTariffs';

export const CalculatorTariffSetting = observer((props: any) => {
  const app: IAppCoreService = useAppInjection();
  const settingAccountTariffState = app.storage.getSettingAccountTariffState();
  const resultInternet = settingAccountTariffState.getInternetTariff();
  const resultRent = settingAccountTariffState.getRentTariff();
  const electricityTariff = settingAccountTariffState.getElectricityTariff();
  const waterTariff = settingAccountTariffState.getWaterTariff();
  const garbageRemovalTariff =
    settingAccountTariffState.getGarbageRemovalTariff();

  const _closeAllPopUps = () => {
    Keyboard.dismiss();
  };
  return (
    <View style={style.container}>
      <AppHeader title={Texts.UTILITY_TARIFFS} settingsDisabled />
      <TouchableOpacity
        style={{flex: 1}}
        activeOpacity={1}
        onPress={_closeAllPopUps}>
        <AdditionalTariffs
          notDisabledEqual
          nameTariff={Texts.INTERNET}
          currentData={resultInternet}
          unitOfMeasurement={Texts.UHG}
          onTextChange={(text: string) =>
            settingAccountTariffState.setInternetTariff(Number(text))
          }
        />
        <AdditionalTariffs
          notDisabledEqual
          nameTariff={Texts.RENT}
          currentData={resultRent}
          unitOfMeasurement={Texts.UHG}
          onTextChange={(text: string) =>
            settingAccountTariffState.setRentTariff(Number(text))
          }
        />
        <AdditionalTariffs
          notDisabledEqual
          nameTariff={Texts.WATER}
          currentData={waterTariff}
          unitOfMeasurement={Texts.UHG + '/' + Texts.KUBM}
          onTextChange={(text: string) =>
            settingAccountTariffState.setWaterTariff(Number(text))
          }
        />
        <AdditionalTariffs
          notDisabledEqual
          nameTariff={Texts.ELECTRICITY}
          currentData={electricityTariff}
          unitOfMeasurement={Texts.UHG + '/' + Texts.KWT}
          onTextChange={(text: string) =>
            settingAccountTariffState.setElectricityTariff(Number(text))
          }
        />

        <AdditionalTariffs
          notDisabledEqual
          nameTariff={Texts.GARBAGE_REMOVAL}
          currentData={garbageRemovalTariff}
          unitOfMeasurement={Texts.UHG}
          onTextChange={(text: string) =>
            settingAccountTariffState.setGarbageRemovalTariff(Number(text))
          }
        />
      </TouchableOpacity>
    </View>
  );
});

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors._FFFFFF,
  },
});
