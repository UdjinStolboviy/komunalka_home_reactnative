import React, {forwardRef, useImperativeHandle} from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
  Platform,
  //Share,
} from 'react-native';

import Share, {ShareOptions} from 'react-native-share';

import {observer} from 'mobx-react';
import {SharingButtonIcon} from 'app/assets/Icons/SharingButtonIcon';
import {Texts} from 'app/assets/constants/codes/Texts';

export interface SharingButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  message: string;
}

export interface SharingButtonRef {
  clear: () => void;
}

export const SharingButton = observer(
  forwardRef((props: SharingButtonProps, ref) => {
    useImperativeHandle(ref, () => ({
      clear() {
        console.log('clear');
      },
    }));
    const title = Texts.CALCULATION_OF_UTILITIES;
    const message = props.message;
    const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';
    const options: ShareOptions = Platform.select({
      ios: {
        activityItemSources: [
          {
            // For using custom icon instead of default text icon at share preview when sharing with message.
            placeholderItem: {
              type: 'url',
              content: icon,
            },
            item: {
              default: {
                type: 'text',
                content: `${message}`,
              },
            },
            linkMetadata: {
              title: message,
              icon: icon,
            },
          },
        ],
      },
      android: {
        showAppsToView: true,
        title: title,
        subject: title,
        message: `${message}`,
      },

      default: {
        title,
        subject: title,
        message: `${message}`,
      },
    });

    // const onShare = async () => {
    //   try {
    //     const result = await Share.share({
    //       message:
    //         'React Native | A framework for building native apps using React',
    //     });
    //     if (result.action === Share.sharedAction) {
    //       if (result.activityType) {
    //         // shared with activity type of result.activityType
    //       } else {
    //         // shared
    //       }
    //     } else if (result.action === Share.dismissedAction) {
    //       // dismissed
    //     }
    //   } catch (error) {
    //     // alert(error.message);
    //   }
    // };

    const _handleShareVia = async () => {
      try {
        await Share.open(options);
        // await Share.open({url: link});
      } catch (e) {
        //alert(e.message);
        //app.logger.error('Share error', e.message);
      }
    };

    return (
      <View style={[style.container, props.containerStyle]}>
        <TouchableOpacity onPress={_handleShareVia}>
          <SharingButtonIcon />
        </TouchableOpacity>
      </View>
    );
  }),
);

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
  },
});
