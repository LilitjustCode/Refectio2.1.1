import React, {useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import Pinchable from 'react-native-pinchable';
import {SharedElement} from 'react-navigation-shared-element';

const {width, height} = Dimensions.get('window');

const ListItem = ({item, orientation}) => {
  const [loading, setLoading] = useState(true);
  let itemStyle =
    orientation === 'LANDSPACE'
      ? styles.listItemLandspace
      : styles.imageContainer;
  let imageStyle =
    orientation === 'PORTRAIT' ? styles.image : styles.landscapeImage;
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
      <SharedElement id={`${item.id}`}>
        <Pinchable>
          <Animated.View style={[styles.listItemContainer]}>
            <Animated.View style={[itemStyle]}>
              <Animated.Image
                style={imageStyle}
                onPartialLoad={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                source={{
                  uri: `https://admin.refectio.ru/storage/app/uploads/${item.image}`,
                }}
              />
            </Animated.View>
          </Animated.View>
        </Pinchable>
      </SharedElement>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItemContainer: {
    alignSelf: 'center',
  },
  image: {
    minHeight: height * 0.7,
    width,
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
    minHeight: height,
    width,
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
