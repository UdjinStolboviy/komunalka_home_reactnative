import {
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { Colors } from 'app/assets/constants/colors/Colors';


export const ErrorScreen = () => {
  const navigation = useNavigation();
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainWrapper}>
        <Text style={styles.bigText}>
          {'Data not loaded, please try again later'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            navigation.goBack();
          }}
          style={{
            marginTop: 24,
            backgroundColor: Colors._FFFFFF,
            borderRadius: 8,
            width: '100%',
            height: 48,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.bigText, {color: Colors._000000}]}>
            {'Go back'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors._FFFFFF,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainWrapper: {
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigText: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 24,
    color: Colors._000000,
  },
});
