import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import ListItem from './ListItem';
import CarouselBackground from './SliderBackground';

const CONTAINER_HEIGHT = 50;

const Carousel = ({route}) => {
  const {imagesData, imgActive} = route.params;
  const {width, height} = Dimensions.get('screen');
  const [loading, setLoading] = useState(true);
  const [sliderImages, setSliderImages] = useState(imagesData);
  const [orientation, setOrientation] = useState(
    height < width ? 'LANDSPACE' : 'PORTRAIT',
  );
  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    });
  }, [height, width]);

  const ScrollX = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  let _clampedScrollValue = 0;
  let _offsetValue = 0;
  let _scrollValue = 0;

  useEffect(() => {
    ScrollX.addListener(({value}) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue + diff, 0),
        CONTAINER_HEIGHT,
      );
    });
    offsetAnim.addListener(({value}) => {
      _offsetValue = value;
    });
  }, []);

  let scrollEndTimer = null;
  const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer);
  };
  const onMomentumScrollEnd = () => {
    const toValue =
      _scrollValue > CONTAINER_HEIGHT &&
      _clampedScrollValue > CONTAINER_HEIGHT / 2
        ? _offsetValue + CONTAINER_HEIGHT
        : _offsetValue - CONTAINER_HEIGHT;

    Animated.timing(offsetAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomentumScrollEnd, 150);
  };

  useEffect(() => {
    const shiftingItem = sliderImages.find((_, i) => i === imgActive);
    if (shiftingItem) {
      let data = [...sliderImages];
      const filteredData = data.filter(el => el.id !== shiftingItem.id);
      filteredData.unshift(shiftingItem);
      setSliderImages(filteredData);
    }
  }, [imgActive]);

  return (
    <View
      style={{
        width,
      }}>
      <View style={styles.mainContainer}>
        {loading && (
          <View style={styles.loaderBox}>
            <ActivityIndicator
              color={'#fff'}
              size={'large'}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        )}
        <View
          style={{
            width,
          }}>
          <CarouselBackground
            scrollX={ScrollX}
            imagesData={sliderImages}
            setLoading={setLoading}
          />
        </View>
        <Animated.FlatList
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: ScrollX}}}],
            {useNativeDriver: true},
          )}
          style={{width: '100%'}}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          scrollEventThrottle={1}
          data={sliderImages}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          pagingEnabled
          keyExtractor={(_, index) => index}
          renderItem={({item}) => (
            <ListItem item={item} orientation={orientation} />
          )}
        />
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
  },
  loaderBox: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});
