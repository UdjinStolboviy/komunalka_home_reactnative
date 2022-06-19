import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {HeaderBackIcon} from '../../../../assets/Icons/HeaderBackIcon';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {SettingHeaderIcon} from '../../../../assets/Icons/SettingHeaderIcon';

export interface ProfileHeader {
  title?: string;
  onBackPress?: () => void;
  settingsDisabled?: boolean;
  onSettingsPress?: () => void;
  rightText?: string;
  onRightPress?: () => void;
  rightTextDisabled?: boolean;
  leftButtonDisabled?: boolean;
}

export const AppHeader = (props: ProfileHeader) => {
  const app: IAppCoreService = useAppInjection();

  return (
    <View style={style.container}>
      {props.leftButtonDisabled ? null : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={
            props.onBackPress
              ? props.onBackPress
              : () => app.navigationService.goBack()
          }
          style={style.backSection}>
          <HeaderBackIcon />
        </TouchableOpacity>
      )}

      <View style={style.middleWrapper}>
        <Text numberOfLines={3} style={style.mainText}>
          {props.title || ''}
        </Text>
      </View>

      {props.settingsDisabled ? (
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={props.rightTextDisabled}
          onPress={props.onRightPress}
          style={[
            style.settingsSection,
            {opacity: props.rightTextDisabled ? 0.4 : 1},
          ]}>
          <Text style={style.rightText}>{props.rightText}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={props.onSettingsPress}
          style={style.settingsSection}>
          <SettingHeaderIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 40 : 0,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backSection: {
    width: '15%',
    left: '6%',
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    height: '100%',
  },
  middleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
  },
  mainText: {
    marginTop: '1%',
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
    fontWeight: '500',
    fontSize: 18,
    color: '#000000',
  },
  settingsSection: {
    right: '6%',
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    height: '100%',
  },
  rightText: {
    paddingVertical: 0,
    fontWeight: '500',
    fontSize: 16,
    color: '#FF8F2A',
  },
});
