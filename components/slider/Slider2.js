import React, {useEffect, useState, useRef, memo} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text,
  FlatList,
  Animated,
  Platform,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {SafeAreaView} from 'react-native';

const width = Dimensions.get('window').width - 25;

export default function Slider2(props) {
  const [sliderModal, setSliderModal] = useState(false);
  const [imgActive, setInmageActive] = useState(0);
  const change = nativeEvent => {
    const slider = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slider !== imgActive) {
      setInmageActive(slider);
    }
  };

  let sliderItem = ({item, index}) => {
    return sliderModal === true ? (
      <Image
        source={{
          uri: `https://admin.refectio.ru/storage/app/uploads/` + item.image,
        }}
        style={{
          height: '100%',
          width: props.searchMode ? width : width,
          resizeMode: 'contain',
        }}
      />
    ) : (
      <TouchableOpacity onPress={() => setSliderModal(true)} activeOpacity={1}>
        <Image
          source={{
            uri: `https://admin.refectio.ru/storage/app/uploads/` + item.image,
          }}
          style={{
            height: '100%',
            width: props.searchMode ? width : width,
            resizeMode: 'cover',
          }}
        />
      </TouchableOpacity>
    );
  };

  const [fadeAnim] = useState(new Animated.Value(0));

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Modal visible={sliderModal} onRequestClose={() => setSliderModal(false)}>
        <SafeAreaView style={styles.sliderModal}>
          <TouchableOpacity
            style={{position: 'absolute', right: 18, top: 18, zIndex: 50}}
            onPress={() => {
              setSliderModal(false);
              setInmageActive(0);
            }}>
            <Image
              source={require('../../assets/image/ixs.png')}
              style={[
                {tintColor: 'white', width: 30, height: 30},
                Platform.OS == 'ios' ? {marginTop: 25} : '',
              ]}
            />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: 'black',
              flex: 1,
            }}>
            <ImageViewer
              imageUrls={props.slid.map((el, i) => ({
                url: `https://admin.refectio.ru/storage/app/uploads/${el.image}`,
              }))}
              onChange={index => {
                setInmageActive(index);
                fadeIn();
              }}
              // renderImage={(props) => (
              //   <Animated.View style={{ opacity: fadeAnim }}>
              //     <Image {...props} />
              //   </Animated.View>
              // )}
              index={imgActive}
              renderIndicator={() => null}
              enableSwipeDown
              onSwipeDown={() => {
                setSliderModal(false);
                setInmageActive(0);
                fadeOut();
              }}
            />
            {/* {props.slid.length > 1 && (
              <View style={styles.wrapDot}>
                {props.slid.map((item, index) => (
                  <Animated.View
                    style={imgActive === index ? styles.dotActive : styles.dot}
                    key={index}
                  />
                ))}
              </View>
            )} */}
          </View>
        </SafeAreaView>
      </Modal>

      <View>
        <FlatList
          horizontal
          pagingEnabled
          style={{
            width: props.searchMode ? width : width,
            height: props.searchMode ? width : (width / 7) * 5,
          }}
          showsHorizontalScrollIndicator={false}
          data={props.slid}
          keyExtractor={item => item.id}
          renderItem={sliderItem}
          onScroll={({nativeEvent}) => change(nativeEvent)}
        />
        {props.slid.length > 1 && (
          <View style={styles.wrapDot}>
            {props.slid.map((item, index) => (
              <Animated.View
                style={imgActive === index ? styles.dotActive : styles.dot}
                key={index}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: width,
    height: width,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#1571F0',
    zIndex: 1,
  },
  dot: {
    marginBottom: -30,
    marginHorizontal: 3,
    width: 5,
    height: 5,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  dotActive: {
    marginBottom: -30,
    marginHorizontal: 3,
    width: 5,
    height: 5,
    backgroundColor: '#94D8F4',
    borderRadius: 100,
  },
  sliderModal: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});
