import { Colors } from 'app/assets/constants/colors/Colors';
import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';



export interface NoInternetConnectionViewProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export const NoInternetConnectionView = (
  props: NoInternetConnectionViewProps,
) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <Text style={styles.bigText}>{'No Internet Connection'}</Text>
      <Text style={styles.text}>{'No Internet Connection'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 96,
    height: 96,
  },
  bigText: {
    marginTop: 24,

    fontSize: 20,
    color: Colors._000000,
  },
  text: {
    marginTop: 8,
    width: '60%',
    textAlign: 'center',

    fontSize: 15,
    color: Colors._000000,
    lineHeight: 22,
  },
});
