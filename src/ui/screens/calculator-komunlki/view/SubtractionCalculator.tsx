import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle, Text} from 'react-native';

import {observer} from 'mobx-react';

import {InputUniversal} from 'app/ui/components/input/app-input/InputUniversal';
import {Texts} from 'app/assets/constants/codes/Texts';
import {SubtractionIcon} from 'app/assets/Icons/SubtractionIcon';
import {Colors} from 'app/assets/constants/colors/Colors';
import {EqualIcon} from 'app/assets/Icons/EqualIcon';
import {financialFixed} from 'app/utils/comparator';

export interface SubtractionCalculatorProps {
  containerStyle?: StyleProp<ViewStyle>;
  onTextChange: (text: number) => void;
  unitOfMeasurement?: string;
  onTextChangeMessage?: (text: string) => void;
}

export interface SubtractionCalculatorRef {
  clear: () => void;
}

export const SubtractionCalculator = observer(
  forwardRef((props: SubtractionCalculatorProps, ref) => {
    const [currentData, setCurrentData] = useState<string>('');
    const [preliminaryData, setPreliminaryData] = useState<string>('');
    useImperativeHandle(ref, () => ({
      clear() {
        console.log('clear');
      },
    }));

    const _calculateProgress = () => {
      const result = Number(currentData) - Number(preliminaryData);
      if (isNaN(result)) {
        return null;
      }
      const resultString = `${currentData} - ${preliminaryData} = ${result} ${props.unitOfMeasurement} \n`;
      props.onTextChange && props.onTextChange(Number(financialFixed(result)));
      props.onTextChangeMessage &&
        props.onTextChangeMessage(resultString.toString());
      return Number(financialFixed(result));
    };
    return (
      <View style={[style.container, props.containerStyle]}>
        <InputUniversal
          onTextChange={text => setCurrentData(text)}
          typeKeyboard={'numeric'}
          validateText={'numeric'}
          placeholderInput={Texts.CURRENT_DATA}
          containerStyle={style.inputContainer}
        />
        <View style={style.wrapperIcon}>
          <SubtractionIcon />
        </View>

        <InputUniversal
          onTextChange={text => setPreliminaryData(text)}
          typeKeyboard={'numeric'}
          validateText={'numeric'}
          placeholderInput={Texts.PRELIMINARY_DATA}
        />
        <View style={style.calculationWrapper}>
          <EqualIcon />
          <Text style={style.validNumberText}>{_calculateProgress()}</Text>
          <Text style={style.validNumberText}>{props.unitOfMeasurement}</Text>
        </View>
      </View>
    );
  }),
);

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: '100%',
  },
  wrapperIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 30,
  },
  calculationWrapper: {
    marginTop: 20,
    flexDirection: 'row',
  },

  inputContainer: {
    width: '100%',
  },
  validNumberText: {
    textAlign: 'center',
    minHeight: 18,
    fontSize: 18,
    marginTop: -3,
    fontWeight: '500',
    paddingHorizontal: 10,
    color: Colors._007AFF,
  },
});
