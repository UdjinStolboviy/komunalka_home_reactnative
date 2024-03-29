import {ImageNotIcon} from 'app/assets/Icons/ImageNotIcon';
import {FlatImage, IFlatImage} from 'app/data/storage/flat/flat.image.model';
import {observer} from 'mobx-react';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {Text, View, SafeAreaView, Image} from 'react-native';

import Carousel from 'react-native-snap-carousel';

export interface IImageFlat {
  imagStack: IFlatImage[];
}

export const ImageFlat = observer((props: IImageFlat) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageBroken, setImageBroken] = useState(false);

  const carouselItems = props.imagStack;

  useEffect(() => {}, [carouselItems]);

  const ref = useRef(null);

  const renderNotImage = () => <ImageNotIcon />;

  const renderItem = useCallback(
    ({item, index}: any) => (
      <View
        style={{
          backgroundColor: 'floralwhite',
          height: 300,
        }}>
        {item.url && !imageBroken ? (
          <Image
            onError={() => setImageBroken(true)}
            source={{
              uri: item.url,
            }}
            style={{width: '87%', height: '100%', borderRadius: 20}}
          />
        ) : null}
      </View>
    ),
    [carouselItems],
  );

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
      }}>
      {carouselItems.length > 0 && carouselItems[0].url ? (
        <Carousel
          layout="tinder"
          ref={ref}
          data={carouselItems}
          sliderWidth={350}
          sliderHeight={350}
          itemWidth={400}
          itemHeight={400}
          renderItem={renderItem}
          onSnapToItem={index => setActiveIndex(index)}
          containerCustomStyle={{
            borderRadius: 20,
          }}
          contentContainerCustomStyle={{marginLeft: 0}}
        />
      ) : (
        renderNotImage()
      )}
    </View>
  );
});
