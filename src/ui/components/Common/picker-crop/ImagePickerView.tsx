import { Text, TouchableOpacity, View, Linking } from "react-native";
import { ImageIcon } from "../../common/icons/ImageIcon";
import * as React from "react";
import { ImagePickerViewStyle } from "../../../styles/components/views/image.picker.view.style";
import { IAppCoreService } from "../../../services/core/app.core.service.interface";
import { useAppInjection } from "../../../ioc/inversify.config";
import ImagePicker from 'react-native-image-crop-picker';
import { Screens } from "../../../constants/Screens";

export interface IPickedImage {
  imageType: 'local' | 'remote'
  uri: string;
  fileName?: string;
  type?: string;
}

export interface ImagePickerViewProps {
  containerStyle?: object;
  onImageLoaded?: (pickedImage: IPickedImage) => void;
  defaultViewDisabled?: boolean;
  children?: Element[] | Element;
  maxWidth?: number;
  maxHeight?: number;
  isCircle?:boolean;
  disabled?: boolean;
}

const NO_PERMISSIONS_PROVIDED = 'E_NO_LIBRARY_PERMISSION';

export const ImagePickerView = (props: ImagePickerViewProps) => {

  const app: IAppCoreService = useAppInjection();

  const handleOnPickImage = async () => {
    ImagePicker.openPicker({
      width: props.maxWidth,
      height: props.maxHeight,
      cropping: true,
      cropperCircleOverlay: props.isCircle,
      mediaType: 'photo',
      compressImageQuality:0.7,
      path:'images'
    }).then(image => {
      props.onImageLoaded && props.onImageLoaded({
        uri: image.path,
        type: image.mime || 'image/jpg',
        fileName: image.filename || 'image',
        imageType: 'local'
      });
    }).catch(error => {
      if(error.code === NO_PERMISSIONS_PROVIDED) {
        app.navigationService.navigate(Screens.SCREEN_PERMISSION, {
          text: 'No image permissions provided',
          additionalText: 'When you adjust settings, the opportunity information will be saved and Powerlinx will reload'
        });
      }
    })
  };

  if (props.defaultViewDisabled) {
    return (
      <TouchableOpacity
        disabled={props.disabled}
        activeOpacity={0.9}
        onPress={handleOnPickImage}
        style={props.containerStyle}>
        {props.children}
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity
        disabled={props.disabled}
        style={[ImagePickerViewStyle.container, props.containerStyle]}
        onPress={handleOnPickImage}
      >
        <View style={ImagePickerViewStyle.iconWrapper}>
          <ImageIcon/>
        </View>
        <View style={ImagePickerViewStyle.textContainer}>
          <Text style={ImagePickerViewStyle.text}>Add Image</Text>
        </View>
      </TouchableOpacity>
    )
  }


};
