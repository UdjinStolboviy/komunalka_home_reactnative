import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle, Text} from 'react-native';

import {observer} from 'mobx-react';
import {SharingButton} from './SharingButton';
import {CopyButton} from './CopyButton';

export interface FunctionButtonsProps {
  containerStyle?: StyleProp<ViewStyle>;
  massage: string;
}

export interface FunctionButtonsRef {
  clear: () => void;
}

export const FunctionButtons = observer(
  forwardRef((props: FunctionButtonsProps, ref) => {
    // const app: IAppCoreService = useAppInjection();

    useImperativeHandle(ref, () => ({
      clear() {
        console.log('clear');
      },
    }));

    return (
      <View style={[style.container, props.containerStyle]}>
        <SharingButton message={props.massage} />
        <CopyButton message={props.massage} />
      </View>
    );
  }),
);

const style = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 50,
  },
});
