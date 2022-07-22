import React, { useEffect } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Colors } from "../../../../../constants/Colors";
import { IAppCoreService } from "../../../../../services/core/app.core.service.interface";
import { useAppInjection } from "../../../../../ioc/inversify.config";
import { observer } from "mobx-react";
import { CreateOpportunityState } from "../../../../../storage/opportunities/create-opportunity/create.opportunity.state";
import { PowerfulPicture } from "./PowerfulPicture";
import { SUBSCRIPTION_PRODUCTS } from "../../../../../constants/Subscriptions";
import config from "../../../../../config/config";

export interface PowerfulPicturesViewProps {
  containerStyle?: StyleProp<ViewStyle>
}

export const PowerfulPicturesView = observer((props: PowerfulPicturesViewProps) => {

  const app: IAppCoreService = useAppInjection();
  const plan = app.storage.getUserAccount().getPlan();
  const createOpportunityState: CreateOpportunityState = app.storage.getCreateOpportunityState()!;
  const info = createOpportunityState.getInfo();
  const firstImage = info.getImageByIndex(0);
  const secondImage = info.getImageByIndex(1);
  const thirdImage = info.getImageByIndex(2);

  useEffect(() => {
    },
    [
      firstImage.getUri(),
      secondImage.getUri(),
      thirdImage.getUri(),
      info.getImages(),
      plan
    ])

  const _setFirstImage = (uri: string) => {
    info.setImage(uri);
    firstImage.setUri(uri);
  }

  const _setImage = (uri: string | undefined, index: number) => {
    if (!uri && index === 0) {
      if (secondImage.getUri() || thirdImage.getUri()) {
        _reorderImages();
        return;
      }
    }
    if (index === 0) {
      _setFirstImage(uri!);
      return;
    }
    if (index === 1) {
      secondImage.setUri(uri!);
      return;
    }
    if (index === 2) {
      thirdImage.setUri(uri!);
      return;
    }
  };

  const _definePictureLocked = (index: number) => {
    if (index === 0) return false;
    if (!plan || !plan.getActive()) return true;
    if (index === 1 && plan.getProductId().toLowerCase() === SUBSCRIPTION_PRODUCTS[config.app.bundle]['power'] ||
      index === 1 && plan.getProductId().toLowerCase() === SUBSCRIPTION_PRODUCTS[config.app.bundle]['power_plus']) {
      return false;
    }
    if (index === 2 && plan.getProductId().toLowerCase() === SUBSCRIPTION_PRODUCTS[config.app.bundle]['power_plus']) {
      return false;
    }
    return true
  };

  const _reorderImages = () => {
    firstImage.setUri(secondImage.getUri()! || thirdImage.getUri());
    if (firstImage.getUri() !== thirdImage.getUri()) {
      secondImage.setUri(thirdImage.getUri()!)
    }
    thirdImage.setUri(undefined);
  }

  return (
    <View style={[style.container, props.containerStyle]}>
      <PowerfulPicture
        onImageChange={(uri: string | undefined) => _setImage(uri, 0)}
        image={firstImage.getUri()}
        locked={_definePictureLocked(0)}
        additionalText='Main Image'
      />
      <PowerfulPicture
        onImageChange={(uri: string | undefined) => _setImage(uri, 1)}
        image={secondImage.getUri()}
        locked={_definePictureLocked(1)}
      />
      <PowerfulPicture
        onImageChange={(uri: string | undefined) => _setImage(uri, 2)}
        image={thirdImage.getUri()}
        locked={_definePictureLocked(2)}
      />
    </View>
  )
});


const style = StyleSheet.create({
  container: {
    width: '92%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  counterText: {
    marginTop: '8%',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.COLOR_FFFFFF
  }
});


