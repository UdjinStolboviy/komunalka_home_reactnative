import {ImageNotIcon} from 'app/assets/Icons/ImageNotIcon';
import {FlatImage, IFlatImage} from 'app/data/storage/flat/flat.image.model';
import {observer} from 'mobx-react';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {Text, View, SafeAreaView, Image, FlatList} from 'react-native';


export interface IImageFlat {
  imagStack: IFlatImage[];
}

export const ImageFlat = observer((props: IImageFlat) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageBroken, setImageBroken] = useState(false);

  const carouselItems = props.imagStack;

  useEffect(() => {
   // console.log('carouselItems', carouselItems);
  }, [carouselItems]);

  const ref = useRef(null);

  const renderNotImage = () => <ImageNotIcon />;

  const RenderItem = (itemName: any, indexName: any) => {
    return (
      <View
        style={{
          backgroundColor: 'floralwhite',
          height: 200,
          width: 200,
          marginLeft: 10,
        }}>
        {carouselItems[itemName.index].url !== '' ? (
          <Image
            onError={() => setImageBroken(true)}
            source={{uri: carouselItems[itemName.index].url}}
            style={{width: 200, height: 200, borderRadius: 10}}
          />
        ) : null}
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
      }}>
      {carouselItems && carouselItems[0] ? (
        <View
          style={{
            width: '100%',
          }}>
          <FlatList
            horizontal
            data={carouselItems}
            keyExtractor={item => Math.random().toString()}
            renderItem={({item, index}) => (
              <RenderItem itemName={item} index={index} />
            )}
            scrollEventThrottle={16}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            snapToAlignment="start"
          />
        </View>
      ) : (
        renderNotImage()
      )}
    </View>
  );
});
