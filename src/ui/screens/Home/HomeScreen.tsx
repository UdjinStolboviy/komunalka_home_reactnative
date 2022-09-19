import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

import {Screens} from 'app/assets/constants/codes/Screens';
import {Texts} from 'app/assets/constants/codes/Texts';
import {useAppInjection} from 'app/data/ioc/inversify.config';

import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {ContentProgressScrollView} from 'app/ui/components/Common/Scroll/ContentProgressScrollView';
import {HomePageCharts} from 'app/ui/screens/Home/HomePageCharts';
import {ElementItem} from 'app/ui/components/Main/ScreenView/ElemetItemHome';
import {Type} from 'app/assets/constants/codes/Type';
import {Colors} from 'app/assets/constants/colors/Colors';
import {AsyncStorageFacade, AsyncStorageKey} from 'app/data/async-storege';
import {firebase} from '@react-native-firebase/database';
import {HomeItem} from './HomeItem';
import {Home, IHome} from 'app/data/storage/home/home.model';
import NetInfo from '@react-native-community/netinfo';
import {databaseFirebase} from 'app/services/firebase/firebase.database';
import {checkNotificationCanter} from 'app/utils/check-notification';
import {observer} from 'mobx-react';
import {checkDateNextNotification} from 'app/services/utils/check.date.next.notification';
import BackgroundFetch from 'react-native-background-fetch';
import {showsNotification} from 'app/services/notification/showe.notification';
import {BecTask} from 'app/services/background-task/background.fetch.task';
import {AuthUser} from 'app/data/storage/auth/auth.user.model';
import {UserDescription} from '../auth/userShowe/UserDescriptions';
import auth from '@react-native-firebase/auth';
import {BottomNavigatorBar} from 'app/ui/components/Common/BottomNavigatorBar';
import {IUser} from '../auth/Login/Confirm';
import {Dada} from 'app/utils/dade.const';
import {AddHome} from './AddHome';
import {DeleteModal} from '../modal/delete-modal/DeleteModal';

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

export const MainScreen = observer((props: any) => {
  const app: IAppCoreService = useAppInjection();
  const unreadNotificationsCount = app.storage.getNotificationsState();
  const userUid: string = props.route.params && props.route.params.userUid;
  const userNew: IUser = props.route.params && props.route.params.user;
  const reference = databaseFirebase(`/storage/users/${userUid}/homes`);
  const referenceNome = databaseFirebase(`storage/users/${userUid}`);
  const [homeStage, setHomeStage] = useState<IHome[]>([]);
  const [userStage, setUserStage] = useState<any>();
  const [countNotification, setCountNotification] = useState<number>(0);
  const [connectionNet, setConnectionNet] = useState<boolean | null>(false);
  const notification = app.storage.getNotificationsState();
  const notificationList = notification.getNotifications();
  const notificationListLength = notificationList.length;
  const notificationListLengths =
    notificationListLength > 0 ? notificationListLength : 0;
  const dataNotification = checkDateNextNotification(homeStage);

  useEffect(() => {
    saveHomeStore();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionNet, userUid]);

  useEffect(() => {}, [reference, userUid]);

  NetInfo.fetch().then(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
    app.storage.getHomesState().setConnectNetwork(state.isConnected);
    setConnectionNet(state.isConnected);
  });

  const saveHomeStore = () => {
    getUserStore();

    if (connectionNet) {
      cleanStore();

      const onValueChange = reference.on('value', snapshot => {
        console.log(
          '==========A new node has been added------',
          snapshot.val(),
        );

        if (snapshot.val()) {
          setHomeStage(snapshot.val());
          setHomeStore(snapshot.val());
          setNextDateStore(snapshot.val());

          app.storage.getHomesState().setHomes(snapshot.val());
        } else {
          const home = Dada.home;
          const user = {
            displayName: userNew.displayName,
            email: userNew.email,
            homes: [home],
            photoURL: userNew.photoURL,
            uid: userUid,
          };
          databaseFirebase(`/storage/users`)
            .child(userUid)
            .set(user)
            .then(() => console.log('Data updated.'));
        }
      });
      // Stop listening for updates when no longer required

      return () => reference.off('value', onValueChange);
    }
    getHomeStore();
    getUserStore();
  };

  const getUserStore = async (): Promise<any> => {
    try {
      const result: any | null = await AsyncStorageFacade.get(
        AsyncStorageKey.AuthUserStore,
      );
      if (result !== null) {
        app.storage.setAuthUser(result);

        return setUserStage(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getHomeStore = async (): Promise<void> => {
    try {
      const result: IHome[] | null = await AsyncStorageFacade.get(
        AsyncStorageKey.HomeStore,
      );
      if (result !== null) {
        app.storage.getHomesState().setHomes(result);
        const canterResult = checkNotificationCanter(result);
        unreadNotificationsCount.setUnreadNotificationsCount(canterResult);
        setCountNotification(canterResult);
        showsNotification(dataNotification, homeStage, canterResult);
        return setHomeStage(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setHomeStore = async (home: IHome[]) => {
    app.navigationService.navigate(Screens._ACTIVITY_INDICATOR);
    const canterResult = checkNotificationCanter(home);
    unreadNotificationsCount.setUnreadNotificationsCount(canterResult);
    setCountNotification(canterResult);
    showsNotification(dataNotification, homeStage, canterResult);
    await AsyncStorageFacade.save(AsyncStorageKey.HomeStore, home);
    app.navigationService.goBack();
  };

  const setNextDateStore = async (home: IHome[]) => {
    const checkDateResult = checkDateNextNotification(home);
    await AsyncStorageFacade.saveString(
      AsyncStorageKey.CheckDateNextStore,
      checkDateResult,
    );
  };

  const cleanStore = async () => {
    app.navigationService.navigate(Screens._ACTIVITY_INDICATOR);
    await AsyncStorageFacade.remove(AsyncStorageKey.HomeStore);
    app.navigationService.goBack();
  };

  const deleteItem = (index: number) => {
    let date = homeStage;
    date.splice(index, 1);
    setHomeStage(date);
    if (connectionNet) {
      referenceNome.update({homes: [...date]});
      //app.storage.getHomesState().refreshHome();
    }
  };

  const renderHomeItem = () => {
    return homeStage.map((item: IHome, index: number) => (
      <View>
        <HomeItem
          key={index}
          title={item.title}
          type={item.id}
          titleButton={Texts.OPEN}
          description={Texts.OPEN}
          onPress={() => {
            app.navigationService.navigate(Screens._FLATS, {
              title: `${Texts.FLAT} ${item.title}`,
              home: new Home(item),
              homeIndex: index,
              userUid: userUid,
            });
            //reference.set(homeStage).then(() => console.log('Data set.'));
          }}
        />
        <View style={style.deleteButton}>
          <DeleteModal onDelete={() => deleteItem(index)} />
        </View>
      </View>
    ));
  };

  return (
    <View style={style.container}>
      <AppHeader
        leftButtonDisabled
        title={Texts.HOME}
        onSettingsPress={() =>
          app.navigationService.navigate(Screens._ACCOUNT_SETTING)
        }
      />

      <ContentProgressScrollView onProgressChange={progress => progress}>
        <HomePageCharts />
        {/* <TouchableOpacity onPress={() => {
            //setRenderedAuthStore(false);
            app.navigationService.navigate(Screens._TEST);
          }}>
          <Text style={{color: Colors._000000}}>TEST-TEST</Text>
        </TouchableOpacity> */}
        {userStage ? <UserDescription user={userStage} /> : null}
        {renderHomeItem()}
        <AddHome homes={homeStage} userId={userUid} />
        <ElementItem
          title={Type.CALCULATOR}
          titleButton={Texts.OPEN}
          description={Texts.OPEN}
          onPress={() => {
            //setRenderedAuthStore(false);
            app.navigationService.navigate(Screens._CALCULATOR);
          }}
        />
        <BecTask />
      </ContentProgressScrollView>
      <BottomNavigatorBar
        countNotification={countNotification}
        notHandleHomePress={true}
      />
    </View>
  );
});

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  deleteButton: {
    position: 'absolute',
    right: '30%',
    top: '20%',
  },
});
