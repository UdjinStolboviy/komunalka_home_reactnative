import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import {Text} from 'src/ui/components/Common/Text';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from 'app/assets/constants/colors/Colors';
import {observer} from 'mobx-react';
import {useInjection} from 'inversify-react';
import {
  localizationContext,
  LocalizationContext,
} from 'app/localization/localizationProvider';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {CodeVerification} from 'app/ui/components/Common/CodeVerification';

const RESEND_INTERVAL = 59;

export const Confirm: React.FC = observer(({route}: any) => {
  const app: IAppCoreService = useAppInjection();

  const {translate} = useContext<LocalizationContext>(localizationContext);

  const {email} = route.params;

  const [code, setCode] = useState<string>('');
  const [codeError, setCodeError] = useState<boolean>(false);

  const [remainingTime, setRemainingTime] = useState<string>('');

  const [time, setTime] = React.useState(RESEND_INTERVAL);

  useEffect(() => {
    appStore.setTimeForResendOTPCode(
      new Date().getMinutes() * 60 + new Date().getSeconds() + RESEND_INTERVAL,
    );
    const timer = setInterval(() => {
      const curentTime = new Date().getMinutes() * 60 + new Date().getSeconds();
      setTime(appStore.timeForResendOTPCode - curentTime);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [appStore.timeForResendOTPCode]);

  useEffect(() => {
    const minutes = Math.trunc(time / 60);
    const seconds = time % 60;
    setRemainingTime(minutes + ':' + (seconds > 9 ? seconds : '0' + seconds));
  }, [time]);

  useEffect(() => {
    if (code && code.length === 4) {
      appStore.checkOTPCode(email, code).then(response => {
        setCodeError(response);
      });
    }
  }, [code]);

  useEffect(() => {
    setCodeError(false);
  }, [code]);

  const onResend = () => {
    try {
      const request: IOtpRequest = {email};
      doWithCatch(loggerService, apiService.getOTP(request));

      appStore.setTimeForResendOTPCode(
        new Date().getMinutes() * 60 +
          new Date().getSeconds() +
          RESEND_INTERVAL,
      );
    } catch (error) {}
  };

  return (
    <KeyboardAwareScrollView>
      <KeyboardAvoidingView
        style={styles.loginContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={-100}>
        <Text normal style={styles.header}>
          {'Main_Email'}
        </Text>
        <Text isSFP normal style={[styles.text, styles.confirmText]}>
          {"We've sent a code to your email. Please enter it below."}
        </Text>
        <CodeVerification onChangeCode={setCode} />

        <View style={styles.errorBox}>
          {!!codeError && (
            <>
              <Image
                style={styles.attention}
                source={require('../../assets/img/attentionCircle.png')}
              />
              <Text isSFP normal style={styles.errorMsg}>
                {'Main_OopsTryAgainOrResendCode'}
              </Text>
            </>
          )}
        </View>
        {time > 0 ? (
          <Text style={styles.timeLeft} normal>
            {`${'Main_ResendCodeIn'} ${remainingTime}`}
          </Text>
        ) : (
          <TouchableOpacity onPress={onResend}>
            <Text style={styles.buttonLike} normal>
              {'Main_ResendCode'}
            </Text>
          </TouchableOpacity>
        )}
        <View style={{flex: 1}} />
      </KeyboardAvoidingView>
    </KeyboardAwareScrollView>
  );
});

export const styles = StyleSheet.create({
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
    height: 24,
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
