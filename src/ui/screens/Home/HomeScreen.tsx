import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

import {Screens} from 'app/assets/constants/codes/Screens';
import {Texts} from 'app/assets/constants/codes/Texts';
import {useAppInjection} from 'app/data/ioc/inversify.config';

import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {ContentProgressScrollView} from 'app/ui/components/Common/Scroll/ContentProgressScrollView';
import {HomePageCharts} from 'app/ui/screens/Home/HomePageCharts';
import {ElementItem} from 'app/ui/components/Main/ScreenView/ElemetItemHome';
import {Type} from 'app/assets/constants/codes/Type';

export const MainScreen = (props: any) => {
  const app: IAppCoreService = useAppInjection();
  const [contentProgress, setContentProgress] = useState<number>(0);
  const [homeStage, setHomeStage] = useState([
    {
      id: 'homeRed',
      title: 'Home Red',
      flats: [{id: 'homeRedFlat1'}, {id: 'homeRedFlat2'}],
    },
    {
      id: 'homeWhit',
      title: 'Home White',
      flats: [{id: 'homeWhitFlat1'}, {id: 'homeWhitFlat2'}],
    },
  ]);
  const renderItem = ({item}) => (
    <ElementItem
      title={item.title}
      titleButton={Texts.OPEN}
      description={Texts.OPEN}
    />
  );
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}>
      <AppHeader leftButtonDisabled title={Texts.HOME} />

      <ContentProgressScrollView
        onProgressChange={progress => setContentProgress(progress)}>
        <HomePageCharts />
        <FlatList
          data={homeStage}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <ElementItem
          title={Type.CALCULATOR}
          titleButton={Texts.OPEN}
          description={Texts.OPEN}
        />
      </ContentProgressScrollView>
    </View>
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
});
