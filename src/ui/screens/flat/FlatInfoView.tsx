import {Colors} from 'app/assets/constants/colors/Colors';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {UniversalButton} from 'app/ui/components/button/AppButton/UniversalButton';
import {uid} from 'app/utils/id-random';
import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {StyleProp, View, ViewStyle, StyleSheet, Text} from 'react-native';
import {DateFlatView} from './DateFlatView';
import {TitleFlatView} from './TitelFlatView';

export interface FlatInfoViewProps {
  containerStyle?: StyleProp<ViewStyle>;
  flat: IFlat;
  isAdmin: boolean;
  flatIndex: number;
  homeIndex: number;
  onChangeFlat?: (value: IFlat) => void;
}

export const FlatInfoView = observer((props: FlatInfoViewProps) => {
  const {flat, isAdmin, flatIndex, homeIndex} = props;
  const [floorText, setFloorText] = useState<number>(flat.floor);
  const [areaText, setAreaText] = useState<number>(flat.area);
  const [price, setPrice] = useState<number>(flat.price);
  const [rooms, setRooms] = useState<number>(flat.rooms);
  const [addressText, setAddressText] = useState<string>(flat.address);
  const [dateSettlement, setDateSettlement] = useState<string>(
    flat.dateSettlement,
  );
  const [dateEviction, setDateEviction] = useState<string>(flat.dateEviction);
  const [description, setDescription] = useState<string>(flat.description);
  const [emailOccupant, setEmailOccupant] = useState<string>(
    flat.emailOccupant,
  );
  const [occupant, setOccupant] = useState<string>(flat.occupant);
  const [phoneOccupant, setPhoneOccupant] = useState<string>(
    flat.phoneOccupant,
  );
  const [owner, setOwner] = useState<string>(flat.owner);
  const [ownerPhone, setOwnerPhone] = useState<string>(flat.ownerPhone);
  const [ownerEmail, setOwnerEmail] = useState<string>(flat.ownerEmail);
  const [wifiName, setWifiName] = useState<string>(flat.wifiName);
  const [wifiPassword, setWifiPassword] = useState<string>(flat.wifiPassword);

  useEffect(() => {
    return (
      props.onChangeFlat &&
      props.onChangeFlat({
        id: uid(),
        title: flat.title,
        price: price,
        area: areaText,
        rooms: rooms,
        dateSettlement: dateSettlement,
        dateEviction: dateEviction,
        description: description,
        emailOccupant: emailOccupant,
        occupant: occupant,
        phoneOccupant: phoneOccupant,
        owner: owner,
        ownerPhone: ownerPhone,
        ownerEmail: ownerEmail,
        wifiName: wifiName,
        wifiPassword: wifiPassword,
        address: addressText,
        floor: floorText,
        index: flatIndex,
        calculatorFlat: flat.calculatorFlat,
        images: flat.images,
      })
    );
  }, [
    floorText,
    areaText,
    price,
    rooms,
    addressText,
    dateSettlement,
    dateEviction,
    description,
    emailOccupant,
    occupant,
    phoneOccupant,
    owner,
    ownerPhone,
    ownerEmail,
    wifiName,
    wifiPassword,
  ]);
  return (
    <View style={[style.container, props.containerStyle]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={style.headerText}>Інформація</Text>
      </View>
      <DateFlatView
        isAdmin={props.isAdmin}
        title={'Дата заселення'}
        description={dateSettlement}
        onChange={text => setDateSettlement(text)}
      />
      <DateFlatView
        isAdmin={props.isAdmin}
        title={'Дата виселення'}
        description={dateEviction}
        onChange={text => setDateEviction(text)}
      />
      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Ціна оренди за місяць'}
        description={price}
        onChange={text => setPrice(Number(text))}
      />
      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Кількість кімнат'}
        description={rooms}
        onChange={text => setRooms(Number(text))}
      />
      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Поверх'}
        description={floorText}
        onChange={text => setFloorText(Number(text))}
      />
      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Площя m2'}
        description={areaText}
        onChange={text => setAreaText(Number(text))}
      />
      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Імя WiFi'}
        description={wifiName}
        onChange={text => setWifiName(text)}
      />
      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Пароль WiFi'}
        description={wifiPassword}
        onChange={text => setWifiPassword(text)}
      />
      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Адреса'}
        description={addressText}
        onChange={text => setAddressText(text)}
      />
      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Додаткова інформація'}
        description={description}
        onChange={text => setDescription(text)}
      />
      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Oрендарь'}
        description={occupant}
        onChange={text => setOccupant(text)}
      />
      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Електрона адреса орендаря'}
        description={emailOccupant}
        onChange={text => setEmailOccupant(text)}
      />
      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Телефон орендаря'}
        description={phoneOccupant}
        onChange={text => setPhoneOccupant(text)}
      />
      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Власник квартири'}
        description={owner}
        onChange={text => setOwner(text)}
      />
      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Телефон власника'}
        description={ownerPhone}
        onChange={text => setOwnerPhone(text)}
      />
      <TitleFlatView
        isAdmin={props.isAdmin}
        title={'Електрона адреса власника'}
        description={ownerEmail}
        onChange={text => setOwnerEmail(text)}
      />
    </View>
  );
});

const style = StyleSheet.create({
  container: {
    width: '100%',
  },
  headerText: {
    fontWeight: '500',
    fontSize: 20,
    color: Colors._007AFF_A_7,
  },
});
