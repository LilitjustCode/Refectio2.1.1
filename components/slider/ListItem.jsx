import React, {useRef} from 'react';
import {Animated, Dimensions, PanResponder, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('screen');

const ListItem = ({item}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const {dx, dy, pinch} = gestureState;
        console.log(pinch);
        const newScale = pinch / 10 + 1;
        scale.setValue(newScale);
      },
    }),
  ).current;

  return (
    <Animated.View style={styles.listItemContainer}>
      <Animated.View
        style={[styles.imageContainer]}
        {...panResponder.panHandlers}>
        <Animated.Image
          style={[styles.image, {transform: [{scale}]}]}
          source={{
            uri: `https://admin.refectio.ru/storage/app/uploads/${item.image}`,
          }}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItemContainer: {
    alignSelf: 'center',
  },
  image: {
    minHeight: height * 0.7, // Adjust as needed
    width,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
});
