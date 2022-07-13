import {IFlatImage} from 'app/data/storage/flat/flat.image.model';
import React, {useState, useCallback, useRef} from 'react';
import {Text, View, SafeAreaView, Image} from 'react-native';

import Carousel from 'react-native-snap-carousel';

const conImag =
  'https://firebasestorage.googleapis.com/v0/b/komunalka-home.appspot.com/o/pic4.jpeg?alt=media&token=366974e5-c5bd-47f9-b822-86b6ae32d7af';

export interface IImageFlat {
  imagStack: IFlatImage[];
}

export const ImageFlat = (props: IImageFlat) => {
  const [activeIndex, setActiveIndex] = useState(0);
  //   const [carouselItems, setCarouselItems] = useState<IFlatImage[] | null>(
  //     props.imagStack,
  //   );
  const carouselItems = props.imagStack;
  //console.log('carouselItems', carouselItems);
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
        <Image
          source={{
            uri: item.url ? item.url : conImag,
          }}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    ),
    [],
  );

  return (
    <View style={{width: '100%', height: 300, alignItems: 'center'}}>
      <Carousel
        layout="tinder"
        ref={ref}
        data={carouselItems}
        sliderWidth={300}
        itemWidth={300}
        renderItem={renderItem}
        onSnapToItem={index => setActiveIndex(index)}
      />
    </View>
  );
};
