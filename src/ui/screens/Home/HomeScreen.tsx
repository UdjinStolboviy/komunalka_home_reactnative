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
import {AsyncStorageFacade, AsyncStorageKey} from 'app/data/async-storege';
import {HomeItem} from './HomeItem';
import {Home, IHome} from 'app/data/storage/home/home.model';
import NetInfo from '@react-native-community/netinfo';
import {databaseFirebase} from 'app/services/firebase/firebase.database';
import {checkNotificationCanter} from 'app/utils/check-notification';
import {observer} from 'mobx-react';
import {checkDateNextNotification} from 'app/services/utils/check.date.next.notification';
import {showsNotification} from 'app/services/notification/showe.notification';
import {BecTask} from 'app/services/background-task/background.fetch.task';
import {UserDescription} from '../auth/userShowe/UserDescriptions';
import {BottomNavigatorBar} from 'app/ui/components/Common/BottomNavigatorBar';
import {IUser} from '../auth/Login/Confirm';
import {Dada} from 'app/utils/dade.const';
import {AddHome} from './AddHome';
import {DeleteModal} from '../modal/delete-modal/DeleteModal';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {UniversalButton} from 'app/ui/components/button/AppButton/UniversalButton';

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
    console.log('--------', userUid);
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
      const result: any | null = AsyncStorageFacade.get(
        AsyncStorageKey.AuthUserStore,
      );
      if (result !== null) {
        app.storage.setAuthUser(JSON.parse(result));

        return setUserStage(JSON.parse(result));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getHomeStore = async (): Promise<void> => {
    try {
      const result: string | null = AsyncStorageFacade.get(
        AsyncStorageKey.HomeStore,
      );
      if (result !== null) {
        const data = await JSON.parse(result);
        app.storage.getHomesState().setHomes(data);
        const canterResult = checkNotificationCanter(data);
        unreadNotificationsCount.setUnreadNotificationsCount(data);
        setCountNotification(canterResult);
        showsNotification(dataNotification, homeStage, canterResult);
        return setHomeStage(data);
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
    AsyncStorageFacade.save(AsyncStorageKey.HomeStore, JSON.stringify(home));
    app.navigationService.goBack();
  };

  const setNextDateStore = async (home: IHome[]) => {
    const checkDateResult = checkDateNextNotification(home);
    AsyncStorageFacade.saveString(
      AsyncStorageKey.CheckDateNextStore,
      checkDateResult,
    );
  };

  const cleanStore = async () => {
    app.navigationService.navigate(Screens._ACTIVITY_INDICATOR);
    AsyncStorageFacade.remove(AsyncStorageKey.HomeStore);
    app.navigationService.goBack();
  };

  const deleteItem = (index: number) => {
    let date = homeStage;
    if (date.length === 1) {
      return;
    }
    date.splice(index, 1);
    setHomeStage(date);
    if (connectionNet) {
      referenceNome.update({homes: [...date]});
      //app.storage.getHomesState().refreshHome();
    }
  };

  const handlerChangeHome = (item: IHome, index: number) => {
    app.navigationService.navigate(Screens._EDIT_HOME_SCREEN, {
      title: `${Texts.FLAT} ${item.title}`,
      home: new Home(item),
      homeIndex: index,
      userUid: userUid,
    });
  };

  const handlerHome = (item: IHome, index: number) => {
    app.navigationService.navigate(Screens._FLATS, {
      title: `${Texts.FLAT} ${item.title}`,
      home: new Home(item),
      homeIndex: index,
      userUid: userUid,
    });
  };

  const rightSwipeActions = (item: IHome, index: number) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: 270,
          paddingRight: 30,
        }}>
        <DeleteModal onDelete={() => deleteItem(index)} />
        <UniversalButton
          onPress={() => handlerChangeHome(item, index)}
          title={props.titleButton}
          containerStyle={style.containerButton}
          activeOpacity={0.7}
          iconChang={true}
        />
        <UniversalButton
          onPress={() => handlerHome(item, index)}
          title={props.titleButton}
          containerStyle={style.containerButton}
          activeOpacity={0.7}
        />
      </View>
    );
  };

  const renderHomeItem = () => {
    return homeStage.map((item: IHome, index: number) => (
      <Swipeable renderRightActions={() => rightSwipeActions(item, index)}>
        <View>
          <HomeItem
            key={index}
            title={item.title}
            type={item.id}
            address={item.address ? item.address : ''}
            titleButton={Texts.OPEN}
            description={Texts.OPEN}
            imageHome={item.images ? item.images.url : ''}
            onPress={() => handlerHome(item, index)}
          />
        </View>
      </Swipeable>
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
  containerButton: {},
});
