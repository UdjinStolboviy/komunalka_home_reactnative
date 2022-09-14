import React, {useEffect, useRef} from 'react';

import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import {observer} from 'mobx-react';
import {IAppCoreService} from '../../../../services/core/app.core.service.interface';
import {Flat, IFlat} from 'app/data/storage/flat/flat.model';
import {ScreenDimensions} from 'app/assets/constants/codes/ScreenDimensions';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {ExpandCard, ExpandCardRef} from 'app/ui/components/Common/ExpandCard';
import {Colors} from 'app/assets/constants/colors/Colors';
import {FlatCardGeneralInfo} from 'app/ui/screens/flat/flat-card/FlatCardGeneralInfo';
import {FlatCardAdvancedInfo} from './FlatCardAdvancedInfo';
import {FlatBottomView} from './FlatBottonView';
import {Shadow} from 'react-native-shadow-2';

export interface FlatExploreCardProps {
  index: number;
  flat: IFlat;
  title: string;
  type: string;
  homeIndex: number;
  flatIndex: number;
  onCardOpened?: () => void;
  userId: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const EXPLORE_CARD_WIDTH = ScreenDimensions.SCREEN_WIDTH * 0.9;
export const FlatExploreCard = observer(
  ({
    flat,
    index,
    onCardOpened,
    containerStyle,
    title,
    type,
    homeIndex,
    flatIndex,
    userId,
  }: FlatExploreCardProps) => {
    const app: IAppCoreService = useAppInjection();

    const expandRef = useRef<ExpandCardRef>();

    useEffect(() => {
      return () => {
        _close();
      };
    }, []);

    const _close = () => {
      expandRef.current && expandRef.current.close && expandRef.current.close();
    };

    const _onPress = () => {
      expandRef.current && expandRef.current.press && expandRef.current.press();
    };

    const _handleOnCardOpened = () => {
      onCardOpened && onCardOpened();
      _changeCardStyle(true);
    };

    const _handleOnCardCloseFinished = () => {
      _changeCardStyle(false);
    };

    const _changeCardStyle = (open: boolean) => {
      if (open) {
      } else {
      }
    };

    const _getBorder = () => {
      return FlatExploreCardStyle.highlightedBorder;
    };

    return (
      <Shadow
        offset={[0, 0]}
        paintInside={false}
        distance={8}
        containerViewStyle={{}}
        viewStyle={{
          marginBottom: 30,
          width: '100%',
        }}>
        <View style={[FlatExploreCardStyle.container, containerStyle]}>
          <ExpandCard
            pressDisabled={false}
            ref={expandRef}
            deps={[]}
            onCardOpened={_handleOnCardOpened}
            onCardCloseFinished={_handleOnCardCloseFinished}
            onAction={opened => console.log('opened', opened)}
            containerStyle={[FlatExploreCardStyle.card, _getBorder()]}
            topChildren={
              <FlatCardGeneralInfo
                onPress={_onPress}
                flat={flat}
                title={title}
                type={type}
                homeIndex={homeIndex}
                flatIndex={flatIndex}
                userId={userId}
              />
            }
            bottomChildren={
              <FlatCardAdvancedInfo
                onPublishPress={_onPress}
                index={index}
                flat={flat}
                homeIndex={homeIndex}
                flatIndex={flatIndex}
                userId={userId}
              />
            }
            bottomAdditionalView={
              <FlatBottomView
                index={index}
                flat={flat}
                homeIndex={homeIndex}
                flatIndex={flatIndex}
                userId={userId}
              />
            }
          />
        </View>
      </Shadow>
    );
  },
);

const FlatExploreCardStyle = StyleSheet.create({
  container: {
    width: EXPLORE_CARD_WIDTH,
    borderRadius: 50,
    alignSelf: 'center',
  },
  card: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  highlightedBorder: {
    borderWidth: 2,
    borderColor: Colors._007AFF,
  },
});
