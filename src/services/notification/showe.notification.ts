import notifee, {
    AndroidNotificationSetting,
    EventType,
    RepeatFrequency,
    TimestampTrigger,
    TriggerType,
} from '@notifee/react-native';
import { uid } from 'app/utils/id-random';

import {
    checkNotificationFlat,
    datesSettlementCheck,
} from 'app/utils/check-notification';
import moment from 'moment';
import { IHome } from 'app/data/storage/home/home.model';
import { AsyncStorageFacade, AsyncStorageKey } from 'app/data/async-storege';
import { useState } from 'react';

export const showsNotification = (homes: IHome[]) => {



    const datesSettlement = datesSettlementCheck(homes);
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



    const showingNotification = async () => {
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
                //timestamp: checkNextDate(),
                //timestamp: checkNextDate(),
                timestamp: date.getTime() + 6000,
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

    if (dayNow === moment(checkNextDate()).format('DD')) {
        return showingNotification();
    } else {
        return null;
    }

    //return showingNotification();
    // notifee.onBackgroundEvent(async ({ type }) => {

    //     const initialNotification = await notifee.getInitialNotification();

    //     if (initialNotification) {
    //         const notification = initialNotification.notification;
    //         const pressAction = initialNotification.pressAction;
    //         showingNotification();

    //         if (notification.id) {
    //             // The user pressed the "Mark as read" action
    //             await notifee.cancelNotification(notification.id);
    //         }
    //     }
    // });


}


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