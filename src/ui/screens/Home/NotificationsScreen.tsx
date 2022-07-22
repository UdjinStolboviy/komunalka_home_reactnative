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
import {
  FlatItemNotification,
  IFlatItemNotification,
} from '../notification-component/FlatItemNotification';
import NotificationCalendarView from '../notification-component/NotificationCalendar';

export const NotificationsScreen = (props: any) => {
  const app: IAppCoreService = useAppInjection();
  const notification = app.storage.getNotificationsState();
  const notificationList = notification.getNotifications();
  const notificationListLength = notificationList.length;
  const notificationListLengths =
    notificationListLength > 0 ? notificationListLength : 0;
  const notificationListLengthsText = `${notificationListLengths} Notifications`;
  const homes = app.storage.getHomesState().getHomes();

  const datesSettlement = [];
  const flat: IFlatItemNotification[] = [];

  const datesNow = moment(new Date()).format('YYYY-MM');
  const dayNow = moment(new Date()).format('DD');

  for (let i = 0; i < homes.length; i++) {
    const home = homes[i];
    for (let j = 0; j < home.flats.length; j++) {
      const settlement = home.flats[j].dateSettlement;
      const owner = home.flats[j].owner;
      const address = home.flats[j].address;
      datesSettlement.push(settlement.split('.')[0]);
      flat.push({
        settlementDay: settlement.split('.')[0],
        settlementDate: settlement,
        owner: owner,
        address: address,
      });
    }
  }
  const dateNowSettlement = datesSettlement.map(date => {
    if (Number(date) >= 29) {
      return datesNow + '-' + '01';
    }
    return datesNow + '-' + date;
  });

  const addMonths = (date: string, months: number) => {
    return moment(date).add(months, 'month').format('YYYY-MM-DD');
  };

  const datesSettlementNext = (months: number, arr: string[]) =>
    arr.map(date => addMonths(date, months));

  const datesSettlementNextMonth = [
    ...dateNowSettlement,
    ...datesSettlementNext(1, dateNowSettlement),
  ];
  const renderNotificationList = () => {
    return flat.map((item, index) => {
      if (dayNow === item.settlementDay || Number(item.settlementDay) >= 29) {
        return (
          <FlatItemNotification
            key={index}
            settlementDay={item.settlementDay}
            settlementDate={item.settlementDate}
            owner={item.owner}
            address={item.address}
          />
        );
      } else {
        return null;
      }
    });
  };

  console.log('fsdfsdfksdgjsdkgjskjdg', flat);
  return (
    <View style={style.container}>
      <AppHeader title={`Нагадування`} />
      <View style={style.wrapperCalendar}>
        <NotificationCalendarView datesSettlement={datesSettlementNextMonth} />
      </View>
      <Text style={style.title}>{`Сьогодні розрахувнок`}</Text>
      <ScrollView style={style.wrapperScroll}>
        {renderNotificationList()}
      </ScrollView>
      {/* <View style={{height: 40}}></View> */}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  wrapperCalendar: {
    marginHorizontal: '5%',
  },
  wrapperScroll: {
    height: '100%',
    paddingHorizontal: '10%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    color: Colors._007AFF,
    fontSize: 18,
  },
});
