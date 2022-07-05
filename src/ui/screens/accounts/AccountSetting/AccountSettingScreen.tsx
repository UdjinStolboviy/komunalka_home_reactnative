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

interface IProps {
  text: string;
  onPress: () => void;
}

const AccountItem: React.FC<IProps> = props => {
  const {text, onPress} = props;
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={AccountStyle.linkArrowContainer}>
      <Text style={AccountStyle.textArrow}>{text}</Text>
    </TouchableOpacity>
  );
};

export const AccountSettingScreen: React.FC = observer(() => {
  const app: IAppCoreService = useAppInjection();
  const navigationService = app.navigationService;
  // const navigationService = useInjection(INavigationService);
  // const appStore = useInjection(IAppStore);
  // const authStore = useInjection(IAuthStore);

  // const {profile} = appStore;
  // const [name, setName] = useState(
  //   `${profile?.firstName} ${profile?.lastName}`,
  // );

  // const {translate} = useContext<LocalizationContext>(localizationContext);

  // const [avatar, setAvatar] = useState<IFile>({});

  // useEffect(() => {
  //   appStore.getCategories();
  //   appStore.getProfile();
  //   authStore.getUniversities();
  // }, []);

  // useEffect(() => {
  //   if (profile) {
  //     setName(`${profile.firstName} ${profile.lastName}`);
  //     setAvatar(profile.avatar);
  //   }
  // }, [profile]);
  //  <Text style={AccountStyle.headerUserProfile} bold={true}>
  //    {translate('Setting_User_Profile')}
  //  </Text>;
  const avatar = ``;

  const UserProfile = () => {
    return (
      <View style={AccountStyle.avatarNameContainerUserProfile}>
        {avatar ? (
          <Image style={AccountStyle.imageUserProfile} source={{uri: avatar}} />
        ) : (
          <View style={AccountStyle.profile}>
            <ProfileSettingIcon />
          </View>
        )}
        <Text style={AccountStyle.nameUserProfile}>{'Name'}</Text>
      </View>
    );
  };

  return (
    <View>
      <View style={AccountStyle.headerContainer}>
        <AppHeader />
      </View>
      <ScrollView>
        <View style={AccountStyle.container}>
          <UserProfile />

          <View style={AccountStyle.blockOfLinksContainer}>
            <Text style={AccountStyle.blockHeader}>
              {'Setting_Account_Settings'}
            </Text>

            <View style={AccountStyle.AccountItemContainer}>
              <ProfileIcon />
              <AccountItem
                text={'Setting_Personal_Information'}
                onPress={() =>
                  navigationService.navigate(Screens._PERSONAL_INFO)
                }
              />
            </View>

            <View style={AccountStyle.AccountItemContainer}>
              <StartIcon />
              <AccountItem
                text={'CalculatorTariffSetting'}
                onPress={() =>
                  navigationService.navigate(Screens._CALCULATOR_TARIFF_SETTING)
                }
              />
            </View>

            <View style={AccountStyle.AccountItemContainer}>
              <NotificationIcon />
              <AccountItem
                text={'Setting_Notifications'}
                onPress={() =>
                  navigationService.navigate(Screens._NOTIFICATION_SETTING)
                }
              />
            </View>

            <View style={AccountStyle.AccountItemContainer}>
              <NotificationIcon />
              <AccountItem
                text={'Setting_Language'}
                onPress={() =>
                  navigationService.navigate(Screens._LANGUAGE_SETTING)
                }
              />
            </View>
          </View>

          <View style={AccountStyle.blockOfLinksContainer}>
            <Text style={AccountStyle.blockHeader}>{'Setting_Support'}</Text>

            <View style={AccountStyle.AccountItemContainer}>
              <PrivacyPolicyIcon />
              <AccountItem
                text={'Setting_Privacy_Policy'}
                onPress={() => navigationService.navigate(Screens._POLICY)}
              />
            </View>

            <View style={AccountStyle.AccountItemContainer}>
              <TermsIcon />
              <AccountItem
                text={'Setting_Terms_Of_Conditions'}
                onPress={() => navigationService.navigate(Screens._TERMS)}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => console.log('logout')}
            style={AccountStyle.logoutContainer}>
            <LogoutIcon />
            <Text style={AccountStyle.logout}>{'Setting_Logout'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
});

const AccountStyle = StyleSheet.create({
  container: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors._FFFFFF,
  },
  navigationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 8,
  },
  header: {
    fontSize: 34,
    lineHeight: 41,
    color: Colors._000000,
    marginBottom: 24,
  },
  avatarNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 50,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 8,
    marginRight: 20,
    resizeMode: 'contain',
  },
  name: {color: Colors._000000, fontSize: 16, lineHeight: 22},
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
  divider: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: Colors._979797,
    marginBottom: 18,
    marginTop: 18,
  },
  logout: {color: Colors._979797, fontSize: 17, lineHeight: 20},
  AccountItemContainer: {flexDirection: 'row', alignItems: 'center'},
  svg: {marginRight: 16},
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '14%',
  },
  arrow: {fontSize: 28},
  saveButton: {
    fontSize: 17,
    lineHeight: 22,
    color: Colors._979797,
    marginHorizontal: 24,
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
  headerUserProfile: {
    fontSize: 34,
    lineHeight: 41,
    color: Colors._000000,
    marginTop: 24,
    alignSelf: 'flex-start',
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
  profilePersonalInfo: {
    height: 72,
    width: 72,
    backgroundColor: '#F2F8FF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors._007AFF,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },

  headerContainer: {
    paddingHorizontal: 24,
    flexDirection: 'column',
    marginTop: 10,
  },
});
