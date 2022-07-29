import {Screens} from 'app/assets/constants/codes/Screens';
import {Colors} from 'app/assets/constants/colors/Colors';
import {AddImageIcon} from 'app/assets/Icons/AddImageIcon';
import {DeleteImageIcon} from 'app/assets/Icons/DeleteImageIcon';

import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IFlatImage} from 'app/data/storage/flat/flat.image.model';
import {IFlat} from 'app/data/storage/flat/flat.model';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {databaseFirebase} from 'app/services/firebase/firebase.database';
import {IconButtonUniversal} from 'app/ui/components/button/AppButton/IconButtonUniversal';
import {UniversalButton} from 'app/ui/components/button/AppButton/UniversalButton';
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
import {FlatBottomNavigatorBar} from './FlatBottomNavigatorBar';
import {FlatInfoView} from './FlatInfoView';
import {ImageFlat} from './ImageFlat';

export interface IFlatInfoScreenProps {
  flat?: IFlat;
}

export const FlatInfoScreen = observer((props: any) => {
  const app: IAppCoreService = useAppInjection();
  const modalDoneRef: any = useRef();
  const imageLoaderCardRef: any = useRef<ImageLoaderViewRefProps>();
  const flatIndex = props.route.params && props.route.params.flatIndex;
  const homeIndex = props.route.params && props.route.params.homeIndex;
  const fateful = app.storage.getHomesState();
  const home = fateful.getHomes()[homeIndex];
  const flat = home.flats[flatIndex];
  const [flatStage, setFlatStage] = useState<IFlat>(flat);
  const [flatNewStage, setFlatNevStage] = useState<IFlat>(flat);
  const [images, setImages] = useState<IFlatImage[]>([]);
  const [contentProgress, setContentProgress] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [connectionNet, setConnectionNet] = useState<boolean | null>(
    app.storage.getHomesState().getConnectNetwork(),
  );

  const reference = databaseFirebase(`homes/${homeIndex}/flats/${flatIndex}/`);
  const referenceImages = databaseFirebase(
    `homes/${homeIndex}/flats/${flatIndex}/images/`,
  );

  useEffect(() => {
    if (connectionNet) {
      reference
        .on('value', snapshot => {
          const data = snapshot.val();
          if (data) {
            setFlatStage(data);
            setFlatNevStage(data);
          }
        })
        .bind(this);
      referenceImages
        .on('value', snapshot => {
          const data = snapshot.val();
          if (data) {
            setImages(data);
          }
        })
        .bind(this);
    }
    setImages(flatStage.images!);
    setFlatStage(flat);
    setFlatNevStage(flat);
  }, [flat, home]);

  const onPressList = () => {
    app.navigationService.navigate(Screens._FLAT_LIST_UTILITY_BILLS, {
      calculatorFlat: flatStage.calculatorFlat,
      flatIndex: flatIndex,
      homeIndex: homeIndex,
    });
  };
  const onPressCalculator = () => {
    app.navigationService.navigate(Screens._FLAT_CALCULATOR, {
      calculatorFlat: flatStage.calculatorFlat,
      flatIndex: flatIndex,
      homeIndex: homeIndex,
      price: flatStage.price,
    });
  };

  const onPressSave = () => {
    setLoading(true);
    if (connectionNet) {
      reference.update({
        id: uid(),
        title: flatStage.title,
        price: flatNewStage.price,
        area: flatNewStage.area,
        rooms: flatNewStage.rooms,
        dateSettlement: flatNewStage.dateSettlement,
        dateEviction: flatNewStage.dateEviction,
        description: flatNewStage.description,
        wifiName: flatNewStage.wifiName,
        wifiPassword: flatNewStage.wifiPassword,
        address: flatNewStage.address,
        occupant: flatNewStage.occupant,
        phoneOccupant: flatNewStage.phoneOccupant,
        emailOccupant: flatNewStage.emailOccupant,
        owner: flatNewStage.owner,
        ownerPhone: flatNewStage.ownerPhone,
        ownerEmail: flatNewStage.ownerEmail,
        floor: flatNewStage.floor,
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
        reference.update({images: [result, ...flatStage.images]});
        modalDoneRef.current && modalDoneRef.current.toggleModal();
        setImages([result, ...flatStage.images]);
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
      if (flatStage.images.length > 1) {
        const result: IFlatImage[] =
          flatStage.images &&
          flatStage.images.splice(1, flatStage.images.length);
        reference.update({images: [...result]});
        modalDoneRef.current && modalDoneRef.current.toggleModal();
        // app.storage.getHomesState().refreshHome();
      }
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
      return <ImageFlat imagStack={images} />;
    }
  }, [loading, images]);

  return (
    <View style={style.container}>
      <AppHeader progress={contentProgress} title={flatStage.title} />
      <ContentProgressScrollView
        onProgressChange={progress => setContentProgress(progress)}>
        <Loader />
        <View style={style.flatInfo}>
          <ImageLoader
            ref={imageLoaderCardRef}
            locked={!props.isAdmin}
            image={flatStage.images![0].url}
            containerStyle={style.imageContainer}
            loaderContainerStyle={style.placeholder}
            loadingBackgroundColor={Colors._FFFFFF}
            placeholder={<Placeholder />}
            imageWidth={1000}
            imageHeight={1000}
            children={null}
            onLoading={loading => setLoading(loading)}
            onImageChange={onImageChange}
            namePicture={`Home${homeIndex}_flat${flatIndex}`}
          />
          <View style={style.buttonImageContent}>
            <Shadow viewStyle={style.buttonContainer}>
              <IconButtonUniversal containerStyle={[]} onPress={onImageDelete}>
                <DeleteImageIcon />
              </IconButtonUniversal>
            </Shadow>

            <Shadow viewStyle={style.buttonContainer}>
              <IconButtonUniversal containerStyle={[]} onPress={onImagePress}>
                <AddImageIcon />
              </IconButtonUniversal>
            </Shadow>
          </View>
        </View>

        <View style={style.middleWrapper}>
          <FlatInfoView
            isAdmin={true}
            flat={flatStage}
            flatIndex={flatIndex}
            homeIndex={homeIndex}
            onChangeFlat={(value: IFlat) => setFlatNevStage(value)}
          />
          <UniversalButton
            title={'Список комунальних розрахунків'}
            onPress={onPressList}
            containerStyle={[style.buttonContainer, {marginTop: 25}]}
          />
          <UniversalButton
            title={'Конкулятор комунальних послуг'}
            onPress={onPressCalculator}
            containerStyle={style.buttonContainer}
          />
          <UniversalButton
            title={'Зберегти всю інформацію'}
            containerStyle={style.buttonContainer}
            onPress={onPressSave}
          />
          <View style={{height: 40}} />
        </View>
      </ContentProgressScrollView>
      <FlatBottomNavigatorBar
        onPressList={onPressList}
        onPressCalculator={onPressCalculator}
      />
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
    borderRadius: 12,
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
