import React, {forwardRef, useImperativeHandle, useState} from 'react';
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
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    if (isModalVisible) {
      setTimeout(() => {
        toggleModal();
      }, 1000);
    }
    const modalTester = () => {
      return (
        <Modal
          isVisible={isModalVisible}
          animationIn={'fadeIn'}
          animationOut={'fadeIn'}
          hideModalContentWhileAnimating
          backdropColor={Colors._FFFFFF}
          hasBackdrop>
          <View style={style.modalWrapper}>
            <DoneIcon />
          </View>
        </Modal>
      );
    };

    const copyToClipboard = () => {
      Clipboard.setString(props.message);
      toggleModal();
    };

    //    const fetchCopiedText = async () => {
    //      const text = await Clipboard.getString();
    //    };

    return (
      <View style={[style.container, props.containerStyle]}>
        <TouchableOpacity onPress={copyToClipboard}>
          <CopyButtonIcon />
        </TouchableOpacity>
        {modalTester()}
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
