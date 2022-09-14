import {Colors} from 'app/assets/constants/colors/Colors';
import {TrashIcon} from 'app/assets/Icons/TrashIcon';
import {IconButtonUniversal} from 'app/ui/components/button/AppButton/IconButtonUniversal';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';

interface IAddModalProps {
  visible?: boolean;
  onAdd: () => void;
}

export const AddModal = forwardRef((props: IAddModalProps, ref) => {
  useImperativeHandle(ref, () => ({
    toggleModal() {
      return _toggleModal();
    },
  }));
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const _toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onAddPress = () => {
    props.onAdd();
    setModalVisible(false);
  };
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}>
      <View style={style.contentModal}>
        <Text style={style.textTitle}>Ви хочете додати новий елемент</Text>
        <View style={style.buttonWrapper}>
          <TouchableOpacity style={style.buttonNot} onPress={_toggleModal}>
            <Text style={style.textNot}>Ні</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.buttonYes} onPress={onAddPress}>
            <Text style={style.textYes}>Так</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

const style = StyleSheet.create({
  contentModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
    color: Colors._007AFF,
  },
  buttonYes: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors._248900,
  },
  textYes: {
    fontSize: 30,
    color: Colors._248900,
  },
  buttonNot: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    borderRadius: 5,
    marginRight: 50,
    borderWidth: 1,
    borderColor: Colors._F63535,
  },
  textNot: {
    fontSize: 30,
    color: Colors._F63535,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
});
