import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle, Text} from 'react-native';

import {observer} from 'mobx-react';
import {EqualIcon} from 'app/assets/Icons/EqualIcon';
import {Colors} from 'app/assets/constants/colors/Colors';
import {InputUniversal} from 'app/ui/components/input/app-input/InputUniversal';
import {Texts} from 'app/assets/constants/codes/Texts';

export interface AdditionalTariffsProps {
  containerStyle?: StyleProp<ViewStyle>;
  nameTariff: string;
  currentData: number;
  unitOfMeasurement: string;
  onTextChange: (text: string) => void;
}

export interface AdditionalTariffsRef {
  clear: () => void;
}

export const AdditionalTariffs = observer(
  forwardRef((props: AdditionalTariffsProps, ref) => {
    // const app: IAppCoreService = useAppInjection();

    useImperativeHandle(ref, () => ({
      clear() {
        console.log('clear');
      },
    }));

    return (
      <View style={[style.container, props.containerStyle]}>
        <Text style={style.textTitle}>{props.nameTariff}</Text>
        <EqualIcon />
        <InputUniversal
          onTextChange={text => props.onTextChange && props.onTextChange(text)}
          typeKeyboard={'numeric'}
          validateText={'numeric'}
          placeholderInput={Texts.INTERNET}
          containerStyle={style.inputContainer}
          defaultValue={props.currentData.toString()}
        />
        <Text style={style.text}>{props.unitOfMeasurement}</Text>
      </View>
    );
  }),
);

const style = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textTitle: {
    textAlign: 'center',
    minHeight: 24,
    fontSize: 23,
    marginTop: -3,
    fontWeight: '500',
    paddingHorizontal: 5,
    color: Colors._808080,
  },
  text: {
    paddingTop: 2,
    textAlign: 'center',
    minHeight: 18,
    fontSize: 18,

    fontWeight: '500',
    paddingHorizontal: 5,
    color: Colors._007AFF,
  },
  inputContainer: {
    width: '30%',
  },
});
