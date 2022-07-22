import {Colors} from 'app/assets/constants/colors/Colors';
import {DoneIcon} from 'app/assets/Icons/DoneIcon';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal/dist/modal';

export const ModalDoneScreen = forwardRef((props: any, ref) => {
  useImperativeHandle(ref, () => ({
    toggleModal() {
      return _toggleModal();
    },
  }));
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const _toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //const modalDoneRef: any = useRef();
  //modalDoneRef.current && modalDoneRef.current.toggleModal();
  //    <ModalDoneScreen ref={modalDoneRef} />;

  if (isModalVisible) {
    setTimeout(() => {
      _toggleModal();
    }, 1000);
  }
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
});

const style = StyleSheet.create({
  container: {},
  modalWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
