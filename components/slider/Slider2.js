import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CloseIcon from './CloseIcon.jsx';
import Carousel from './SliderNew.tsx';
export default function Slider2(props) {
  const {width} = Dimensions.get('window');
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

  let sliderItem = ({item}) => {
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

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View>
      <Modal visible={sliderModal} onRequestClose={() => setSliderModal(false)}>
        <Pressable
          onPress={() => setSliderModal(false)}
          style={{position: 'absolute', zIndex: 999, top: '8%', right: '5%'}}>
          <CloseIcon />
        </Pressable>
        <View
          style={{
            width,
          }}>
          <Carousel imagesData={props.slid} imgActive={imgActive} />
        </View>
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
