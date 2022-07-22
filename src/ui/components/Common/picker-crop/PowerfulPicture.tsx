import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../../../constants/Colors";
import { ImageIcon } from "../../../../common/icons/ImageIcon";
import { PhotoIcon } from "../../../../common/icons/PhotoIcon";
import { BackgroundTrashIcon } from "../../../../common/icons/BackgroundTrashIcon";
import ImagePicker from "react-native-image-crop-picker";
import { IAppCoreService } from "../../../../../services/core/app.core.service.interface";
import { useAppInjection } from "../../../../../ioc/inversify.config";
import { BackgroundLockIcon } from "../../../../common/icons/BacgroundLockIcon";
import { ScreenDimensions } from "../../../../../constants/ScreenDimensions";
import { Screens } from "../../../../../constants/Screens";
import { observer } from "mobx-react";

export interface PowerfulPictureProps {
  image?: string;
  onImageChange?: (image?: string) => void;
  locked?: boolean;
  onLoading?: (loading: boolean) => void;
  additionalText?: string
}


export const PowerfulPicture = observer((props: PowerfulPictureProps) => {

  const MAX_WIDTH = 640;
  const MAX_HEIGHT = 640;
  const app: IAppCoreService = useAppInjection();
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadingNewImage, setUploadingNewImage] = useState(false);

  useEffect(() => {
  }, [props.image])


  const NO_PERMISSIONS_PROVIDED = 'E_NO_LIBRARY_PERMISSION';

  const Loader = () => {
    if (imageLoading || uploadingNewImage) {
      return (
        <View style={[style.loader, {display: imageLoading || uploadingNewImage ? undefined : 'none'}]}>
          <ActivityIndicator color={Colors.COLOR_ED8C34}/>
        </View>
      )
    } else {
      return null;
    }
  };


  const renderView = () => {
    if (props.image) {
      return (
        <View style={{flex: 1}}>
          <Image
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            source={{uri: props.image}}
            style={[style.image]}
          />
          <Loader/>
        </View>

      )
    } else if (uploadingNewImage) {
      return <Loader/>
    } else {
      return (
        <View style={style.imagePicker}>
          <ImageIcon
            color={props.locked ? Colors.COLOR_808080 : Colors.COLOR_348CE5}
          />
        </View>
      )
    }
  };

  const renderIcon = () => {
    if (props.locked && props.image) {
      return <BackgroundTrashIcon onPress={_handleDeleteImage}/>
    }
    if (props.locked) {
      return (<BackgroundLockIcon/>)
    }
    if (uploadingNewImage || imageLoading) return null;
    if (props.image) {
      return <BackgroundTrashIcon onPress={_handleDeleteImage}/>
    } else {
      return <PhotoIcon/>
    }
  };

  const _handleDeleteImage = () => {
    // setImageUri(undefined);
    props.onImageChange && props.onImageChange(undefined);
  };

  const pickImage = async () => {
    try {
      props.onLoading && props.onLoading(true);
      const localImage = await ImagePicker.openPicker({
        width: MAX_WIDTH,
        height: MAX_HEIGHT,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 0.8,
        path: 'images'
      });
      setUploadingNewImage(true);
      const newImageUri = await app.utilsService.localUrlToRemote(localImage.path,
        localImage.filename || 'image', localImage.filename || 'image/jpg');
      setUploadingNewImage(false);
      props.onImageChange && props.onImageChange(newImageUri as string);
      props.onLoading && props.onLoading(false);
    } catch (e) {
      if (e.code === NO_PERMISSIONS_PROVIDED) {
        app.navigationService.navigate(Screens.SCREEN_PERMISSION, {
          text: 'No image permissions provided',
          additionalText: 'When you adjust settings, the opportunity information will be saved and Powerlinx will reload'
        });
      }
      setUploadingNewImage(false);
      props.onImageChange && props.onImageChange(undefined);
      props.onLoading && props.onLoading(false);
      app.logger.error('Pick image error: ', e);
    }
  };

  return (
      <TouchableOpacity
        disabled={props.locked || imageLoading || uploadingNewImage}
        activeOpacity={0.8}
        onPress={pickImage}
        style={[style.container, {
          backgroundColor: props.locked ? 'rgba(0, 0, 0, 0.06)' : 'rgba(52, 140, 229, 0.1)',
          borderColor: props.locked ? Colors.COLOR_808080 : Colors.COLOR_348CE5
        }]}
      >
        {renderView()}
        <View style={style.cornerIcon}>
          {renderIcon()}
        </View>
        {uploadingNewImage && <View style={style.blocker}/>}
        {props.additionalText ? <Text style={style.additionalText}>Main Image</Text> : null}
      </TouchableOpacity>

  )
});

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: '27%',
    aspectRatio: 1,
    borderRadius: 4,
  },
  cornerIcon: {
    position: 'absolute',
    bottom: -8,
    right: -8
  },
  image: {
    borderRadius: 4,
    width: '100%',
    height: '100%'
  },
  loader: {
    display: 'none',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagePicker: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  blocker: {
    position: 'absolute',
    top: -ScreenDimensions.SCREEN_HEIGHT / 2,
    right: -ScreenDimensions.SCREEN_WIDTH,
    width: ScreenDimensions.SCREEN_WIDTH,
    height: ScreenDimensions.SCREEN_HEIGHT
  },
  additionalText: {
    position: 'absolute',
    alignSelf: 'center',
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.COLOR_348CE5,
    bottom: -20
  },
});
