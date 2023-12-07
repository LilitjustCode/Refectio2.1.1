import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import Pinchable from 'react-native-pinchable';

const ListItem = ({item}) => {
  const {width, height} = Dimensions.get('screen');
  const [loading, setLoading] = useState(true);
  const [currentOrintation, setCurrentOrintation] = useState('PORTRAIT');

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      console.log(width, height);
      if (width < height) {
        setCurrentOrintation('PORTRAIT');
      } else {
        setCurrentOrintation('LANDSCAPE');
      }
    });
  }, [height, width]);

  return (
    <View>
      {loading && (
        <View style={styles.loaderBox}>
          <ActivityIndicator
            color={'#fff'}
            size={'large'}
            style={{height: '100%', width: '100%'}}
          />
        </View>
      )}
      {/* <SharedElement id={`${item.id}`}> */}
      <Pinchable>
        <Animated.View style={[styles.listItemContainer]}>
          <Animated.View
            style={
              currentOrintation === 'LANDSCAPE'
                ? styles.listItemLandspace
                : styles.imageContainer
            }>
            <Animated.Image
              style={
                currentOrintation !== 'LANDSCAPE'
                  ? [styles.image, {minHeight: height * 0.7, width}]
                  : [styles.landscapeImage, {minHeight: height, height, width}]
              }
              onPartialLoad={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              source={{
                uri: `https://admin.refectio.ru/storage/app/uploads/${item.image}`,
              }}
            />
          </Animated.View>
        </Animated.View>
      </Pinchable>
      {/* </SharedElement> */}
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItemContainer: {
    alignSelf: 'center',
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  listItemLandspace: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
  },
  landscapeImage: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  landscapeImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'red',
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
