import {Screens} from 'app/assets/constants/codes/Screens';
import {Colors} from 'app/assets/constants/colors/Colors';

import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {databaseFirebase} from 'app/services/firebase/firebase.database';
import {UniversalButton} from 'app/ui/components/button/AppButton/UniversalButton';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {ContentProgressScrollView} from 'app/ui/components/Common/Scroll/ContentProgressScrollView';
import {observer} from 'mobx-react';
import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ModalDoneScreen} from '../modal/action-modal/ModalDone';
import {FlatBottomNavigatorBar} from './FlatBottomNavigatorBar';
import {FlatInfoView} from './FlatInfoView';
import {ImageFlat} from './ImageFlat';

export interface IFlatInfoScreenProps {
  flat?: IFlat;
}

export const FlatInfoScreen = observer((props: any) => {
  const app: IAppCoreService = useAppInjection();
  const modalDoneRef: any = useRef();
  const [flatStage, setFlatStage] = useState<IFlat>(
    props.route.params && props.route.params.flat,
  );
  const [flatNewStage, setFlatNevStage] = useState<IFlat>(
    props.route.params && props.route.params.flat,
  );
  const [contentProgress, setContentProgress] = useState<number>(0);
  const flatIndex = props.route.params && props.route.params.flatIndex;
  const homeIndex = props.route.params && props.route.params.homeIndex;

  const onPressList = () => {
    app.navigationService.navigate(Screens._FLAT_LIST_UTILITY_BILLS, {
      calculatorFlat: flatStage.calculatorFlat,
      flatIndex: flatIndex,
      homeIndex: homeIndex,
    });
  };
  const onPressCalculator = () => {
    app.navigationService.navigate(Screens._FLAT_CALCULATOR, {
      calculatorFlat: flatStage.calculatorFlat,
      flatIndex: flatIndex,
      homeIndex: homeIndex,
      price: flatStage.price,
    });
  };

  const reference = databaseFirebase(`homes/${homeIndex}/flats/${flatIndex}/`);

  const onPressSave = () => {
    reference.update({
      id: flatStage.id,
      title: flatStage.title,
      price: flatNewStage.price,
      area: flatNewStage.area,
      rooms: flatNewStage.rooms,
      dateSettlement: flatNewStage.dateSettlement,
      dateEviction: flatNewStage.dateEviction,
      description: flatNewStage.description,
      wifiName: flatNewStage.wifiName,
      wifiPassword: flatNewStage.wifiPassword,
      address: flatNewStage.address,
      occupant: flatNewStage.occupant,
      phoneOccupant: flatNewStage.phoneOccupant,
      emailOccupant: flatNewStage.emailOccupant,
      owner: flatNewStage.owner,
      ownerPhone: flatNewStage.ownerPhone,
      ownerEmail: flatNewStage.ownerEmail,
      floor: flatNewStage.floor,
    });
    app.storage.getHomesState().refreshHome();
    modalDoneRef.current && modalDoneRef.current.toggleModal();
  };

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
            onChangeFlat={(value: IFlat) => setFlatNevStage(value)}
          />
          <UniversalButton
            title={'Список комунальних розрахунків'}
            onPress={onPressList}
            containerStyle={[style.buttonContainer, {marginTop: 25}]}
          />
          <UniversalButton
            title={'Конкулятор комунальних послуг'}
            onPress={onPressCalculator}
            containerStyle={style.buttonContainer}
          />
          <UniversalButton
            title={'Зберегти всю інформацію'}
            containerStyle={style.buttonContainer}
            onPress={onPressSave}
          />
          <View style={{height: 40}} />
        </View>
      </ContentProgressScrollView>
      <FlatBottomNavigatorBar
        onPressList={onPressList}
        onPressCalculator={onPressCalculator}
      />
      <ModalDoneScreen ref={modalDoneRef} />
    </View>
  );
});

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
  modalWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
