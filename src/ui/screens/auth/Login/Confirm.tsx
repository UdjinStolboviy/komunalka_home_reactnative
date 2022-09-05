import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, View, StyleSheet, Text, Button} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from 'app/assets/constants/colors/Colors';
import {observer} from 'mobx-react';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';

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
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AuthUser} from 'app/data/storage/auth/auth.user.model';

GoogleSignin.configure({
  webClientId:
    '405815381968-4gv4tva9qjfplitp7gen42mlkoagkn5l.apps.googleusercontent.com',
});

const RESEND_INTERVAL = 59;

export const Confirm: React.FC = observer(({route}: any) => {
  const app: IAppCoreService = useAppInjection();
  const timeState = app.storage.getTimeState();
  const timeForResendCode = app.storage.getTimeState().getTimeForResendCode();
  const authStore = app.storage;

  const {translate} = useContext<LocalizationContext>(localizationContext);

  const COD = '1990';

  const [code, setCode] = useState<string>('');
  const [codeError, setCodeError] = useState<boolean>(false);

  const [remainingTime, setRemainingTime] = useState<string>('');

  const [time, setTime] = React.useState(RESEND_INTERVAL);
  const [renderAuth, setRenderAuth] = useState(false);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

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
    getRenderedAuthStore();
    if (renderAuth) {
      return app.navigationService.navigate(Screens.SCREEN_MAIN, {
        //title: `${Texts.FLAT} ${item.title}`,
        user: user,
        userUid: user.uid,
      });
    }
    if (code && code.length === 4) {
      if (code === COD && user) {
        setCodeError(false);
        setRenderedAuthStore(true);
        authStore.setLoginUser();
        analyticsEvent();
        app.navigationService.navigate(Screens.SCREEN_MAIN, {
          //title: `${Texts.FLAT} ${item.title}`,
          user: user,
          userUid: user.uid,
        });
        // RNRestart.Restart();
      } else {
        setRenderedAuthStore(false);
        setCodeError(true);
      }
    }
  }, [code, codeError, user]);

  useEffect(() => {
    getRenderedAuthStore();
  }, []);

  const getRenderedAuthStore = async (): Promise<void> => {
    try {
      const result = await AsyncStorageFacade.getBoolean(
        AsyncStorageKey.RenderedAuthStore,
      );
      if (result !== null) {
        return setRenderAuth(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const analyticsEvent = async () => {
    await analytics().logEvent('confirm_code_screen_view');
  };

  const setUserStore = async (user: AuthUser) => {
    await AsyncStorageFacade.save(AsyncStorageKey.AuthUserStore, user);
  };
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

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const GoogleSignIn = () => {
    return (
      <TouchableOpacity
        style={[
          styles.googleButton,
          code === COD ? null : {backgroundColor: Colors._BDBDBD},
        ]}
        onPress={() =>
          code === COD
            ? onGoogleButtonPress().then(() =>
                console.log('Signed in with Google!'),
              )
            : null
        }>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    );
  };

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    setUserStore(
      new AuthUser(
        user?.uid,
        user?.displayName,
        user?.email,
        user?.photoURL,
        user?.isAnonymous,
      ),
    );
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  console.log('user', user);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>{'Код доступу'}</Text>
        <Text style={[styles.textDescription]}>
          {'Введідь будь ласка код доступу'}
        </Text>
        <CodeVerification onChangeCode={setCode} />

        {code !== COD && (
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
            <Text style={styles.buttonLike}>{'Обновити'}</Text>
          </TouchableOpacity>
        )}
        <GoogleSignIn />
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
  googleButton: {
    backgroundColor: '#4285F4',
    width: '100%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
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

    color: Colors._007AFF,
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
  textDescription: {
    color: Colors._DBDBDB,
    width: '100%',
    fontSize: 16,
    marginBottom: 140,
    lineHeight: 21,
    letterSpacing: -0.32,
    textAlign: 'center',
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
    alignSelf: 'center',
    marginTop: 16,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.01,
    color: Colors._000000,
  },
  buttonLike: {
    alignSelf: 'center',
    color: Colors._007AFF,
    marginTop: 16,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.01,
  },
});
