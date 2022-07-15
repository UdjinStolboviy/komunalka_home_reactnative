import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {observer} from 'mobx-react';
import {CopyButtonIcon} from 'app/assets/Icons/CopyButtonIcon';
import Clipboard from '@react-native-clipboard/clipboard';
import {Colors} from 'app/assets/constants/colors/Colors';
import {DoneIcon} from 'app/assets/Icons/DoneIcon';
import {ModalDoneScreen} from '../../modal/action-modal/ModalDone';

export interface CopyButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  message: string;
}

export interface CopyButtonRef {
  clear: () => void;
}

export const CopyButton = observer(
  forwardRef((props: CopyButtonProps, ref) => {
    useImperativeHandle(ref, () => ({
      clear() {
        console.log('clear');
      },
    }));
    const modalDoneRef: any = useRef();

    const copyToClipboard = () => {
      Clipboard.setString(props.message);
      modalDoneRef.current && modalDoneRef.current.toggleModal();
    };

    return (
      <View style={[style.container, props.containerStyle]}>
        <TouchableOpacity onPress={copyToClipboard}>
          <CopyButtonIcon />
        </TouchableOpacity>
        <ModalDoneScreen ref={modalDoneRef} />
      </View>
    );
  }),
);

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
