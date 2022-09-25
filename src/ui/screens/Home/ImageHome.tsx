import {ImageNotIcon} from 'app/assets/Icons/ImageNotIcon';
import {FlatImage, IFlatImage} from 'app/data/storage/flat/flat.image.model';
import {observer} from 'mobx-react';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {Text, View, SafeAreaView, Image} from 'react-native';

import Carousel from 'react-native-snap-carousel';

export interface IImageFlat {
  imagStack: string;
}

export const ImageHome = observer((props: IImageFlat) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageBroken, setImageBroken] = useState(false);

  const carouselItems = props.imagStack;

  useEffect(() => {}, [carouselItems]);

  const ref = useRef(null);

  const renderNotImage = () => <ImageNotIcon />;

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
      }}>
      {carouselItems && !imageBroken ? (
        <View
          style={{
            backgroundColor: 'floralwhite',
            height: 250,
            width: '100%',
            zIndex: 8,
          }}>
          <Image
            onError={() => setImageBroken(true)}
            source={{uri: carouselItems}}
            style={{width: '100%', height: '100%', borderRadius: 20}}
          />
        </View>
      ) : (
        renderNotImage()
      )}
    </View>
  );
});
