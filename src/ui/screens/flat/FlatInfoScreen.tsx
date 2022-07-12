import {RouteProp, useRoute} from '@react-navigation/native';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export interface IFlatInfoScreenProps {
  flat?: IFlat;
}

interface IFlatInfoScreenRouteParams {
  flat?: IFlat;
}

export const FlatInfoScreen = (props: any) => {
  const app: IAppCoreService = useAppInjection();
  const [flatStage, setFlatStage] = useState<IFlat>(
    props.route.params && props.route.params.flat,
  );
  const flat =
    useRoute<RouteProp<{params: IFlatInfoScreenRouteParams}, 'params'>>().params
      ?.flat;
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}>
      <AppHeader />
      <TouchableOpacity
        onPress={() => console.log('end')}
        style={{
          width: '100%',
          height: '90%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{flatStage.title}</Text>
        <Text>{flatStage.rooms}</Text>
        <Text>{flatStage.emailOccupant}</Text>
        <Text>{flatStage.area}</Text>
      </TouchableOpacity>
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
