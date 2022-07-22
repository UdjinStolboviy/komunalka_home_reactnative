import {Colors} from 'app/assets/constants/colors/Colors';
import {ENFlagSvg} from 'app/assets/svg/ENFlagSvg';
import {SPFlagSvg} from 'app/assets/svg/SPFlagSvg';
import {UAFlagSvg} from 'app/assets/svg/UAFlagSvg';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

export const LanguageSetting: React.FC = () => {
  // const { translate } = useContext<LocalizationContext>(localizationContext);
  // const { changeLanguage } = useContext<LocalizationContext>(localizationContext);

  return (
    <View style={style.container}>
      <AppHeader settingsDisabled title="Мова" />

      <View style={style.switchesContainer}>
        <TouchableOpacity
          style={style.buttonWrapper}
          onPress={() => {
            // changeLanguage('en');
            // RNRestart.Restart();
          }}>
          <UAFlagSvg style={style.svg} />
          <Text style={style.switchName}>{'Українська'}</Text>
        </TouchableOpacity>
      </View>
      <View style={[style.switchesContainer]}>
        <TouchableOpacity
          style={style.buttonWrapper}
          onPress={() => {
            // changeLanguage('cn');
            // RNRestart.Restart();
          }}>
          <ENFlagSvg />
          <Text style={style.switchName}>{'English'}</Text>
        </TouchableOpacity>
      </View>
      <View style={[style.switchesContainer]}>
        <TouchableOpacity
          style={style.buttonWrapper}
          onPress={() => {
            // changeLanguage('cn');
            // RNRestart.Restart();
          }}>
          <SPFlagSvg />
          <Text style={style.switchName}>{'Spain'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  switchesContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonWrapper: {
    borderWidth: 2,
    width: '80%',
    height: '80%',
    borderRadius: 20,
    borderColor: Colors._007AFF,
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  switchName: {
    fontSize: 20,
    color: Colors._007AFF,
  },
  svg: {},
});
