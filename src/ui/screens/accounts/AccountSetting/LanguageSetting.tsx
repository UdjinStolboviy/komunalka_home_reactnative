import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export const LanguageSetting: React.FC = () => {
  // const { translate } = useContext<LocalizationContext>(localizationContext);
  // const { changeLanguage } = useContext<LocalizationContext>(localizationContext);

  return (
    <ScrollView>
      <AppHeader />
      <View style={style.container}>
        <View style={style.switchesContainer}>
          <Text style={style.switchName}>{'English'}</Text>
          <TouchableOpacity
            onPress={() => {
              // changeLanguage('en');
              // RNRestart.Restart();
            }}>
            <Text style={style.switchName}>{'English'}</Text>
          </TouchableOpacity>
        </View>
        <View style={[style.switchesContainer, {marginTop: 30}]}>
          <Text style={style.switchName}>{'Chinese'}</Text>
          <TouchableOpacity
            onPress={() => {
              // changeLanguage('cn');
              // RNRestart.Restart();
            }}>
            <Text style={style.switchName}>{'Chinese'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchesContainer: {},
  switchName: {},
});
