import notifee, {
    AndroidNotificationSetting,
    EventType,
    RepeatFrequency,
    TimestampTrigger,
    TriggerType,
} from '@notifee/react-native';
import { uid } from 'app/utils/id-random';

import moment from 'moment';


export const showsNotification = (checkDateNextNotification: string) => {




    const dayNow = moment(new Date()).format('DD');


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

    if (dayNow === checkDateNextNotification) {
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