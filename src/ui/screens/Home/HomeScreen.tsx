import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

import {Screens} from 'app/assets/constants/codes/Screens';
import {Texts} from 'app/assets/constants/codes/Texts';
import {useAppInjection} from 'app/data/ioc/inversify.config';

import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {ContentProgressScrollView} from 'app/ui/components/Common/Scroll/ContentProgressScrollView';
import {HomePageCharts} from 'app/ui/screens/Home/HomePageCharts';
import {ElementItem} from 'app/ui/components/Main/ScreenView/ElemetItemHome';
import {Type} from 'app/assets/constants/codes/Type';
import {Colors} from 'app/assets/constants/colors/Colors';
import {AsyncStorageFacade, AsyncStorageKey} from 'app/data/async-storege';
import {firebase} from '@react-native-firebase/database';

export const MainScreen = (props: any) => {
  const app: IAppCoreService = useAppInjection();
  const reference = firebase
    .app()
    .database('https://komunalka-home-default-rtdb.firebaseio.com/')
    .ref('/homes');
  const [contentProgress, setContentProgress] = useState<number>(0);
  const [homeStage, setHomeStage] = useState([
    {
      id: 'homeRed',
      title: 'Home Red',
      flats: [
        {
          id: 'homeRedFlat1',
          title: 'Квартира №1',
          price: 6500,
          area: '55',
          rooms: '2',
          images: [
            {
              url: 'https://komunalka-home-default-rtdb.firebaseio.com/home/homeRed/homeRedFlat1/image',
            },
            {
              url: 'https://komunalka-home-default-rtdb.firebaseio.com/home/homeRed/homeRedFlat1/image',
            },
          ],
          calculatorFlat: [
            {
              id: 'homeRedFlat1Calculator',
              dateCalculator: '2020-01-01',
              currentDataElectricity: 566,
              currentDataWater: 666,
              preliminaryDataElectricity: 655,
              preliminaryDataWater: 666,
              resultElectricity: 566,
              messageElectricity: 'Прибыло за месяц',
              electricityTariff: 23,
              multiplicationElectricity: 1.5,
              resultWater: 666,
              messageWater: 'Прибыло за месяц',
              waterTariff: 23,
              multiplicationWater: 1.5,
              resultInternet: 666,
              garbageRemovalTariff: 23,
              resultAllUtilityPayments: 666,
              resultRent: 666,
              resultOtherOptions: 666,
              comments: 'Комментарий',
              resultAllCalculate: 4555,
            },
            {
              id: 'homeRedFlat1Calculator11',
              dateCalculator: '2020-02-01',
              currentDataElectricity: 566,
              currentDataWater: 666,
              preliminaryDataElectricity: 655,
              preliminaryDataWater: 666,
              resultElectricity: 566,
              messageElectricity: 'Прибыло за месяц',
              electricityTariff: 23,
              multiplicationElectricity: 1.5,
              resultWater: 666,
              messageWater: 'Прибыло за месяц',
              waterTariff: 23,
              multiplicationWater: 1.5,
              resultInternet: 666,
              garbageRemovalTariff: 23,
              resultAllUtilityPayments: 666,
              resultRent: 666,
              resultOtherOptions: 666,
              comments: 'Комментарий',
              resultAllCalculate: 4555,
            },
          ],

          dateSettlement: '01.01.2020',
          dateEviction: '02.02.2020',
          description: 'Home Red Flat 1 description',
          wifiName: 'Home Red Flat 1 wifi name',
          wifiPassword: 'Home Red Flat 1 wifi password',
          address: 'Home Red Flat 1 address',
          occupant: 'Home Red Flat 1 occupant',
          phoneOccupant: 'Home Red Flat 1 phone',
          emailOccupant: 'Home Red Flat 1 email',
          owner: 'Home Red Flat 1 owner',
          ownerPhone: 'Home Red Flat 1 ownerPhone',
          ownerEmail: 'Home Red Flat 1 ownerEmail',
        },
        {id: 'homeRedFlat2'},
        {id: 'homeRedFlat3'},
        {id: 'homeRedFlat4'},
        {id: 'homeRedFlat5'},
      ],
    },
    {
      id: 'homeWhit',
      title: 'Home White',
      flats: [
        {id: 'homeWhitFlat1'},
        {id: 'homeWhitFlat2'},
        {id: 'homeWhitFlat3'},
        {id: 'homeWhitFlat4'},
        {id: 'homeWhitFlat5'},
        {id: 'homeWhitFlat6'},
        {id: 'homeWhitFlat7'},
      ],
    },
  ]);
  const setRenderedAuthStore = async (code: boolean) => {
    await AsyncStorageFacade.saveBoolean(
      AsyncStorageKey.RenderedAuthStore,
      code,
    );
  };

  return (
    <View style={style.container}>
      <AppHeader
        leftButtonDisabled
        title={Texts.HOME}
        onSettingsPress={() =>
          app.navigationService.navigate(Screens._ACCOUNT_SETTING)
        }
      />

      <ContentProgressScrollView
        onProgressChange={progress => setContentProgress(progress)}>
        <HomePageCharts />
        <ElementItem
          title={homeStage[0].title}
          titleButton={Texts.OPEN}
          description={Texts.OPEN}
          onPress={() => {
            //reference.set(homeStage).then(() => console.log('Data set.'));
          }}
        />
        <ElementItem
          title={homeStage[1].title}
          titleButton={Texts.OPEN}
          description={Texts.OPEN}
        />
        <ElementItem
          title={Type.CALCULATOR}
          titleButton={Texts.OPEN}
          description={Texts.OPEN}
          onPress={() => {
            setRenderedAuthStore(false);
            app.navigationService.navigate(Screens._CALCULATOR);
          }}
        />
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
