import React, {
  DependencyList,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {observer} from 'mobx-react';
import {Shadow} from 'react-native-shadow-2';

export interface ExpandCardProps {
  topChildren?: React.ReactNode;
  bottomChildren?: React.ReactNode;
  bottomAdditionalView?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onAction?: (opened: boolean) => void;
  onCardOpened?: () => void;
  onCardClosed?: () => void;
  onCardCloseFinished?: () => void;
  onCardOpenFinished?: () => void;
  deps: DependencyList;
  pressDisabled?: boolean;
}

export interface ExpandCardRef {
  press?: () => void;
  close?: () => void;
}

export const ExpandCard = React.forwardRef((props: ExpandCardProps, ref) => {
  React.useImperativeHandle(ref, () => ({
    press() {
      return _press();
    },
    close() {
      return _close();
    },
  }));

  const _press = () => {
    toggleButton();
  };

  const _close = () => {
    toggleButton();
  };
  const shareValue = useSharedValue(0);
  const [bodySectionHeight, setBodySectionHeight] = useState(0);

  const bodyHeight = useAnimatedStyle(() => ({
    height: interpolate(shareValue.value, [0, 1], [0, bodySectionHeight]),
  }));

  const toggleButton = () => {
    if (shareValue.value === 0) {
      shareValue.value = withTiming(1, {
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
    } else {
      shareValue.value = withTiming(0, {
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
    }
  };

  return (
    <View style={[ExpandCardStyle.container, props.containerStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        style={ExpandCardStyle.containerFeedback}
        onPress={toggleButton}>
        <View>
          <View style={ExpandCardStyle.topContentWrapper}>
            {props.topChildren}
          </View>
          <Animated.View style={[ExpandCardStyle.descStyle, bodyHeight]}>
            <View
              style={ExpandCardStyle.bodyContainer}
              onLayout={event => {
                setBodySectionHeight(event.nativeEvent.layout.height);
              }}>
              {props.bottomChildren}
            </View>
          </Animated.View>
        </View>
        <View>{props.bottomAdditionalView}</View>
      </TouchableOpacity>
    </View>
  );
});

const ExpandCardStyle = StyleSheet.create({
  container: {},
  topContentWrapper: {},
  bottomContentWrapper: {},
  containerFeedback: {},
  descStyle: {
    overflow: 'hidden',
  },
  bodyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingBottom: 20,
  },
});
