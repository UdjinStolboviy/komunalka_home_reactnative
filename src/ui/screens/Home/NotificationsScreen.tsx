import {Colors} from 'app/assets/constants/colors/Colors';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
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
import {
  FlatItemNotification,
  IFlatItemNotification,
} from '../notification-component/FlatItemNotification';
import NotificationCalendarView from '../notification-component/NotificationCalendar';
import notifee, {
  AndroidNotificationSetting,
  EventType,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

import BackgroundService from 'react-native-background-actions';
import {
  startTaskAction,
  stopTaskAction,
} from 'app/services/background-task/background.task.service';
import {uid} from 'app/utils/id-random';

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

  // const onDisplayNotification = async () => {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission();

  //   // Create a channel (required for Android)
  //   const channelId = await notifee.createChannel({
  //     id: 'defaultewrwerwer',
  //     name: 'Default Channel',
  //   });

  //   // Display a notification
  //   await notifee.displayNotification({
  //     title: 'БУДЬ ЛАСКА ЗНІМІТЬ ДАННІ',
  //     body: 'Сьогодні треба зняти данні з квртири!',
  //     android: {
  //       channelId: channelId,
  //       // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
  //       // pressAction is needed if you want the notification to open the app when pressed
  //       pressAction: {
  //         id: 'default',
  //       },
  //     },
  //   });
  // };

  const checkNextDate = (): number => {
    const dateNow = new Date(Date.now()).getTime();

    const dateNextPre = datesSettlementNextMonth.map(
      date => date + 'T09:00:21.583Z',
    );

    const dateNextPre2 = dateNextPre.map(date => new Date(date).getTime());
    const dateNextResult = dateNextPre2.sort((a, b) => a - b);

    const getNumber = (arr: number[], number: number) =>
      number < 0
        ? arr.filter(cur => cur < number)[0]
        : arr.filter(cur => cur > number)[0];

    return getNumber(dateNextResult, dateNow)
      ? getNumber(dateNextResult, dateNow)
      : dateNow + 60000;
  };

  useEffect(() => {
    showNotification();
    //checkNextDate();
  }, []);

  const showNotification = async () => {
    const date = new Date(Date.now());
    const settings = await notifee.getNotificationSettings();
    if (settings.android.alarm == AndroidNotificationSetting.ENABLED) {
      await notifee.requestPermission();

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: uid(),
        name: 'Default Channel',
      });
      //Create timestamp trigger
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: checkNextDate(),
        //timestamp: date.getTime() + 60000,
        // 1659687613331
        repeatFrequency: RepeatFrequency.WEEKLY, // repeat once a week
        alarmManager: {
          allowWhileIdle: true,
        },
      };
      await notifee.createTriggerNotification(
        {
          title: 'БУДЬ ЛАСКА ЗНІМІТЬ ДАННІ',
          body: 'Сьогодні треба зняти данні з квртири!',
          android: {
            channelId: channelId,
            pressAction: {
              id: 'default',
            },
          },
        },
        trigger,
      );
    } else {
      // Show some user information to educate them on what exact alarm permission is,
      // and why it is necessary for your app functionality, then send them to system preferences:
      await notifee.openAlarmPermissionSettings();
    }
  };

  notifee.onBackgroundEvent(async ({type}) => {
    // console.log('Background event:', type);
    // console.log(' event:', new Date(Date.now()).getTime() + 60000);
    // const sleep = (time: any) =>
    //   new Promise<void>(resolve => setTimeout(() => resolve(), time));
    // const veryIntensiveTask = async () => {
    //   // Example of an infinite loop task
    //   const delay: number = 1000;
    //   await new Promise(async resolve => {
    //     for (let i = 0; BackgroundService.isRunning(); i++) {
    //       console.log(`Task ${i}`);
    //       onDisplayNotification();
    //       await sleep(delay);
    //     }
    //   });
    // };
    //veryIntensiveTask();
    const initialNotification = await notifee.getInitialNotification();
    // Check if the user pressed the "Mark as read" action

    // showNotification();
    if (initialNotification) {
      const notification = initialNotification.notification;
      const pressAction = initialNotification.pressAction;
      showNotification();
      //veryIntensiveTask();
      if (notification.id) {
        // The user pressed the "Mark as read" action
        await notifee.cancelNotification(notification.id);
      }
    }
  });

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
