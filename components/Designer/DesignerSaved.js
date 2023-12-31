import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  Touchable,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';

import Slider2 from '../slider/Slider2';
import DesignerPageNavComponent from './DesignerPageNav';
import {ImageSlider} from 'react-native-image-slider-banner';

export default class DesignerSavedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      saveds: [],
      urlImage: `https://admin.refectio.ru/storage/app/uploads/`,
    };
  }

  getMySaveds = async () => {
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem('userToken');
    let AuthStr = 'Bearer ' + userToken;
    myHeaders.append('Authorization', AuthStr);

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(
      `https://admin.refectio.ru/public/api/MyFavoritUser`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log('ressssssssssssss', result, 'ressssssssssssss')
        this.setState({
          saveds: result.data,
          // categories: result.data.favorit_users.user_category_product
        });
      })
      .catch(error => console.log('error', error));
    // console.log(this.state.categories)
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.getMySaveds();

    // this.focusListener = navigation.addListener('focus', () => {
    //   this.getMySaveds();
    // });
  }

  componentWillUnmount() {
    // Remove the event listener
    // if (this.focusListener) {
    //   this.focusListener();
    //   console.log(' END');
    // }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.main}>
          <View style={styles.nameCompanyParent}>
            <Text style={styles.componyName}>Избранное</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.saveds.length == 0 ? (
              <Text style={{textAlign: 'center', marginTop: 40, fontSize: 18}}>
                Нет избранных
              </Text>
            ) : (
              this.state.saveds.map((item, index) => {
                let count = item.favorit_users.meshok;
                return (
                  <View key={index} style={styles.campaign}>
                    <TouchableOpacity
                      style={styles.infoCompanyMain}
                      onPress={() => {
                        this.props.navigation.navigate('DesignerPageTwo', {
                          id: item.proizvoditel_id,
                        });
                      }}>
                      <Image
                        source={{
                          uri: this.state.urlImage + item.favorit_users.logo,
                        }}
                        style={{
                          width: 70,
                          height: 70,
                          marginRight: 12,
                          borderColor: '#C8C8C8',
                          borderWidth: 1,
                          borderRadius: 10,
                        }}
                      />
                      <View style={styles.infoCompany}>
                        <View>
                          <Text
                            style={{
                              fontSize: 20,
                              fontFamily: 'Raleway_700Bold',
                              marginBottom: 6,
                            }}>
                            {item.favorit_users.company_name}
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            {[...new Array(Number(count))].map((value, i) => (
                              <Image
                                key={i}
                                source={require('../../assets/image/meshok.png')}
                                style={{
                                  width: 15,
                                  height: 20.5,
                                  marginRight: 3,
                                }}
                              />
                            ))}
                          </View>
                        </View>

                        <Text
                          key={index}
                          style={{
                            fontSize: 16,
                            color: '#A8A8A8',
                            fontFamily: 'Raleway_500Medium',
                            paddingTop: 5,
                          }}>
                          {item.favorit_users.made_in}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <View>
                      <ScrollView
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                        {item.favorit_users.user_category_product.map(
                          (category, index) => {
                            return (
                              <Text key={index} style={styles.categoriesName}>
                                {category.category_name}
                              </Text>
                            );
                          },
                        )}
                      </ScrollView>
                    </View>
                    <Slider2
                      slid={
                        item.favorit_users.user_product_limit1[0].product_image
                      }
                    />
                    {/* <ImageSlider
                      showIndicator
                      indicatorSize={8} // Adjust the size of the indicators
                      indicatorColor="red" // Adjust the color of the indicators
                      inactiveIndicatorColor="gray" // Adjust the color of inactive indicators
                      indicatorAtBottom={true}
                      preview={true}
                      // children
                      // data={[
                      //   {
                      //     img:`https://admin.refectio.ru/storage/app/uploads/` + item.images,
                      //   },
                      // ]}
                      data={item.favorit_users.user_product_limit1[0].product_image.map(
                        (value) => {
                          return { img: `https://admin.refectio.ru/storage/app/uploads/` + value.image };
                        }
                      )}
                      // dataSource={item.images.map((item, index) => ({
                      //   url: `https://admin.refectio.ru/storage/app/uploads/` + item.image,
                      //   // title: item.title,
                      //   // You can add more properties as needed
                      //   // For example: description: item.description
                      // }))}
                      autoPlay={false}
                      onItemChanged={(item) => console.log(item)}
                      closeIconColor="#fff"
                      // showIndicator={false}
                      caroselImageStyle={{
                        resizeMode: "cover",
                        height: 270,
                      }}
                    /> */}
                  </View>
                );
              })
            )}
          </ScrollView>
        </View>
        <DesignerPageNavComponent
          active_page={'Избранное'}
          navigation={this.props.navigation}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 15,
    position: 'relative',
  },
  nameCompanyParent: {
    marginTop: 12,
    paddingLeft: 2,
    marginBottom: 11,
  },
  user: {
    width: 30,
    height: 30,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  componyName: {
    fontSize: 22,
    fontFamily: 'Poppins_500Medium',
    color: '#1571F0',
  },

  campaign: {
    width: '100%',
    marginBottom: 34,
  },
  infoCompanyMain: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoCompany: {
    width: '76%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoriesName: {
    fontSize: 13,
    fontFamily: 'Montserrat_400Regular',
    paddingHorizontal: 3,
    paddingVertical: 5,
    marginRight: 11,
  },
});
