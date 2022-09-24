import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from 'react-native';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {observer} from 'mobx-react';

import {Colors} from 'app/assets/constants/colors/Colors';
import {Screens} from 'app/assets/constants/codes/Screens';
import {IFlatCalculator} from 'app/data/storage/flat/flat.calculator.model';

import {FlatListItemView} from './FlatListItemView';
import {TrashIcon} from 'app/assets/Icons/TrashIcon';
import {DeleteModal} from '../modal/delete-modal/DeleteModal';
import {databaseFirebase} from 'app/services/firebase/firebase.database';

export interface IFlatListUtilityBillsScreenProps {}

export const FlatListUtilityBillsScreen = observer((props: any) => {
  const app: IAppCoreService = useAppInjection();

  const flatIndex = props.route.params && props.route.params.flatIndex;
  const homeIndex = props.route.params && props.route.params.homeIndex;
  const userId = props.route.params && props.route.params.userId;
  const dataStage: any = app.storage.getHomesState().getHomes()[homeIndex]
    .flats[flatIndex].calculatorFlat;

  const [contentProgress, setContentProgress] = useState<number>(0);
  const [calculatorFlatStage, setCalculatorFlatStage] =
    useState<IFlatCalculator[]>(dataStage);

  const [connectionNet, setConnectionNet] = useState<boolean | null>(
    app.storage.getHomesState().getConnectNetwork(),
  );

  const reference = databaseFirebase(
    `storage/users/${userId}/homes/${homeIndex}/flats/${flatIndex}/`,
  );
  const deleteItem = (index: number) => {
    let date = calculatorFlatStage;
    date.splice(index, 1);
    setCalculatorFlatStage(date);
    if (connectionNet) {
      reference.update({calculatorFlat: [...calculatorFlatStage]});
      app.storage.getHomesState().refreshHome();
    }
  };

  const _renderItem = ({
    item,
    index,
  }: {
    item: IFlatCalculator;
    index: number;
  }) => {
    const flatCalculator = item as IFlatCalculator;

    return (
      <View style={style.textWrapper}>
        <FlatListItemView item={flatCalculator} index={index} key={index} />
        <DeleteModal onDelete={() => deleteItem(index)} />
      </View>
    );
  };

  return (
    <View style={style.container}>
      <AppHeader
        title={`Комунальних послуг \n дім ${homeIndex} квартирa ${flatIndex}`}
        progress={contentProgress}
        textStyle={style.headerText}
        onSettingsPress={() =>
          app.navigationService.navigate(Screens._CALCULATOR_TARIFF_SETTING)
        }
      />
      <View style={style.textContainer}>
        <FlatList
          style={style.flatList}
          data={calculatorFlatStage}
          keyExtractor={item => item.id.toString()}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
});

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 12,
    color: Colors._007AFF,
  },
  textWrapper: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    borderColor: Colors._007AFF,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: Colors._000000,
  },
  flatList: {
    width: '100%',
    height: '85%',
  },
  buttonDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors._007AFF,
    borderRadius: 20,
    position: 'absolute',
    top: -70,
    right: 30,
    width: 50,
    height: 50,
    borderWidth: 1,
  },
});
