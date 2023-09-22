import React, {useEffect} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle, Image} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

export interface LoaderLogoMaviiProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export const LoaderLoginHome = (props: LoaderLogoMaviiProps) => {
  const scale = useSharedValue(1);
  useEffect(() => {
    const animation = setInterval(() => {
      scale.value = withTiming(
        1.2,
        {duration: 1000, easing: Easing.inOut(Easing.ease)},
        () => {
          // Reverse the animation when it completes
          scale.value = withTiming(1, {
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
          });
        },
      );
    }, 1500);

    return () => {
      clearInterval(animation);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale?.value}],
  }));
  return (
    <View style={[styles.container, props.containerStyle]}>
      <Animated.View style={[animatedStyle]}>
        <Image source={require('../../../assets/images/logo.png')} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
