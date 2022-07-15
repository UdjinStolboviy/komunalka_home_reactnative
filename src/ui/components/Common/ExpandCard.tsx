import React, {
  DependencyList,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  EasingNode,
  timing,
  useSharedValue,
  useValue,
} from 'react-native-reanimated';
import {observer} from 'mobx-react';

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

export const ExpandCard = observer(
  forwardRef((props: ExpandCardProps, ref) => {
    const DURATION = 200;
    const MIN_VISIBLE_HEIGHT = 0.001;
    const [animationRunning, setAnimationRunning] = useState(false);
    const animatedHeight = useValue<number>(MIN_VISIBLE_HEIGHT);
    const [expanded, setExpanded] = useState(false);
    const [dynamicHeight, setDynamicHeight] = useState(0);

    useEffect(() => {}, [...props.deps]);

    useImperativeHandle(ref, () => ({
      press() {
        return _press();
      },
      close() {
        return _close();
      },
    }));

    const _press = () => {
      if (props.pressDisabled || animationRunning) {
        return;
      }
      _onPress();
    };

    const _close = () => {
      timing(animatedHeight, {
        toValue: MIN_VISIBLE_HEIGHT,
        duration: 1,
        easing: EasingNode.inOut(EasingNode.ease),
      }).start(({finished}) => {
        if (finished) {
          setExpanded(false);
          setAnimationRunning(false);
        }
      });
    };

    const _onPress = () => {
      if (!expanded) {
        props.onCardOpened && props.onCardOpened();
        setAnimationRunning(true);
        timing(animatedHeight, {
          toValue: dynamicHeight,
          duration: DURATION,
          easing: EasingNode.inOut(EasingNode.ease),
        }).start(({finished}) => {
          if (finished) {
            setAnimationRunning(false);
            setExpanded(true);
            props.onCardOpenFinished && props.onCardOpenFinished();
          }
        });
      } else {
        props.onCardClosed && props.onCardClosed();
        setAnimationRunning(true);
        timing(animatedHeight, {
          toValue: MIN_VISIBLE_HEIGHT,
          duration: DURATION,
          easing: EasingNode.inOut(EasingNode.ease),
        }).start(({finished}) => {
          if (finished) {
            setExpanded(false);
            setAnimationRunning(false);
            props.onCardCloseFinished && props.onCardCloseFinished();
          }
        });
      }
    };

    return (
      <View style={[ExpandCardStyle.container, props.containerStyle]}>
        <TouchableOpacity
          activeOpacity={1}
          disabled={animationRunning && props.pressDisabled}
          style={ExpandCardStyle.containerFeedback}
          onPress={_onPress}>
          <View>
            <View style={ExpandCardStyle.topContentWrapper}>
              {props.topChildren}
            </View>
            <Animated.View
              style={[
                ExpandCardStyle.bottomContentWrapper,
                {height: animatedHeight},
              ]}>
              <View
                onLayout={event => {
                  setDynamicHeight(event.nativeEvent.layout.height);
                }}>
                {props.bottomChildren}
              </View>
            </Animated.View>
          </View>
          <View>{props.bottomAdditionalView}</View>
        </TouchableOpacity>
      </View>
    );
  }),
);

const ExpandCardStyle = StyleSheet.create({
  container: {},
  topContentWrapper: {},
  bottomContentWrapper: {},
  containerFeedback: {},
});
