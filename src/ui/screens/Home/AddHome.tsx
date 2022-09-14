import {Type} from 'app/assets/constants/codes/Type';
import {Colors} from 'app/assets/constants/colors/Colors';
import AddBigIcon from 'app/assets/Icons/AddBigIcon';
import {CalculatorIcon} from 'app/assets/Icons/CalculatorIcon';
import {HomeIcon} from 'app/assets/Icons/HomeIcon';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IHome} from 'app/data/storage/home/home.model';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {databaseFirebase} from 'app/services/firebase/firebase.database';
import {UniversalButton} from 'app/ui/components/button/AppButton/UniversalButton';
import {homeNew} from 'app/utils/dade.const';
import {observer} from 'mobx-react';
import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ModalDoneScreen} from '../modal/action-modal/ModalDone';
import {AddModal} from '../modal/add-modal/AddModal';

export interface IAddHomeProps {
  homes: IHome[];
  userId: string;
}

export const AddHome = observer((props: IAddHomeProps) => {
  const app: IAppCoreService = useAppInjection();
  const modalDoneRef: any = useRef();
  const modalAddRef: any = useRef();
  const [connectionNet, setConnectionNet] = useState<boolean | null>(
    app.storage.getHomesState().getConnectNetwork(),
  );
  const reference = databaseFirebase(`storage/users/${props.userId}/`);

  const showModalAdd = () => {
    modalAddRef.current && modalAddRef.current.toggleModal();
  };

  const addHome = () => {
    const newHome = homeNew(props.homes.length + 1);

    if (app.storage.getHomesState().getConnectNetwork()) {
      reference.update({homes: [...props.homes, newHome]});
      app.storage.getHomesState().refreshHome();
    }
    //modalDoneRef.current && modalDoneRef.current.toggleModal();
  };

  return (
    <TouchableOpacity style={style.container} onPress={showModalAdd}>
      <AddBigIcon />
      <View style={style.middleWrapper}>
        <Text numberOfLines={2} style={style.mainText}>
          Додати новий будинок
        </Text>
        <Text numberOfLines={4} style={style.descriptionText}>
          Ви можете додати ще будинки до цього списку та вибрати один з них
        </Text>
      </View>
      <ModalDoneScreen ref={modalDoneRef} />
      <AddModal ref={modalAddRef} onAdd={() => addHome()} />
    </TouchableOpacity>
  );
});

const style = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,

    borderColor: Colors._007AFF,
    borderRadius: 30,
    marginHorizontal: '5%',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '0%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  middleWrapper: {
    position: 'absolute',
    height: 100,
    width: '70%',
    left: '25%',
    justifyContent: 'center',
  },
  mainText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors._007AFF,
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    color: Colors._979797,
  },
  containerButton: {
    width: '35%',
    marginHorizontal: 10,
  },
});
