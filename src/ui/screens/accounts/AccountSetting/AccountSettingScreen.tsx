import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View, Text} from 'react-native';
import {Dimensions, StyleSheet} from 'react-native';

import {observer} from 'mobx-react';

import {Colors} from 'app/assets/constants/colors/Colors';
import {ProfileIcon} from 'app/assets/Icons/ProfileIcon';
import {StartIcon} from 'app/assets/Icons/StartIcon';
import {NotificationIcon} from 'app/assets/Icons/NotificationIcon';
import {PrivacyPolicyIcon} from 'app/assets/Icons/PrivacyPolicyIcon';
import {TermsIcon} from 'app/assets/Icons/TermsIcon';
import {LogoutIcon} from 'app/assets/Icons/LogoutIcon';
import {ProfileSettingIcon} from 'app/assets/Icons/PofileSettingIcon';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {Screens} from 'app/assets/constants/codes/Screens';
import {CalculatorIcon} from 'app/assets/Icons/CalculatorIcon';
import {CalculatorIconSmall} from 'app/assets/Icons/CalculatorIconSmall';
import {SwitchUniversal} from 'app/ui/components/Common/SwitchUniversal';
import {Texts} from 'app/assets/constants/codes/Texts';
import {ThemeContext} from 'app/navigation/RootNavigator';
import {useTheme} from '@react-navigation/native';
import {AsyncStorageFacade, AsyncStorageKey} from 'app/data/async-storege';
import auth from '@react-native-firebase/auth';

interface IProps {
  text: string;
  onPress: () => void;
}

const AccountItem: React.FC<IProps> = props => {
  const {text, onPress} = props;
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={AccountStyle.linkArrowContainer}>
      <Text style={[AccountStyle.textArrow, {color: colors.text}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export const AccountSettingScreen: React.FC = observer(() => {
  const app: IAppCoreService = useAppInjection();
  const navigationService = app.navigationService;
  const {setTheme} = useContext(ThemeContext);
  const {colors} = useTheme();

  const logout = () => {
    AsyncStorageFacade.clearStorage();
    auth().signOut();
    app.navigationService.navigate(Screens._LOGIN);
  };

  const authStore = app.storage.getAuthUser();

  const UserProfile = () => {
    if (authStore) {
      return (
        <View style={AccountStyle.avatarNameContainerUserProfile}>
          <Image
            style={AccountStyle.imageUserProfile}
            source={{uri: authStore.photoURL}}
          />

          <Text style={AccountStyle.nameUserProfile}>
            {authStore.displayName}
          </Text>
        </View>
      );
    }
    return (
      <View style={AccountStyle.avatarNameContainerUserProfile}>
        <View style={AccountStyle.profile}>
          <ProfileSettingIcon />
        </View>
        <Text style={AccountStyle.nameUserProfile}>{'Імя'}</Text>
      </View>
    );
  };

  return (
    <View
      style={[
        AccountStyle.containerWrapper,
        {backgroundColor: colors.background},
      ]}>
      <AppHeader settingsDisabled title={'Налаштування'} />
      <ScrollView>
        <View style={AccountStyle.container}>
          <UserProfile />

          <View style={AccountStyle.blockOfLinksContainer}>
            <Text style={[AccountStyle.blockHeader, {color: colors.text}]}>
              {'Налаштування акаунту'}
            </Text>

            <View style={AccountStyle.AccountItemContainer}>
              <ProfileIcon style={AccountStyle.iconWrapper} />
              <AccountItem
                text={'Персональні данні'}
                onPress={() =>
                  navigationService.navigate(Screens._PERSONAL_INFO)
                }
              />
            </View>

            <View style={AccountStyle.AccountItemContainer}>
              <CalculatorIconSmall style={AccountStyle.iconWrapper} />
              <AccountItem
                text={'Комунальні тарифи'}
                onPress={() =>
                  navigationService.navigate(Screens._CALCULATOR_TARIFF_SETTING)
                }
              />
            </View>

            <View style={AccountStyle.AccountItemContainer}>
              <NotificationIcon style={AccountStyle.iconWrapper} />
              <AccountItem
                text={'Нагадування'}
                onPress={() =>
                  navigationService.navigate(Screens._NOTIFICATION_SETTING)
                }
              />
            </View>

            <View style={AccountStyle.AccountItemContainer}>
              <StartIcon style={AccountStyle.iconWrapper} />
              <AccountItem
                text={'Мова'}
                onPress={() =>
                  navigationService.navigate(Screens._LANGUAGE_SETTING)
                }
              />
            </View>
          </View>

          <View style={AccountStyle.blockOfLinksContainer}>
            <Text style={[AccountStyle.blockHeader, {color: colors.text}]}>
              {'Підтримка'}
            </Text>

            <View style={AccountStyle.AccountItemContainer}>
              <PrivacyPolicyIcon style={AccountStyle.iconWrapper} />
              <AccountItem
                text={'Політика конфіденційності'}
                onPress={() => navigationService.navigate(Screens._POLICY)}
              />
            </View>

            <View style={AccountStyle.AccountItemContainer}>
              <TermsIcon style={AccountStyle.iconWrapper} />
              <AccountItem
                text={'Умови використання'}
                onPress={() => navigationService.navigate(Screens._TERMS)}
              />
            </View>
            <View style={AccountStyle.AccountItemContainer}>
              <PrivacyPolicyIcon style={AccountStyle.iconWrapper} />
              <AccountItem
                text={'Графік сплати податків'}
                onPress={() =>
                  navigationService.navigate(Screens._TAX_CALENDAR)
                }
              />
            </View>
          </View>
          <SwitchUniversal
            unitOfMeasurement={'Темна тема'}
            onSwitchChange={(isEnabled: boolean) => {
              if (isEnabled) {
                setTheme && setTheme('Light');
              } else {
                setTheme && setTheme('Dark');
              }
            }}
          />
          <TouchableOpacity
            onPress={logout}
            style={AccountStyle.logoutContainer}>
            <LogoutIcon style={AccountStyle.iconWrapper} />
            <Text style={AccountStyle.logout}>{'Вихід'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
});

const AccountStyle = StyleSheet.create({
  containerWrapper: {
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
  },
  iconWrapper: {marginRight: 10},
  blockHeader: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors._979797,
    marginBottom: 18,
  },
  blockOfLinksContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 32,
  },
  linkArrowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textArrow: {fontSize: 17, lineHeight: 20, color: Colors._000000},

  logout: {color: Colors._979797, fontSize: 17, lineHeight: 20},
  AccountItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  imageUserProfile: {
    width: 72,
    height: 72,
    borderRadius: 8,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 10,
  },
  nameUserProfile: {color: Colors._000000, fontSize: 16, lineHeight: 22},
  avatarNameContainerUserProfile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },

  profile: {
    height: 72,
    width: 72,
    backgroundColor: '#F2F8FF',
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors._007AFF,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
