import {Colors} from 'app/assets/constants/colors/Colors';
import React from 'react';
import {View, StyleSheet, ViewStyle, ActivityIndicator} from 'react-native';

interface Style {
  container: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors._FFFFFF,
  },
});

const Loader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors._007AFF} />
    </View>
  );
};

export default Loader;
