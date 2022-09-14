import {Type} from 'app/assets/constants/codes/Type';
import {Colors} from 'app/assets/constants/colors/Colors';
import AddBigIcon from 'app/assets/Icons/AddBigIcon';
import {CalculatorIcon} from 'app/assets/Icons/CalculatorIcon';
import {HomeIcon} from 'app/assets/Icons/HomeIcon';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {IHome} from 'app/data/storage/home/home.model';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {databaseFirebase} from 'app/services/firebase/firebase.database';
import {UniversalButton} from 'app/ui/components/button/AppButton/UniversalButton';
import {flatNew, homeNew} from 'app/utils/dade.const';
import {observer} from 'mobx-react';
import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ModalDoneScreen} from '../modal/action-modal/ModalDone';
import {AddModal} from '../modal/add-modal/AddModal';

export interface IAddFlatProps {
  flats: IFlat[];
  homeId: number;
  userId: string;
  onRefresh: () => void;
}

export const AddFlat = observer((props: IAddFlatProps) => {
  const app: IAppCoreService = useAppInjection();
  const modalDoneRef: any = useRef();
  const modalAddRef: any = useRef();
  const [connectionNet, setConnectionNet] = useState<boolean | null>(
    app.storage.getHomesState().getConnectNetwork(),
  );
  const reference = databaseFirebase(
    `storage/users/${props.userId}/homes/${props.homeId}/`,
  );

  const showModalAdd = () => {
    modalAddRef.current && modalAddRef.current.toggleModal();
  };

  const addFlat = () => {
    const newFlat = flatNew(props.flats.length + 1);
    if (app.storage.getHomesState().getConnectNetwork()) {
      reference.update({flats: [...props.flats, newFlat]});
      //app.storage.getHomesState().refreshHome();
      props.onRefresh && props.onRefresh();
    }
    //modalDoneRef.current && modalDoneRef.current.toggleModal();
  };

  return (
    <TouchableOpacity style={style.container} onPress={showModalAdd}>
      <AddBigIcon />
      <View style={style.middleWrapper}>
        <Text numberOfLines={2} style={style.mainText}>
          Додати нову квартиру
        </Text>
        <Text numberOfLines={4} style={style.descriptionText}>
          Ви можете додати ще квартиру до цього списку та вибрати одину з них
        </Text>
      </View>
      <ModalDoneScreen ref={modalDoneRef} />
      <AddModal ref={modalAddRef} onAdd={() => addFlat()} />
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
