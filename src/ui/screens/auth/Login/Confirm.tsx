import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from 'app/assets/constants/colors/Colors';
import {observer} from 'mobx-react';

import {
  localizationContext,
  LocalizationContext,
} from 'app/localization/localizationProvider';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {CodeVerification} from 'app/ui/components/Common/CodeVerification';
import {Screens} from 'app/assets/constants/codes/Screens';
import {AttentionCircleIcon} from 'app/assets/Icons/AttentionCircleIcon';

import RNRestart from 'react-native-restart';
import {AsyncStorageFacade, AsyncStorageKey} from 'app/data/async-storege';
import SplashScreen from 'react-native-splash-screen';

const RESEND_INTERVAL = 59;

export const Confirm: React.FC = observer(({route}: any) => {
  const app: IAppCoreService = useAppInjection();
  const timeState = app.storage.getTimeState();
  const timeForResendCode = app.storage.getTimeState().getTimeForResendCode();
  const auth = app.authService.getAuthState();
  const appStateRender = app.authService.getAuthState().getAuthStareRender();

  const {translate} = useContext<LocalizationContext>(localizationContext);

  // const {email} = route.params;

  const [code, setCode] = useState<string>('');
  const [codeError, setCodeError] = useState<boolean>(false);

  const [remainingTime, setRemainingTime] = useState<string>('');

  const [time, setTime] = React.useState(RESEND_INTERVAL);

  useEffect(() => {
    timeState.setTimeForResendCode(
      new Date().getMinutes() * 60 + new Date().getSeconds() + RESEND_INTERVAL,
    );
    const timer = setInterval(() => {
      const curentTime = new Date().getMinutes() * 60 + new Date().getSeconds();
      setTime(timeForResendCode - curentTime);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timeForResendCode]);

  useEffect(() => {
    const minutes = Math.trunc(time / 60);
    const seconds = time % 60;
    setRemainingTime(minutes + ':' + (seconds > 9 ? seconds : '0' + seconds));
  }, [time]);

  useEffect(() => {
    if (code && code.length === 4) {
      if (code === '1999') {
        setCodeError(false);
        setRenderedAuthStore(true);
        auth.setAuthStareRender(true);
        SplashScreen.show();
        //app.navigationService.navigate(Screens.SCREEN_MAIN);
        RNRestart.Restart();
      } else {
        setRenderedAuthStore(false);
        setCodeError(true);
      }
    }
  }, [code, codeError]);

  const setRenderedAuthStore = async (code: boolean) => {
    await AsyncStorageFacade.saveBoolean(
      AsyncStorageKey.RenderedAuthStore,
      code,
    );
  };

  const onResend = () => {
    timeState.setTimeForResendCode(
      new Date().getMinutes() * 60 + new Date().getSeconds() + RESEND_INTERVAL,
    );
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>{'Код доступу'}</Text>
        <Text style={[styles.text, styles.confirmText]}>
          {'Введідь будь ласка цей код доступу 1999'}
        </Text>
        <CodeVerification onChangeCode={setCode} />

        {codeError && (
          <View style={styles.errorBox}>
            <AttentionCircleIcon />
            <Text style={styles.errorMsg}>{'Невірний код'}</Text>
          </View>
        )}
        {time > 0 ? (
          <Text style={styles.timeLeft}>
            {`${'Код скинеться через'} ${remainingTime}`}
          </Text>
        ) : (
          <TouchableOpacity onPress={onResend}>
            <Text style={styles.buttonLike}>{'Main_ResendCode'}</Text>
          </TouchableOpacity>
        )}
        <View style={{flex: 1}} />
      </View>
    </KeyboardAwareScrollView>
  );
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors._FFFFFF,
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 16,
    fontStyle: 'normal',
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: 0.01,
    alignSelf: 'flex-start',
    color: Colors._000000,
  },
  errorMsg: {
    color: 'red',
    alignSelf: 'center',
  },
  attention: {
    width: 13,
    height: 13,
    marginRight: 4,
    marginBottom: 2,
  },
  text: {
    color: Colors._DBDBDB,
    width: '100%',
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 21,
    letterSpacing: -0.32,
  },
  confirmText: {
    marginBottom: 140,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '100%',
    marginTop: 14,
  },
  timeLeft: {
    display: 'flex',
    alignSelf: 'center',
    marginTop: 16,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.01,
    color: Colors._000000,
  },
  buttonLike: {
    display: 'flex',
    alignSelf: 'center',
    color: Colors._007AFF,
    marginTop: 16,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.01,
  },
});
