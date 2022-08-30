/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { AsyncStorageFacade, AsyncStorageKey } from 'app/data/async-storege';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Switch,
  Button,
  Alert
} from 'react-native';

import BackgroundFetch from "react-native-background-fetch";



/// Util class for handling fetch-event peristence in AsyncStorage.
import Event from "../../utils/Event";
import { showsNotification } from '../notification/showe.notification';


export const BecTask = () => {

  const [enabled, setEnabled] = React.useState(false);
  const [status, setStatus] = React.useState(-1);
  const [events, setEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    initBackgroundFetch()
    loadEvents();
  }, []);

  /// Configure BackgroundFetch.
  ///
  const initBackgroundFetch = async () => {
    const status:number = await BackgroundFetch.configure({
      minimumFetchInterval: 15,      // <-- minutes (15 is minimum allowed)
      stopOnTerminate: false,
      enableHeadless: true,
      startOnBoot: true,
      // Android options
      forceAlarmManager: false,      // <-- Set true to bypass JobScheduler.
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
      requiresCharging: false,       // Default
      requiresDeviceIdle: false,     // Default
      requiresBatteryNotLow: false,  // Default
      requiresStorageNotLow: false,  // Default
    }, async (taskId:string) => {
      console.log('[BackgroundFetch] taskId', taskId);
      // Create an Event record.
       // Do your background work...
        const result: string | null = await AsyncStorageFacade.getString(
          AsyncStorageKey.CheckDateNextStore,
        );
        if (result) {
          showsNotification(result);
        }
      const event = await Event.create(taskId, false);
      // Update state.
      setEvents((prev) => [...prev, event]);
      // Finish.
      BackgroundFetch.finish(taskId);
    }, (taskId:string) => {
      // Oh No!  Our task took too long to complete and the OS has signalled
      // that this task must be finished immediately.
      console.log('[Fetch] TIMEOUT taskId:', taskId);
      BackgroundFetch.finish(taskId);
    });
    setStatus(status);
    setEnabled(true);
  }

  /// Load persisted events from AsyncStorage.
  ///
  const loadEvents = () => {
    Event.all().then((data: any) => {
      return setEvents(data);
    }).catch((error) => {
      Alert.alert('Error', 'Failed to load data from AsyncStorage: ' + error);
    });
  }

  /// Toggle BackgroundFetch ON/OFF
  ///
  const onClickToggleEnabled = (value:boolean) => {
    setEnabled(value);

    if (value) {
      BackgroundFetch.start();
    } else {
      BackgroundFetch.stop();
    }
  }

  /// [Status] button handler.
  ///
  const onClickStatus = () => {
    BackgroundFetch.status().then((status:number) => {
      let statusConst = '';
      switch (status) {
        case BackgroundFetch.STATUS_AVAILABLE:
          statusConst = 'STATUS_AVAILABLE';
          break;
        case BackgroundFetch.STATUS_DENIED:
          statusConst = 'STATUS_DENIED';
          break;
        case BackgroundFetch.STATUS_RESTRICTED:
          statusConst = 'STATUS_RESTRICTED';
          break;
      }
      Alert.alert('BackgroundFetch.status()', `${statusConst} (${status})`);
    });
  }

  /// [scheduleTask] button handler.
  /// Schedules a custom-task to fire in 5000ms
  ///
  const onClickScheduleTask = () => {
    BackgroundFetch.scheduleTask({
      taskId: 'com.transistorsoft.customtask',
      delay: 5000,
      forceAlarmManager: true
    }).then(() => {
      Alert.alert('scheduleTask', 'Scheduled task with delay: 5000ms');
    }).catch((error) => {
      Alert.alert('scheduleTask ERROR', error);
    });
  }

  /// Clear the Events list.
  ///
  const onClickClear = () => {
    Event.destroyAll();
    setEvents([]);
  }

  /// Fetch events renderer.
  ///
  

  return (
   <Text></Text>
  );
};

