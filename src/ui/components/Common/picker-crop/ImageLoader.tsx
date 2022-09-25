import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {IAppCoreService} from '../../../../services/core/app.core.service.interface';

import {IPickedImage} from './ImagePickerView';
import {Colors} from 'app/assets/constants/colors/Colors';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {Screens} from 'app/assets/constants/codes/Screens';

export interface PowerfulPictureProps {
  image: string | null | undefined;
  onImageChange?: (image?: string) => void;
  onPickedImageChange?: (image: IPickedImage) => void;
  locked?: boolean;
  onLoading?: (loading: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  loaderContainerStyle?: StyleProp<ViewStyle>;
  placeholder?: React.ReactNode;
  imageWidth?: number;
  imageHeight?: number;
  loadingBackgroundColor?: string;
  children: React.ReactNode;
  namePicture?: string;
}

export interface ImageLoaderViewRefProps {
  pickImage?: () => void;
}

export const ImageLoader = forwardRef((props: PowerfulPictureProps, ref) => {
  const MAX_WIDTH = 640;
  const MAX_HEIGHT = 640;
  const app: IAppCoreService = useAppInjection();
  const [imageLoading, setImageLoading] = useState(false);
  const [imageBroken, setImageBroken] = useState(false);

  const NO_PERMISSIONS_PROVIDED = 'E_NO_LIBRARY_PERMISSION';

  useImperativeHandle(ref, () => ({
    pickImage() {
      return _pickImage();
    },
  }));

  const Loader = () => {
    if (imageLoading) {
      return (
        <View
          style={[
            PowerfulPictureStyle.loader,
            props.loaderContainerStyle,
            {display: imageLoading ? undefined : 'none'},
            {
              backgroundColor: props.loadingBackgroundColor || 'transparent',
            },
          ]}>
          <ActivityIndicator color={Colors._007AFF} />
        </View>
      );
    } else {
      return null;
    }
  };

  const renderView = () => {
    return (
      <View style={{flex: 1}}>
        {props.placeholder}
        {props.children}
      </View>
    );
  };

  const _pickImage = async () => {
    try {
      setImageLoading(true);
      props.onLoading && props.onLoading(true);
      const localImage = await ImagePicker.openPicker({
        width: props.imageWidth || MAX_WIDTH,
        height: props.imageHeight || MAX_HEIGHT,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 0.8,
        path: 'images',
      });

      const newImageUri = await app.utilsService.localUrlToRemote(
        localImage.path,
        `${props.namePicture}_${localImage.filename}` || 'image',
        localImage.filename || 'image/jpg',
      );
      if (newImageUri) {
        props.onImageChange && props.onImageChange(newImageUri as string);
      }
      props.onLoading && props.onLoading(false);
    } catch (e) {
      setImageLoading(false);
      if (e.code === NO_PERMISSIONS_PROVIDED) {
        app.navigationService.navigate(Screens._ACCOUNT_SETTING);
      }
      props.onLoading && props.onLoading(false);
      app.logger.info('Pick image error: ', e);
    }
  };

  return (
    <TouchableOpacity
      disabled={props.locked || imageLoading}
      activeOpacity={0.8}
      onPress={_pickImage}
      style={[PowerfulPictureStyle.container, props.containerStyle]}>
      {renderView()}
    </TouchableOpacity>
  );
});

const PowerfulPictureStyle = StyleSheet.create({
  container: {},
  cornerIcon: {
    position: 'absolute',
    bottom: -8,
    right: -8,
  },
  image: {
    borderRadius: 4,
    width: '100%',
    height: '100%',
  },
  loader: {
    display: 'none',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePicker: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
