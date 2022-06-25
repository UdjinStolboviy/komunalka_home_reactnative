import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle, Text} from 'react-native';

import {observer} from 'mobx-react';

import {InputUniversal} from 'app/ui/components/input/app-input/InputUniversal';
import {Texts} from 'app/assets/constants/codes/Texts';
import {Subtraction} from 'app/assets/Icons/SubtractionIcon';
import {Colors} from 'app/assets/constants/colors/Colors';
import {MultiplicationIcon} from 'app/assets/Icons/MultiplicationIcon';

export interface MultiplicationCalculatorProps {
  containerStyle?: StyleProp<ViewStyle>;
  onTextChange: (text: number) => void;
  unitOfMeasurement?: string;
  currentData?: number;
  tariffData?: number;
}

export interface MultiplicationCalculatorRef {
  clear: () => void;
}

export const MultiplicationCalculator = observer(
  forwardRef((props: MultiplicationCalculatorProps, ref) => {
    // const app: IAppCoreService = useAppInjection();

    useImperativeHandle(ref, () => ({
      clear() {
        console.log('clear');
      },
    }));

    const _calculateProgress = () => {
      const result = Number(props.currentData) * Number(props.tariffData);
      if (isNaN(result)) {
        return 0;
      }
      props.onTextChange && props.onTextChange(result);
      return result;
    };
    return (
      <View style={[style.container, props.containerStyle]}>
        <View style={style.calculationWrapper}>
          <Text style={style.validNumberText}>
            {props.currentData ? Number(props.currentData) : 0}
          </Text>
          <Text style={style.validNumberText}>{props.unitOfMeasurement}</Text>
          <MultiplicationIcon />
          <Text style={style.validNumberText}>
            {props.tariffData ? Number(props.tariffData) : 0}
          </Text>

          <Text style={style.validNumberText}>{Texts.UHG}</Text>
          <View style={style.calculationIcon}>
            <Subtraction />
            <Subtraction />
          </View>
          <Text style={style.validNumberText}>{_calculateProgress()}</Text>
          <Text style={style.validNumberText}>{Texts.UHG}</Text>
        </View>
      </View>
    );
  }),
);

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    alignItems: 'center',
    width: '100%',
  },

  calculationWrapper: {
    marginTop: 20,
    flexDirection: 'row',
  },
  calculationIcon: {
    marginTop: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 15,
    width: '10%',
  },
  validNumberText: {
    paddingTop: 2,
    textAlign: 'center',
    minHeight: 18,
    fontSize: 18,
    marginTop: -3,
    fontWeight: '500',
    paddingHorizontal: 5,
    color: Colors._007AFF,
  },
});
