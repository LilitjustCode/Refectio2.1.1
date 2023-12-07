import React from 'react';
import {Animated, Dimensions} from 'react-native';
interface BackgroundProps {
  scrollX: Animated.Value;
  imagesData: any[];
  setLoading: React.SetStateAction<boolean>;
}
const CarouselBackground: React.FC<BackgroundProps> = ({
  scrollX,
  imagesData,
  setLoading,
}: any) => {
  const {width, height} = Dimensions.get('screen');
  return imagesData?.map((item: any, index: number) => {
    const inputRange = [(index - 1) * width, index * width];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1],
    });

    return (
      <Animated.View
        key={item.id}
        style={
          {
            // transform: [
            //   {rotate: devicePosition === 'PORTRAIT' ? '90deg' : '0deg'},
            // ],
          }
        }>
        <Animated.Image
          onPartialLoad={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          source={{
            uri: `https://admin.refectio.ru/storage/app/uploads/${item.image}`,
          }}
          key={item.path}
          style={[
            {
              opacity,
              resizeMode: 'cover',
              zIndex: 998,
              width,
              height,
              minHeight: height,
              minWidth: width,
              position: 'absolute',
            },
          ]}
          blurRadius={20}
        />
      </Animated.View>
    );
  });
};

export default CarouselBackground;
