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
import {Texts} from 'app/assets/constants/codes/Texts';
import {ContentProgressScrollView} from 'app/ui/components/Common/Scroll/ContentProgressScrollView';
import {observer} from 'mobx-react';
import {financialFixed} from 'app/utils/comparator';
import {Colors} from 'app/assets/constants/colors/Colors';
import {Screens} from 'app/assets/constants/codes/Screens';
import {IFlatCalculator} from 'app/data/storage/flat/flat.calculator.model';
import {FeedList} from 'app/ui/components/Common/feed/FeedList';
import {FlatListItemView} from './FlatListItemView';

export interface IFlatListUtilityBillsScreenProps {}

export const FlatListUtilityBillsScreen = observer((props: any) => {
  const app: IAppCoreService = useAppInjection();

  const calculatorFlatStage: IFlatCalculator[] =
    props.route.params && props.route.params.calculatorFlat;
  const flatIndex = props.route.params && props.route.params.flatIndex + 1;
  const homeIndex = props.route.params && props.route.params.homeIndex + 1;

  const [contentProgress, setContentProgress] = useState<number>(0);

  const calculatorFlatStageRevers = calculatorFlatStage.reverse();
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
          data={calculatorFlatStageRevers}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
});

const style = StyleSheet.create({
  container: {
    height: '80%',
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
