// import React, {useEffect, useState} from 'react';
// import {Image, KeyboardAvoidingView, Platform, View} from 'react-native';

// import {Text} from '@scm/components/Text';
// import {ScreenView} from '@scm/elements/ScreenView';
// import {LoginStyle} from '@scm/styles/Auth/LoginStyle';
// import {useInjection} from '@scm/core/inversify';
// import {INavigationService} from '@scm/services/navigation/types';
// import {StackScreen} from '../constants';
// import {useTranslation} from 'react-i18next';
// import ActionButton from '@scm/components/ActionButton';
// import {FormInput} from '@scm/components/FormInput';
// import {IApiService} from '@scm/services/api/types';
// import {IOtpRequest} from '@scm/data/network/model';
// import {DI_TYPES} from '@scm/core/inversifyTypes';
// import {ILoggerService} from '@scm/services/logger';
// import {doWithCatch} from '@scm/utils/utils';
// import {AppErrorType, IAppError, IErrorProcessor} from '@scm/data/errors';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {Colors} from '@scm/styles/Colors';

// function validateEmail(email: string) {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }

// export const SignIn: React.FC = () => {
//   const navigationService = useInjection(INavigationService);
//   const apiService = useInjection(IApiService);
//   const loggerService: ILoggerService = useInjection(DI_TYPES.services.logger);
//   const errorProcessor: IErrorProcessor = useInjection(
//     DI_TYPES.other.errorProcessor,
//   );

//   const {t} = useTranslation('shared__authentication');
//   const badEmailDefaultText =
//     'Whoops... You can only use your University email';

//   const [email, setEmail] = useState<string>('');
//   const [correctEmail, setCorrectEmail] = useState<boolean>(false);
//   const [wrongEmail, setWrongEmail] = useState<boolean>(false);
//   const [wrongEmailText, setWrongEmailText] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   const description =
//     'Welcome! To start exploring, please sign-in or register with your University email.';

//   const requestOtp = async (sendToEmail: string) => {
//     try {
//       setLoading(true);

//       const request: IOtpRequest = {email: sendToEmail};
//       await apiService.getOTP(request);

//       setCorrectEmail(true);
//       setWrongEmail(false);
//       navigationService.navigate(StackScreen.CONFIRM, {email});
//     } catch (e) {
//       loggerService.error(e);

//       setWrongEmail(true);

//       //TODO: check university email
//       const appError: IAppError = errorProcessor.getErrorOrUnknown(e);
//       if (appError.code.type === AppErrorType.Server) {
//         setWrongEmailText(appError.message || badEmailDefaultText);
//       } else {
//         navigationService.navigateToErrorModal(appError);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onContinue = () => {
//     if (validateEmail(email)) {
//       doWithCatch(loggerService, requestOtp(email));
//     } else {
//       setCorrectEmail(false);
//       setWrongEmail(true);
//       setWrongEmailText(badEmailDefaultText);
//     }
//   };

//   useEffect(() => {
//     setCorrectEmail(false);
//     setWrongEmail(false);
//     setWrongEmailText('');
//   }, [email]);

//   const getLogo = () => {
//     if (correctEmail) {
//       return require('../../assets/images/goBack@3x.png');
//     }
//     if (wrongEmail) {
//       return require('../../assets/images/goBack@3x.png');
//     }
//     return require('../../assets/images/goBack@3x.png');
//   };

//   return (
//     <KeyboardAwareScrollView
//       style={[{flex: 1, backgroundColor: Colors.screenBackground}]}>
//       <KeyboardAvoidingView
//         keyboardVerticalOffset={60}
//         style={LoginStyle.loginContainer}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//         <Image
//           source={getLogo()}
//           resizeMode={'contain'}
//           style={LoginStyle.logo}
//         />
//         <Text isSFP normal style={[LoginStyle.text, LoginStyle.firstPageText]}>
//           {description}
//         </Text>
//         <FormInput
//           keyboardType={'email-address'}
//           autoCorrect={false}
//           placeholder="university@email.here"
//           onChangeText={setEmail}
//           success={correctEmail}
//           error={wrongEmail}
//           errorText={wrongEmailText}
//         />
//         <ActionButton
//           disabled={email === '' || loading}
//           onPress={onContinue}
//           text={'Lets go!'}
//         />
//         <View style={{flex: 1}} />
//       </KeyboardAvoidingView>
//     </KeyboardAwareScrollView>
//   );
// };
