import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {IAppCoreService} from '../../../../services/core/app.core.service.interface';
import {observer} from 'mobx-react';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {InputUniversal} from 'app/ui/components/input/app-input/InputUniversal';
import {Texts} from 'app/assets/constants/codes/Texts';

export interface SubtractionCalculatorProps {
  containerStyle?: StyleProp<ViewStyle>;
  onTextChange?: (text: string) => void;
}

export interface SubtractionCalculatorRef {
  clear: () => void;
}

export const SubtractionCalculator = observer(
  forwardRef((props: SubtractionCalculatorProps, ref) => {
    const app: IAppCoreService = useAppInjection();
    const [ectroPre, setEctroPre] = useState<string>('');
    const [ectroUntil, setEctroUntil] = useState<string>('');
    useImperativeHandle(ref, () => ({
      clear() {
        console.log('clear');
      },
    }));
    console.log('elecrtoPre', ectroPre);
    console.log('elecrto', ectroUntil);
    return (
      <View style={[style.container, props.containerStyle]}>
        <InputUniversal
          onTextChange={text => setEctroPre(text)}
          typeKeyboard={'numeric'}
          validateText={'numeric'}
          placeholderInput={Texts.CURRENT_DATA}
        />
        <InputUniversal
          onTextChange={text => setEctroUntil(text)}
          typeKeyboard={'numeric'}
          validateText={'numeric'}
          placeholderInput={Texts.PRELIMINARY_DATA}
        />
      </View>
    );
  }),
);

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
