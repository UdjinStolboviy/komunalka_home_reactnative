import {Colors} from 'app/assets/constants/colors/Colors';
import { AsyncStorageFacade, AsyncStorageKey } from 'app/data/async-storege';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import { IHome } from 'app/data/storage/home/home.model';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import { showsNotification } from 'app/services/notification/showe.notification';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {
  checkNotificationFlat,
  datesSettlementCheck,
} from 'app/utils/check-notification';
import moment from 'moment';

import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import BackgroundFetch, { HeadlessEvent } from 'react-native-background-fetch';
import {
  FlatItemNotification,
  IFlatItemNotification,
} from '../notification-component/FlatItemNotification';
import NotificationCalendarView from '../notification-component/NotificationCalendar';

// let MyHeadlessTask = async (event: HeadlessEvent) => {
//   // Get task id from event {}:
//   let taskId = event.taskId;
//   let isTimeout = event.timeout;  // <-- true when your background-time has expired.
//   if (isTimeout) {
//     // This task has exceeded its allowed running-time.
//     // You must stop what you're doing immediately finish(taskId)
//     console.log('[BackgroundFetch] Headless TIMEOUT:', taskId);
//     BackgroundFetch.finish(taskId);
//     return;
//   }
//   console.log('[BackgroundFetch HeadlessTask] start: ', taskId);

//   // Perform an example HTTP request.
//   // Important:  await asychronous tasks when using HeadlessJS.
//     await showsNotification();
//   console.log('[BackgroundFetch HeadlessTask] response: ');

//   // Required:  Signal to native code that your task is complete.
//   // If you don't do this, your app could be terminated and/or assigned
//   // battery-blame for consuming too much time in background.
//   BackgroundFetch.finish(taskId);
// }

// // Register your BackgroundFetch HeadlessTask
// BackgroundFetch.registerHeadlessTask(MyHeadlessTask);


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

 useEffect(() => {
   configureBackgroundFetch();
   showsNotification(homes);
  }, []);

  const configureBackgroundFetch = () =>{
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 59, // <-- minutes (15 is minimum allowed)
        stopOnTerminate: false, // <-- Android-only,
        startOnBoot: true, // <-- Android-only
        enableHeadless: true,
        requiresCharging: false,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE,
      },
       async (taskId: any) => {
      console.log("[js] Received background-fetch event: ", taskId);
       const result: IHome[] | null = await AsyncStorageFacade.get(
        AsyncStorageKey.HomeStore,
      );
      if (result !== null) {
        showsNotification(result);}
      // Required: Signal completion of your task to native code
      // If you fail to do this, the OS can terminate your app
      // or assign battery-blame for consuming too much background-time
      BackgroundFetch.finish(taskId);
      },
      error => {
        console.log('[js] RNBackgroundFetch failed to start');
        console.log(error);
      },)}; 

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
      <Text
        // onPress={onDisplayNotification}
        style={style.title}>{`Сьогодні розрахувати`}</Text>
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
