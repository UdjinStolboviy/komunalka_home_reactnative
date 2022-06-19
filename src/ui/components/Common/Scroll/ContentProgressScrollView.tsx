import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface ContentProgressScrollViewProps {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onProgressChange?: (progress: number) => void;
  onEndReached?: () => void;
}

export const ContentProgressScrollView = (
  props: ContentProgressScrollViewProps,
) => {
  const [y, setY] = useState(0);
  const [height, setHeight] = useState(0);
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    _changeProgress();
  });

  const _changeProgress = () => {
    const progress = _calculateProgress(y, height, layoutHeight);
    props.onProgressChange && props.onProgressChange(progress);
    if (progress >= 1) {
      props.onEndReached && props.onEndReached();
    }
  };

  const _calculateProgress = (
    y: number,
    height: number,
    layoutHeight: number,
  ) => {
    const heightDiff = height - layoutHeight;

    if (heightDiff === 0) {
      return 0;
    }
    const progress = y / heightDiff;
    if (height < layoutHeight) {
      return 1;
    }
    if (progress < 0) {
      return 0;
    }
    return progress;
  };

  const _onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    setY(y);
  };

  const _onContentSizeChange = (w: number, h: number) => {
    setHeight(h);
  };

  const _onLayout = (event: LayoutChangeEvent) => {
    setLayoutHeight(event.nativeEvent.layout.height);
  };

  return (
    <KeyboardAwareScrollView
      onLayout={_onLayout}
      onScroll={_onScroll}
      onContentSizeChange={_onContentSizeChange}
      keyboardShouldPersistTaps="always"
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      extraScrollHeight={220}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      style={props.containerStyle}>
      {props.children}
    </KeyboardAwareScrollView>
  );
};
