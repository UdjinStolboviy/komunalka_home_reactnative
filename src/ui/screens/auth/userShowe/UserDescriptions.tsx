import {Type} from 'app/assets/constants/codes/Type';
import {Colors} from 'app/assets/constants/colors/Colors';
import {CalculatorIcon} from 'app/assets/Icons/CalculatorIcon';
import {HomeIcon} from 'app/assets/Icons/HomeIcon';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {AuthUser} from 'app/data/storage/auth/auth.user.model';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {UniversalButton} from 'app/ui/components/button/AppButton/UniversalButton';
import {observable} from 'mobx';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export interface IUserDescriptionProps {
  onPress?: () => void;
  user: {photoURL: string; displayName: string; email: string};
}

export const UserDescription = (props: IUserDescriptionProps) => {
  const app: IAppCoreService = useAppInjection();

  console.log('user', props.user);

  return (
    <View style={style.container}>
      <Image source={{uri: props.user.photoURL}} style={style.image} />
      <View style={style.middleWrapper}>
        <Text numberOfLines={2} style={style.mainText}>
          {props.user.displayName}
        </Text>
        <Text numberOfLines={4} style={style.descriptionText}>
          {props.user.email}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,

    borderColor: Colors._007AFF,
    borderRadius: 30,
    marginHorizontal: '5%',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '2%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  middleWrapper: {
    height: 100,
    width: '80%',
    justifyContent: 'center',
  },
  mainText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors._007AFF,
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    color: Colors._979797,
  },
  containerButton: {
    width: '35%',
    marginHorizontal: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
