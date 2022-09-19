import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

import {observer} from 'mobx-react';
import {TrashIcon} from 'app/assets/Icons/TrashIcon';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {useAppInjection} from 'app/data/ioc/inversify.config';

export interface TrashButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  onPressTrash: () => void;
}

export const TrashButton = observer((props: TrashButtonProps) => {
  const app: IAppCoreService = useAppInjection();
  const _handleTrash = () => {
    props.onPressTrash && props.onPressTrash();
  };
  return (
    <View style={[style.container, props.containerStyle]}>
      <TouchableOpacity onPress={_handleTrash}>
        <TrashIcon />
      </TouchableOpacity>
    </View>
  );
});

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    width: 70,
    height: 50,
  },
});
