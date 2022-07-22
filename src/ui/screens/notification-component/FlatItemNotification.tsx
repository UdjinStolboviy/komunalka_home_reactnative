import {Colors} from 'app/assets/constants/colors/Colors';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {checkIfStateModificationsAreAllowed} from 'mobx/dist/internal';
import moment from 'moment';

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import NotificationCalendarView from '../notification-component/NotificationCalendar';

export interface IFlatItemNotification {
  settlementDay: string;
  settlementDate: string;
  owner: string;
  address: string;
}

export const FlatItemNotification = (props: IFlatItemNotification) => {
  return (
    <View style={style.container}>
      <Text
        style={style.text}>{`Дата заселення: ${props.settlementDate}`}</Text>
      <Text style={style.text}>{`Властник: ${props.owner}`}</Text>
      <Text style={style.text}>{`Адресса: ${props.address}`}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 110,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors._007AFF,
    borderRadius: 10,
    marginBottom: 10,
    jastifyContent: 'center',
    padding: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
