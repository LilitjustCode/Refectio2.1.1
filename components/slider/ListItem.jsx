import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import Pinchable from 'react-native-pinchable';

const ListItem = ({item, keys}) => {
  const {width, height} = Dimensions.get('screen');
  const [loading, setLoading] = useState(true);
  const [currentOrintation, setCurrentOrintation] = useState('PORTRAIT');

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      console.log(width, height);
      if (width < height) {
        setCurrentOrintation('PORTRAIT');
        // setLoading(true);
      } else {
        setCurrentOrintation('LANDSCAPE');
        // setLoading(true);
      }
    });
  }, [height, width]);

  // console.log(keys, 'width');
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
                  : [
                      styles.landscapeImage,
                      {
                        minHeight: height * 0.7,
                        height,
                        minWidth: width * 0.1,
                        // marginRight: keys == 2 ? -150 : '',
                        width,
                      },
                    ]
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
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'contain',
    height: '100%',
  },
  listItemLandspace: {
    resizeMode: 'contain',
    height: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
  },
  landscapeImage: {
    resizeMode: 'contain',
    height: '100%',
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
