import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import CloseIcon from './CloseIcon';
import ListItem from './ListItem';
import CarouselBackground from './SliderBackground';

const CONTAINER_HEIGHT = 50;

const Carousel = ({route}) => {
  const {imagesData, imgActive} = route.params;
  const {width, height} = Dimensions.get('screen');
  const [loading, setLoading] = useState(true);
  const [sliderImages, setSliderImages] = useState(imagesData);
  const [scrollValue, setScrollValue] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollViewRef = useRef();
  const ScrollX = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  let _clampedScrollValue = 0;
  let _offsetValue = 0;
  let _scrollValue = 0;

  useEffect(() => {
    ScrollX.addListener(({value}) => {
      setScrollValue(value);
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

  const handleChangeViewableItem = ({window: {width, height}}) => {
    const offsetforBigScreens = activeIndex * width;
    const offsetforSmallScreens = activeIndex * width;
    console.log(
      'activeIndex',
      activeIndex,
      'offsetforSmallScreens',
      offsetforSmallScreens,
    );
    if (width > height && activeIndex) {
      scrollViewRef.current?.scrollToOffset({
        offset: width > 700 ? offsetforBigScreens : offsetforSmallScreens,
        animated: true,
      });
    } else {
      scrollViewRef.current?.scrollToOffset({
        offset: 1,
        animated: true,
      });
    }
  };
  const viewabilityConfigCallbackPairs = useRef([
    {
      onViewableItemsChanged: ({viewableItems}) =>
        viewableItems[0]?.index > 0
          ? setActiveIndex(viewableItems[0].index)
          : setActiveIndex(null),
    },
  ]);

  Dimensions.addEventListener('change', handleChangeViewableItem);

  return (
    <View
      style={{
        width,
      }}>
      <Pressable style={styles.closeBox} onPress={() => navigation.goBack()}>
        <CloseIcon />
      </Pressable>
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
          ref={scrollViewRef}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          scrollEventThrottle={1}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          data={sliderImages}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          pagingEnabled
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => <ListItem item={item} keys={index} />}
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
  closeBox: {
    position: 'absolute',
    zIndex: 999,
    top: 20,
    right: 20,
  },
});
