import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle, Text} from 'react-native';

import {observer} from 'mobx-react';

import {Texts} from 'app/assets/constants/codes/Texts';

import {Colors} from 'app/assets/constants/colors/Colors';
import {MultiplicationIcon} from 'app/assets/Icons/MultiplicationIcon';
import {EqualIcon} from 'app/assets/Icons/EqualIcon';

export interface MultiplicationCalculatorProps {
  containerStyle?: StyleProp<ViewStyle>;
  onTextChange?: (text: number) => void;
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
      const result: number =
        Number(props.currentData) * Number(props.tariffData);
      if (!result && isNaN(result)) {
        return 0;
      }
      props.onTextChange && props.onTextChange(Number(result.toFixed(2)));
      return Number(result.toFixed(2));
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
          <EqualIcon />
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
