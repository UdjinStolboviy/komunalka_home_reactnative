import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {HeaderBackIcon} from '../../../../assets/Icons/HeaderBackIcon';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {SettingHeaderIcon} from '../../../../assets/Icons/SettingHeaderIcon';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Colors} from 'app/assets/constants/colors/Colors';
import {Texts} from 'app/assets/constants/codes/Texts';

export interface ProfileHeader {
  title?: string;
  result?: number;
  onBackPress?: () => void;
  settingsDisabled?: boolean;
  onSettingsPress?: () => void;
  rightText?: string;
  onRightPress?: () => void;
  rightTextDisabled?: boolean;
  leftButtonDisabled?: boolean;
  progress?: number;
}

export const AppHeader = (props: ProfileHeader) => {
  const app: IAppCoreService = useAppInjection();
  const widthSeparatorValue = useSharedValue(0);
  widthSeparatorValue.value = props.progress ? props.progress : 0;

  const animatedSeparatorStyle = useAnimatedStyle(() => {
    const scale = interpolate(widthSeparatorValue.value, [0, 1], [0, 100], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      width: withTiming(`${scale}%`, {
        duration: 1000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  return (
    <View style={style.container}>
      <View style={style.header}>
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
          {props.result ? (
            <Text numberOfLines={3} style={style.mainText}>
              {'Всього: ' + props.result + ' ' + Texts.UHG || ''}
            </Text>
          ) : null}
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
      <Animated.View style={[style.separator, animatedSeparatorStyle]} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 40 : 0,
  },
  header: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: '100%',
    height: 1.5,
    backgroundColor: Colors._007AFF,
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
