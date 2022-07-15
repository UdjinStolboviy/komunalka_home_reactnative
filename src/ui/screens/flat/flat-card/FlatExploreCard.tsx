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

export interface FlatExploreCardProps {
  index: number;
  flat: IFlat;
  title: string;
  type: string;
  homeIndex: number;
  flatIndex: number;
  onCardOpened?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const EXPLORE_CARD_WIDTH = ScreenDimensions.SCREEN_WIDTH * 0.91;
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
      <View style={[FlatExploreCardStyle.container, containerStyle]}>
        <ExpandCard
          pressDisabled={false}
          ref={expandRef}
          deps={[]}
          onCardOpened={_handleOnCardOpened}
          onCardCloseFinished={_handleOnCardCloseFinished}
          onAction={opened => console.log('opened', opened)}
          containerStyle={[
            FlatExploreCardStyle.card,
            _getBorder(),
            {backgroundColor: Colors._FFFFFF},
          ]}
          topChildren={
            <FlatCardGeneralInfo
              onPress={_onPress}
              flat={flat}
              title={title}
              type={type}
              homeIndex={homeIndex}
              flatIndex={flatIndex}
            />
          }
          bottomChildren={
            <FlatCardAdvancedInfo
              onPublishPress={_onPress}
              index={index}
              flat={flat}
            />
          }
          bottomAdditionalView={<FlatBottomView index={index} flat={flat} />}
        />
      </View>
    );
  },
);

const FlatExploreCardStyle = StyleSheet.create({
  container: {
    marginBottom: 20,
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: {
      width: 0.2,
      height: 2,
    },
    elevation: 3,
    backgroundColor: Colors._FFFFFF,
    borderRadius: 8,
    width: EXPLORE_CARD_WIDTH,
    alignSelf: 'center',
  },
  card: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  highlightedBorder: {
    borderWidth: 2,
    borderColor: Colors._007AFF,
  },
});
