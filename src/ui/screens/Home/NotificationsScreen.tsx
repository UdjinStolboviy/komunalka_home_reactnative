import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {checkIfStateModificationsAreAllowed} from 'mobx/dist/internal';
import moment from 'moment';

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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

  for (let i = 0; i < homes.length; i++) {
    const home = homes[i];
    for (let j = 0; j < home.flats.length; j++) {
      const settlement = home.flats[j].dateSettlement;
      datesSettlement.push(settlement.split('.').reverse().join('-'));
    }
  }

  const addMonths = (date: string, months: number) => {
    return moment(date).add(months, 'month').format('YYYY-MM-DD');
  };

  const datesSettlementNext = (months: number, arr: string[]) =>
    arr.map(date => addMonths(date, months));

  const datesSettlementNextMonth = [
    ...datesSettlement,
    ...datesSettlementNext(1, datesSettlement),
    ...datesSettlementNext(2, datesSettlement),
    ...datesSettlementNext(3, datesSettlement),
    ...datesSettlementNext(4, datesSettlement),
    ...datesSettlementNext(5, datesSettlement),
    ...datesSettlementNext(6, datesSettlement),
    ...datesSettlementNext(7, datesSettlement),
    ...datesSettlementNext(8, datesSettlement),
    ...datesSettlementNext(9, datesSettlement),
    ...datesSettlementNext(10, datesSettlement),
    ...datesSettlementNext(11, datesSettlement),
    ...datesSettlementNext(12, datesSettlement),
  ];

  return (
    <View style={style.container}>
      <AppHeader />
      <View style={style.wrapperCalendar}>
        <NotificationCalendarView datesSettlement={datesSettlementNextMonth} />
      </View>
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
});
