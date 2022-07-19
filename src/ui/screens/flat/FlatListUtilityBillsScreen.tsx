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

export interface IFlatListUtilityBillsScreenProps {}

export const FlatListUtilityBillsScreen = observer((props: any) => {
  const app: IAppCoreService = useAppInjection();

  // const calculatorFlatStage: IFlatCalculator[] =
  //   props.route.params && props.route.params.calculatorFlat;
  const flatIndex = props.route.params && props.route.params.flatIndex;
  const homeIndex = props.route.params && props.route.params.homeIndex;

  const [contentProgress, setContentProgress] = useState<number>(0);

  // const flat =;
  // console.log('flat', flat);

  const calculatorFlatStage: any = app.storage.getHomesState().getHomes()[
    homeIndex
  ].flats[flatIndex].calculatorFlat;
  //const calculatorFlatStageRevers = calculatorFlatStage.reverse();
  //const calculatorFlatStageRevers = calculatorFlatStage.sort(() => -1);
  const _renderItem = ({
    item,
    index,
  }: {
    item: IFlatCalculator;
    index: number;
  }) => {
    const flatCalculator = item as IFlatCalculator;
    return <FlatListItemView item={flatCalculator} index={index} />;
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
          data={calculatorFlatStage}
          //inverted={true}
          key={homeIndex}
          keyExtractor={(item: IFlatCalculator, index) => item.index}
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
});
