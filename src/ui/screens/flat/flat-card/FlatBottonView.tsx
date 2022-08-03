import React from 'react';
import {observer} from 'mobx-react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {Screens} from 'app/assets/constants/codes/Screens';
import {ListIcon} from 'app/assets/Icons/ListIcon';
import {CalculatorIcon} from 'app/assets/Icons/CalculatorIcon';
import {Colors} from 'app/assets/constants/colors/Colors';
import {OpenIcon} from 'app/assets/Icons/OpenIcon';

export interface FlatBottomViewProps {
  flat: IFlat;
  index: number;
  homeIndex: number;
  flatIndex: number;
}

export const FlatBottomView = observer(
  ({flat, index, homeIndex, flatIndex}: FlatBottomViewProps) => {
    const app: IAppCoreService = useAppInjection();
    const reversCalculatorFlat = flat.calculatorFlat;
    const onPressList = () => {
      app.navigationService.navigate(Screens._FLAT_LIST_UTILITY_BILLS, {
        calculatorFlat: flat.calculatorFlat,
        flatIndex: flatIndex,
        homeIndex: homeIndex,
      });
    };
    const onPressCalculator = () => {
      app.navigationService.navigate(Screens._FLAT_CALCULATOR, {
        calculatorFlat: flat.calculatorFlat,
        flatIndex: flatIndex,
        homeIndex: homeIndex,
        price: flat.price,
      });
    };

    return (
      <View style={FlatBottomViewStyle.container}>
        <TouchableOpacity
          onPress={onPressList}
          activeOpacity={0.5}
          style={FlatBottomViewStyle.buttonWrapper}>
          <ListIcon />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPressCalculator}
          // onLongPress={props.onLongPress}
          activeOpacity={0.5}
          style={FlatBottomViewStyle.buttonWrapper}>
          <CalculatorIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            FlatBottomViewStyle.buttonWrapper,
            {backgroundColor: Colors._007AFF},
          ]}
          activeOpacity={0.7}
          onPress={() =>
            app.navigationService.navigate(Screens._FLAT_INFO, {
              flat: flat,
              homeIndex: homeIndex,
              flatIndex: flatIndex,
            })
          }>
          <OpenIcon color={Colors._FFFFFF} />
        </TouchableOpacity>
      </View>
    );
  },
);

const FlatBottomViewStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 0,
    paddingHorizontal: '5%',
  },
  card: {},
  buttonWrapper: {
    borderWidth: 2,
    borderColor: Colors._007AFF,
    borderRadius: 50,
    paddingTop: 10,
    paddingBottom: 10,
    height: 50,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
