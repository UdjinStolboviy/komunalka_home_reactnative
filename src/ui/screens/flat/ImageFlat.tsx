import {ImageNotIcon} from 'app/assets/Icons/ImageNotIcon';
import {FlatImage, IFlatImage} from 'app/data/storage/flat/flat.image.model';
import React, {useState, useCallback, useRef} from 'react';
import {Text, View, SafeAreaView, Image} from 'react-native';

import Carousel from 'react-native-snap-carousel';

export interface IImageFlat {
  imagStack: IFlatImage[];
}

export const ImageFlat = (props: IImageFlat) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageBroken, setImageBroken] = useState(false);
  const carouselItems = props.imagStack;

  const ref = useRef(null);

  const renderItem = useCallback(
    ({item, index}: any) => (
      <View
        style={{
          backgroundColor: 'floralwhite',
          height: 250,
          padding: 5,
          marginLeft: 25,
          marginRight: 25,
        }}>
        {item.url && !imageBroken ? (
          <Image
            onError={() => setImageBroken(true)}
            source={{
              uri: item.url,
            }}
            style={{width: '100%', height: '100%'}}
          />
        ) : (
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageNotIcon />
          </View>
        )}
      </View>
    ),
    [],
  );

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
      }}>
      <Carousel
        layout="tinder"
        ref={ref}
        data={carouselItems}
        sliderWidth={400}
        itemWidth={400}
        renderItem={renderItem}
        onSnapToItem={index => setActiveIndex(index)}
      />
    </View>
  );
};
