import React, {useEffect, useRef} from 'react';
import {AppState, StatusBar, StyleSheet, View} from 'react-native';

import {observer} from 'mobx-react';
import {Text} from 'react-native';
import {useInjection} from 'inversify-react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors} from 'app/assets/constants/colors/Colors';
import {LoaderLoginHome} from 'app/ui/components/Common/LoaderLoginHome';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {AsyncStorageFacade, AsyncStorageKey} from 'app/data/async-storege';
import {Screens} from 'app/assets/constants/codes/Screens';

export const InitialScreen = observer(() => {
  const app: IAppCoreService = useAppInjection();
  const user = AsyncStorageFacade.get(AsyncStorageKey.UserToken);
  useEffect(() => {
    checkInitializationStatus();
  }, []);

  const checkInitializationStatus = () => {
    console.log(user);
    setTimeout(() => {
      if (user) {
        app.navigationService.navigate(Screens.SCREEN_MAIN);
      } else {
        app.navigationService.navigate(Screens._LOGIN);
      }
    }, 4000);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <LoaderLoginHome />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors._FFFFFF,
  },

  loaderContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '10%',
    paddingBottom: '14%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
