import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export const FirstScreen = (props: any) => {
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
        <Text>FirstScreen</Text>
      </TouchableOpacity>
    </View>
  );
};
