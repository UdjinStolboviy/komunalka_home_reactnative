import {Colors} from 'app/assets/constants/colors/Colors';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {
  checkNotificationFlat,
  datesSettlementCheck,
} from 'app/utils/check-notification';
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

  const datesSettlement = datesSettlementCheck(homes);
  const flat: IFlatItemNotification[] = checkNotificationFlat(homes);

  const datesNow = moment(new Date()).format('YYYY-MM');
  const dayNow = moment(new Date()).format('DD');

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

  return (
    <View style={style.container}>
      <AppHeader title={`Нагадування`} />
      <View style={style.wrapperCalendar}>
        <NotificationCalendarView datesSettlement={datesSettlementNextMonth} />
      </View>
      <Text style={style.title}>{`Сьогодні розрахувати`}</Text>
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
