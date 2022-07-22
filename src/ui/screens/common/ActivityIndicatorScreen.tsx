import {Colors} from 'app/assets/constants/colors/Colors';
import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';

export const ActivityIndicatorScreen = (props: any) => {
  return (
    <SafeAreaView
      style={[
        ActivityIndicatorScreenStyle.container,
        (props.route.params && props.route.params.containerStyle) || {},
      ]}>
      <ActivityIndicator
        color={
          (props.route.params && props.route.params.color) || Colors._007AFF
        }
        size="large"
      />
    </SafeAreaView>
  );
};

const ActivityIndicatorScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
