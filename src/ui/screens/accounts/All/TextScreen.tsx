import {useTheme} from '@react-navigation/native';
import {Type} from 'app/assets/constants/codes/Type';
import {Colors} from 'app/assets/constants/colors/Colors';
import {CalculatorIcon} from 'app/assets/Icons/CalculatorIcon';
import {HomeIcon} from 'app/assets/Icons/HomeIcon';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {UniversalButton} from 'app/ui/components/button/AppButton/UniversalButton';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export interface ITestProps {
  onPress?: () => void;
  title: string;
  type: string;
  description?: string;
  titleButton: string;
  address: string;
  imageHome: string;
}

export const TestScreen = (props: ITestProps) => {
  const app: IAppCoreService = useAppInjection();
  const {colors} = useTheme();

  console.log('imageBroken', props.imageHome);
  return (
    <View
      style={{
        height: 90,
        width: '40%',
      }}></View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
