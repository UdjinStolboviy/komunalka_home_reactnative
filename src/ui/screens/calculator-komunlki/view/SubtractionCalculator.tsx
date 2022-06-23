import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {IAppCoreService} from '../../../../services/core/app.core.service.interface';
import {observer} from 'mobx-react';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {InputUniversal} from 'app/ui/components/input/app-input/InputUniversal';
import {Texts} from 'app/assets/constants/codes/Texts';
import {Subtraction} from 'app/assets/Icons/SubtractionIcon';

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
    const [currentData, setCurrentData] = useState<string>('');
    const [preliminaryData, setPreliminaryData] = useState<string>('');
    useImperativeHandle(ref, () => ({
      clear() {
        console.log('clear');
      },
    }));
    console.log('elecrtoPre', currentData);
    console.log('elecrto', preliminaryData);
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
          <Subtraction />
        </View>

        <InputUniversal
          onTextChange={text => setPreliminaryData(text)}
          typeKeyboard={'numeric'}
          validateText={'numeric'}
          placeholderInput={Texts.PRELIMINARY_DATA}
        />
        <View style={style.calculationWrapper}>
          <View style={style.calculationIcon}>
            <Subtraction />
            <Subtraction />
          </View>
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
  calculationIcon: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 20,
    width: '10%',
  },
  inputContainer: {
    width: '100%',
  },
});
