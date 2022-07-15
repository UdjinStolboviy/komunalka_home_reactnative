import React from 'react';
import {observer} from 'mobx-react';
import {Text} from 'react-native';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {useAppInjection} from 'app/data/ioc/inversify.config';

export interface FlatBottomViewProps {
  flat: IFlat;
  index: number;
}

export const FlatBottomView = observer(({flat, index}: FlatBottomViewProps) => {
  const app: IAppCoreService = useAppInjection();

  return <Text>fdgfdgdgdfgdfgdgfdfgdfgfdgdfgd</Text>;
});
