import React, {useContext, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native';

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
import Loader from 'app/ui/components/Common/Loader';

GoogleSignin.configure({
  webClientId:
    '405815381968-4gv4tva9qjfplitp7gen42mlkoagkn5l.apps.googleusercontent.com',
});

const RESEND_INTERVAL = 59;

export interface IUser {
  email: string;
  emailVerified: boolean;
  displayName: string;
  photoURL: string;
  phoneNumber: string;
  providerId: string;
  uid: string;
  tenanId: string;
  providerData: any;
}

export const LoginScreen: React.FC = observer(({route}: any) => {
  const app: IAppCoreService = useAppInjection();
  const timeState = app.storage.getTimeState();
  const timeForResendCode = app.storage.getTimeState().getTimeForResendCode();
  const authStore = app.storage;

  const {translate} = useContext<LocalizationContext>(localizationContext);
  const [codeError, setCodeError] = useState<boolean>(false);

  const [time, setTime] = React.useState(RESEND_INTERVAL);
  const [renderAuth, setRenderAuth] = useState(false);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<IUser>();

  const analyticsEvent = async () => {
    await analytics().logEvent('login_code_screen_view');
  };

  const setUserStore = async (user: AuthUser) => {
    AsyncStorageFacade.save(
      AsyncStorageKey.AuthUserStore,
      JSON.stringify(user),
    );
  };

  async function onGoogleButtonPress() {
    // Get the users ID token

    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    authStore.setLoginUser();
    analyticsEvent();
    return auth().signInWithCredential(googleCredential);
  }

  const GoogleSignIn = () => {
    return (
      <TouchableOpacity
        style={[styles.googleButton]}
        onPress={() =>
          onGoogleButtonPress().then(user => {
            console.log('Signed in with Goog/le!', user);

            if (user) {
              app.navigationService.navigate(Screens.SCREEN_MAIN, {
                user: user,
                userUid: user.uid,
              });
            } else return;
          })
        }>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    );
  };

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    setUserStore(
      new AuthUser(
        user.uid,
        user.displayName,
        user.email,
        user.photoURL,
        user.isAnonymous,
      ),
    );
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.textDescription]}>
        {'Введідь будь ласка код доступу'}
      </Text>

      <GoogleSignIn />
    </View>
  );
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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

  textDescription: {
    color: Colors._000000,
    width: '100%',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
  },
});
