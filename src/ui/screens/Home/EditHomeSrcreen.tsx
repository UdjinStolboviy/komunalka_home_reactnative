import {Screens} from 'app/assets/constants/codes/Screens';
import {Colors} from 'app/assets/constants/colors/Colors';
import {AddImageIcon} from 'app/assets/Icons/AddImageIcon';
import {DeleteImageIcon} from 'app/assets/Icons/DeleteImageIcon';

import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IFlatImage} from 'app/data/storage/flat/flat.image.model';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {IHome} from 'app/data/storage/home/home.model';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {databaseFirebase} from 'app/services/firebase/firebase.database';
import {IconButtonUniversal} from 'app/ui/components/button/AppButton/IconButtonUniversal';
import {UniversalButton} from 'app/ui/components/button/AppButton/UniversalButton';
import {UniversalButtonText} from 'app/ui/components/button/AppButton/UniversalButtonText';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {
  ImageLoader,
  ImageLoaderViewRefProps,
} from 'app/ui/components/Common/picker-crop/ImageLoader';
import {ContentProgressScrollView} from 'app/ui/components/Common/Scroll/ContentProgressScrollView';
import {uid} from 'app/utils/id-random';
import {observer} from 'mobx-react';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {ModalDoneScreen} from '../modal/action-modal/ModalDone';

import {HomeInfoView} from './HomeInfoView';

import {ImageHome} from './ImageHome';

export const EditHomeScreen = observer((props: any) => {
  const app: IAppCoreService = useAppInjection();
  const modalDoneRef: any = useRef();
  const imageLoaderCardRef: any = useRef<ImageLoaderViewRefProps>();
  const fateful = app.storage.getHomesState();
  const homeIndex: number = props.route.params && props.route.params.homeIndex;
  const userId: string = props.route.params && props.route.params.userUid;
  const home = fateful.getHomes()[homeIndex];
  const referenceHome = databaseFirebase(
    `/storage/users/${userId}/homes/${homeIndex}`,
  );
  const referenceImages = databaseFirebase(
    `storage/users/${userId}/homes/${homeIndex}/images`,
  );
  const [contentProgress, setContentProgress] = useState<number>(0);
  const [homeStage, setHomeStage] = useState<IHome>(home);
  const [titleHome, setTitleHome] = useState<string>('');
  const [addressHome, setAddressHome] = useState<string>('');
  const [urlImageHome, setUrlImageHome] = useState<string>('');
  const [refresh, setRefresh] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [connectionNet, setConnectionNet] = useState<boolean | null>(
    app.storage.getHomesState().getConnectNetwork(),
  );

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  useEffect(() => {
    if (connectionNet) {
      referenceHome
        .on('value', snapshot => {
          const data = snapshot.val();
          if (data) {
            setHomeStage(data);
          }
        })
        .bind(this);
      referenceImages
        .on('value', snapshot => {
          const data = snapshot.val();
          if (data) {
            setUrlImageHome(data.url);
          }
        })
        .bind(this);
    }
  }, [home]);

  const onPressSave = () => {
    setLoading(true);
    if (connectionNet) {
      referenceHome.update({
        title: titleHome,
        address: addressHome,
      });
      app.storage.getHomesState().refreshHome();
      modalDoneRef.current && modalDoneRef.current.toggleModal();
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const onImagePress = () => {
    imageLoaderCardRef.current && imageLoaderCardRef.current.pickImage();
  };

  const Placeholder = () => {
    return null;
  };

  const onImageChange = async (image?: string) => {
    setLoading(true);

    try {
      if (connectionNet) {
        const result: IFlatImage = {
          url: image,
        };
        referenceImages.update({url: result.url});
        modalDoneRef.current && modalDoneRef.current.toggleModal();
        setUrlImageHome(result.url ? result.url : '');
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (e) {
      console.log(e, 'error upload image onImageChange');
    }
  };

  const onImageDelete = () => {
    setLoading(true);

    if (connectionNet) {
      referenceImages.update({url: ''});
      modalDoneRef.current && modalDoneRef.current.toggleModal();
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const Loader = useCallback(() => {
    if (loading) {
      return (
        <View
          style={[
            style.loader,
            props.loaderContainerStyle,
            {display: loading ? undefined : 'none'},
            {
              backgroundColor: props.loadingBackgroundColor || 'transparent',
            },
          ]}>
          <ActivityIndicator size={'large'} color={Colors._007AFF} />
        </View>
      );
    } else {
      return <ImageHome imagStack={urlImageHome} />;
    }
  }, [loading, urlImageHome]);

  return (
    <View style={style.container}>
      <AppHeader progress={contentProgress} title={home.title} />
      <ContentProgressScrollView
        onProgressChange={progress => setContentProgress(progress)}>
        <Loader />
        <View style={style.flatInfo}>
          <ImageLoader
            ref={imageLoaderCardRef}
            locked={!props.isAdmin}
            image={home.images ? home.images.url : ''}
            containerStyle={style.imageContainer}
            loaderContainerStyle={style.placeholder}
            loadingBackgroundColor={Colors._FFFFFF}
            placeholder={<Placeholder />}
            imageWidth={1000}
            imageHeight={1000}
            children={null}
            onLoading={loading => setLoading(loading)}
            onImageChange={onImageChange}
            namePicture={`${userId}Home${homeIndex}`}
          />
          <View style={style.buttonImageContent}>
            <IconButtonUniversal containerStyle={[]} onPress={onImageDelete}>
              <DeleteImageIcon />
            </IconButtonUniversal>

            <IconButtonUniversal containerStyle={[]} onPress={onImagePress}>
              <AddImageIcon />
            </IconButtonUniversal>
          </View>
        </View>

        <View style={style.middleWrapper}>
          <HomeInfoView
            isAdmin={true}
            home={home}
            homeIndex={homeIndex}
            onChangeAddressHome={(value: string) => setAddressHome(value)}
            onChangeTitleHome={(value: string) => setTitleHome(value)}
          />
          <UniversalButtonText
            title={'Зберегти всю інформацію'}
            containerStyle={style.buttonContainer}
            onPress={onPressSave}
          />
          <View style={{height: 40}} />
        </View>
      </ContentProgressScrollView>
      <ModalDoneScreen ref={modalDoneRef} />
    </View>
  );
});

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 1,
    height: 1,
  },
  placeholder: {
    borderWidth: 1,
    borderColor: Colors._007AFF,
    backgroundColor: Colors._FFFFFF,
    borderRadius: 4,
  },
  middleWrapper: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textDescription: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 7,
    color: Colors._007AFF,
  },
  buttonContainer: {
    marginVertical: 10,
  },

  modalWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  loader: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImageContent: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
});
