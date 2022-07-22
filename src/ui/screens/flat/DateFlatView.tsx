import React, {useState} from 'react';
import {Screens} from 'app/assets/constants/codes/Screens';
import {Colors} from 'app/assets/constants/colors/Colors';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {observer} from 'mobx-react';
import {useEffect} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {EditHeader} from '../../components/Common/EditHeader';
import {Texts} from 'app/assets/constants/codes/Texts';
import {InputUniversal} from 'app/ui/components/input/app-input/InputUniversal';
import CalendarListScreen from 'app/ui/components/Common/CalendarListScreen';
import CalendarScreen from 'app/ui/components/Common/CalendarListScreen';
import moment from 'moment';

export interface DateFlatViewProps {
  containerStyle?: StyleProp<ViewStyle>;
  isAdmin: boolean;
  title: string;
  description: string | null | number;
  onChange: (value: string) => void;
}

export const DateFlatView = observer((props: DateFlatViewProps) => {
  const app: IAppCoreService = useAppInjection();
  const [editTextDisable, setEditTextDisable] = useState<boolean>(false);

  //   useEffect(() => {}, []);

  const onPress = () => {
    setEditTextDisable(!editTextDisable);
  };

  const _closeAllPopUps = () => {};

  const _renderDescription = () => {
    if (editTextDisable) {
      return (
        <CalendarScreen
          onChange={text =>
            props.onChange &&
            props.onChange(text.split('-').reverse().join('.'))
          }
        />
      );
    } else {
      return <Text style={style.text}>{props.description}</Text>;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={_closeAllPopUps}
      style={[style.container, props.containerStyle]}>
      <EditHeader
        onPress={onPress}
        editDisabled={false}
        title={props.title}
        requiredField={false}
        containerStyle={{marginTop: 20}}
      />
      {_renderDescription()}
    </TouchableOpacity>
  );
});

const style = StyleSheet.create({
  container: {
    width: '100%',
  },
  text: {
    marginTop: 10,
    fontWeight: 'normal',
    color: Colors._808080,
    lineHeight: 21,
    fontSize: 16,
  },
  inputContainer: {
    width: '95%',
    marginTop: 10,
  },
});
