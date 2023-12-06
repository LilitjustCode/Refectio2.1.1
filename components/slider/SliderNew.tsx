import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import ListItem from './ListItem';
import CarouselBackground from './SliderBackground';
const Carousel: React.FC = ({imagesData, imgActive}: any) => {
  const {width} = Dimensions.get('screen');
  const ScrollX: Animated.Value = useRef(new Animated.Value(0)).current;
  const [sliderImages, setSliderImages] = useState(imagesData);
  useEffect(() => {
    const shiftingItem = sliderImages.find(
      (_: undefined, i: number) => i === imgActive,
    );
    if (shiftingItem) {
      let data = [...sliderImages];
      const filteredData = data.filter((el: any) => el.id !== shiftingItem.id);
      filteredData.unshift(shiftingItem);
      setSliderImages(filteredData);
    }
  }, [imgActive]);

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          width,
        }}>
        <CarouselBackground scrollX={ScrollX} imagesData={sliderImages} />
      </View>
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: ScrollX}}}],
          {useNativeDriver: false},
        )}
        style={{width: '100%'}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        data={sliderImages}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        keyExtractor={(_, index: any) => index}
        renderItem={({item}: {item: any}) => <ListItem item={item} />}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
  },
});
