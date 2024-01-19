import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';
// import Slider from "../slider/Slider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackHandler, Linking} from 'react-native';
import WebView from 'react-native-webview';
import BlueButton from '../Component/Buttons/BlueButton';
import Slider2 from '../slider/Slider2';
import GhostNavComponent from './GhostNav';

const {width: screenWidth} = Dimensions.get('window');

export default class GhostPageTwoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      bronyModal: false,

      changed: '',
      sOpenCityDropDown: false,
      active: 0,

      loading: false,
      id: null,

      user: [],
      user_category_for_product: [],
      city_for_sales_user: [],
      products: [],

      categorySelect: false,

      praizvaditelSelect: false,

      getPraizvaditel: [],

      getPraizvaditelMap: [
        {
          proizvodtel_name: '',
          proizvodtel_id: '',
          proizvoditel_price: '',
          drobdown_is_open: false,
        },
      ],

      praizvaditel_name: '',

      urlImage: `https://admin.refectio.ru/storage/app/uploads/`,

      category_name: '',
      category_name_error: false,

      change_category_loaded: false,
      pressCategory: true,
      dmodel_popup: false,
      designerModal: false,
      whatsapp: '',
      city_count: null,
      aboutUsPopup: false,
      about_us: '',

      aboutProductPopup: false,
      aboutProduct: '',
    };
  }

  getObjectData = async id => {
    this.setState({loading: true});
    let userID = id;
    // console.log(this.props.id, 'ljj');

    await fetch(
      `https://admin.refectio.ru/public/api/getOneProizvoditel/user_id=` +
        userID,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(res => {
        let arr = res.data.user_category_for_product;
        const isFound = res.data.user_category_for_product.findIndex(
          element => +element.parent_category_id == 10,
        );
        if (isFound == 0) {
          arr = res.data.user_category_for_product;
          let lastItem = res.data.user_category_for_product[0];
          arr.shift(res.data.user_category_for_product[0]);
          arr.push(lastItem);
        }

        const isFoundKitchen = arr.findIndex(
          element => +element.parent_category_id == 2,
        );
        if (isFoundKitchen >= 0) {
          let firstItem = arr.splice(isFoundKitchen, 1);
          arr.unshift(firstItem[0]);
        }

        const receptionАrea = arr.findIndex(
          element => +element.parent_category_id == 12,
        );
        if (receptionАrea >= 0) {
          let myItem = arr.splice(receptionАrea, 1);
          arr.push(myItem[0]);
        }
        console.log(res.data.user[0].about_us);
        this.setState({loading: false});
        console.log(this.state.loading);
        this.setState({
          user: res.data.user,
          user_category_for_product: arr,
          city_for_sales_user: res.data.city_for_sales_user,
          whatsapp: res.data.user[0].watsap_phone,
          city_count: res.data.city_count,
          about_us: res.data.user[0].about_us,
        });
      });
  };

  updateProduct = async (parent_category_name, id) => {
    await this.setState({
      change_category_loaded: true,
    });

    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem('userToken');
    myHeaders.append('Authorization', 'Bearer ' + userToken);

    let formdata = new FormData();
    formdata.append('parent_category_name', parent_category_name);
    formdata.append('user_id', id);

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      `https://admin.refectio.ru/public/api/filtergetOneProizvoditel`,
      requestOptions,
    )
      .then(response => response.json())
      .then(res => {
        if (res.status === false) {
          this.setState({
            products: [],
            // show_plus_button: false
            change_category_loaded: false,
          });

          return false;
        }

        let data = res.data;

        for (let i = 0; i < data.length; i++) {
          if (data[i].product_image.length < 1) {
            data[i].images = [];
            continue;
          }

          let product_image = data[i].product_image;

          data[i].images = product_image;
        }

        this.setState({
          // user: data.user,
          // user_bonus_for_designer: res.data.user_bonus_for_designer,
          // user_category_for_product: res.data.user_category_for_product,
          // city_for_sales_user: res.data.city_for_sales_user,
          products: data.products,
          // show_plus_button: false,
          // extract: data.user[0].extract,
          // whatsapp: res.data.user[0].watsap_phone
          change_category_loaded: false,
        });
        this.setState({loading: false});
      })
      .catch(error => console.log('error', error));
  };

  handleShare = async () => {
    console.log(this.state.user[0].id, 'user');
    const shareingStartWith = 'refectio.ru/';
    try {
      {
        this.state.user[0]?.company_name.split(' ').length == 1
          ? (url = `${shareingStartWith}${
              this.state.user[0]?.company_name.split(' ')[0]
            }/${this.state.user[0].id}`)
          : this.state.user[0]?.company_name.split(' ').length == 2
          ? (url = `${shareingStartWith}${
              this.state.user[0]?.company_name.split(' ')[0] +
              this.state.user[0]?.company_name.split(' ')[1]
            }/${this.state.user[0].id}`)
          : this.state.user[0]?.company_name.split(' ').length == 3
          ? (url = `${shareingStartWith}${
              this.state.user[0]?.company_name.split(' ')[0] +
              this.state.user[0]?.company_name.split(' ')[1] +
              this.state.user[0]?.company_name.split(' ')[2]
            }/${this.state.user[0].id}`)
          : (url = `${shareingStartWith}${
              this.state.user[0]?.company_name.split(' ')[0] +
              this.state.user[0]?.company_name.split(' ')[1] +
              this.state.user[0]?.company_name.split(' ')[2] +
              this.state.user[0]?.company_name.split(' ')[3]
            }/${this.state.user[0].id}`);
      }

      if (Platform.OS === 'android') {
        await Share.share({message: url});
        // Handle the result if needed
      } else {
        await Share.share({message: url});
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  updateProductAfterClickToCategory = async (parent_category_name, index) => {
    await this.setState({
      change_category_loaded: true,
    });

    if (this.state.pressCategory) {
      this.setState({
        pressCategory: false,
        active: index,
      });

      await this.setState({
        change_category_loaded: true,
      });

      let userID = this.props.route.params.id;

      let myHeaders = new Headers();
      let userToken = await AsyncStorage.getItem('userToken');
      myHeaders.append('Authorization', 'Bearer ' + userToken);

      let formdata = new FormData();
      formdata.append('parent_category_name', parent_category_name);
      formdata.append('user_id', userID);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        `https://admin.refectio.ru/public/api/filtergetOneProizvoditel`,
        requestOptions,
      )
        .then(response => response.json())
        .then(res => {
          if (res.status === false) {
            this.setState({
              products: [],
              // show_plus_button: false
              change_category_loaded: false,
            });

            return false;
          }

          let data = res.data;
          let new_data_result = [];

          for (let i = 0; i < data.length; i++) {
            if (data[i].product_image.length < 1) {
              data[i].images = [];
              continue;
            }

            let product_image = data[i].product_image;

            data[i].images = product_image;
          }

          this.setState({
            // user: data.user,
            // user_bonus_for_designer: res.data.user_bonus_for_designer,
            // user_category_for_product: res.data.user_category_for_product,
            // city_for_sales_user: res.data.city_for_sales_user,
            products: data.products,
            // show_plus_button: false,
            // extract: data.user[0].extract,
            // whatsapp: res.data.user[0].watsap_phone
            change_category_loaded: false,
            pressCategory: true,
          });
        });
    }

    // this.setState({ active: index })
  };
  handleClearData = () => {
    this.setState({
      user: [],
      user_category_for_product: [],
      city_for_sales_user: [],
      whatsapp: '',
      products: [],
      city_count: null,
      about_us: '',
    });
  };
  loadedDataAfterLoadPage = async id => {
    console.log('id in load data', id);
    await this.getObjectData(id);

    await this.updateProduct(
      this.state.user_category_for_product[0].parent_category_name,
      id,
    );
    this.setState({
      changed:
        this.state.city_for_sales_user.length == this.state.city_count
          ? 'Все города России'
          : this.state.city_for_sales_user[0].city_name,
    });
    this.setState({active: 0});
  };

  handleBackButtonClick() {
    // this.props.navigation.navigate("CustomerMainPage", { screen: true });
    const {id, setId, setUrlLinking} = this.props;

    if (this.props.route.params?.fromSearch === true) {
      this.props.navigation.navigate(this.props.route.params.prevRoute);
      this.props.id = null;
    } else if (
      this.props.route.params?.id ||
      (this.props.id && !this.props.route.params?.fromSearch)
    ) {
      this.props.navigation.navigate('GhostPage', {screen: true});
    }
    setId(null);
    setUrlLinking(null);
    this.handleClearData();
  }

  componentDidMount() {
    const {id, navigation} = this.props;

    this.setState({fontsLoaded: true});
    this.loadedDataAfterLoadPage(
      this.props.route.params?.id ? this.props.route.params?.id : id,
    );
    this.focusListener = navigation.addListener('focus', () => {
      this.loadedDataAfterLoadPage(
        this.props.route.params?.id ? this.props.route.params?.id : id,
      );
    });
    // BackHandler.addEventListener(
    //   'hardwareBackPress',
    // this.handleBackButtonClick;
    // this.loadedDataAfterLoadPage(
    //   this.props.route.params?.id ? this.props.route.params?.id : id,
    // );
    // );
  }
  componentWillUnmount() {
    // BackHandler.removeEventListener(
    //   'hardwareBackPress',
    //   this.handleClearData,
    //   this.handleBackButtonClick,
    // );
    if (this.focusListener) {
      this.focusListener();
      this.handleClearData();
    }
  }

  componentWillUnmount() {
    // this._unsubscribe();
    // this._willBlurListener();
  }

  addProtocol(url) {
    const protocolRegex = /^https?:\/\//i;
    if (protocolRegex.test(url)) {
      return url;
    }
    return 'http://' + url;
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Modal visible={this.state.dmodel_popup}>
          <ImageBackground
            source={require('../../assets/image/blurBg.png')}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                height: '30%',
                backgroundColor: '#fff',
                borderRadius: 20,
                position: 'relative',
                paddingHorizontal: 15,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 18,
                  top: 18,
                }}
                onPress={() => this.setState({dmodel_popup: false})}>
                <Image
                  source={require('../../assets/image/ixs.png')}
                  style={{
                    width: 22.5,
                    height: 22.5,
                  }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  marginTop: 60,
                  fontSize: 22,
                  textAlign: 'center',
                  color: '#2D9EFB',
                  fontFamily: 'Poppins_500Medium',
                }}>
                Предоставляет 3d модели по запросу
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                }}
                onPress={() => this.setState({dmodel_popup: false})}>
                <BlueButton name="Ок" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Modal>

        <Modal visible={this.state.aboutUsPopup}>
          <ImageBackground
            source={require('../../assets/image/blurBg.png')}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                height: this.state.about_us ? '60%' : '30%',
                backgroundColor: '#fff',
                borderRadius: 20,
                position: 'relative',
                paddingHorizontal: 15,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginTop: 15,
                  fontSize: 20,
                  textAlign: 'center',
                  color: '#2D9EFB',
                  fontFamily: 'Poppins_500Medium',
                }}>
                Дополнительная информация
              </Text>

              {!this.state.about_us ? (
                <Text style={{marginVertical: 20}}>
                  Производитель не добавил доп. информацию
                </Text>
              ) : (
                <WebView
                  style={{
                    height: 100,
                    width: 280,
                    marginTop: 30,
                    zIndex: 99999,
                  }}
                  source={{
                    html: `<div style="font-size:55px;">${this.state.about_us}</div>`,
                  }}
                />
              )}

              <TouchableOpacity
                style={{
                  marginVertical: 20,
                }}
                onPress={() => this.setState({aboutUsPopup: false})}>
                <BlueButton name="Ок" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Modal>

        <Modal visible={this.state.aboutProductPopup}>
          <ImageBackground
            source={require('../../assets/image/blurBg.png')}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                height: '60%',
                backgroundColor: '#fff',
                borderRadius: 20,
                position: 'relative',
                paddingHorizontal: 15,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginTop: 15,
                  fontSize: 20,
                  textAlign: 'center',
                  color: '#2D9EFB',
                  fontFamily: 'Poppins_500Medium',
                }}>
                Дополнительная информация
              </Text>

              <WebView
                style={{
                  height: 100,
                  width: 280,
                  marginTop: 30,
                  zIndex: 99999,
                }}
                source={{
                  html: `<div style="font-size:55px;">${this.state.aboutProduct}</div>`,
                }}
              />

              <TouchableOpacity
                style={{
                  marginVertical: 20,
                }}
                onPress={() => this.setState({aboutProductPopup: false})}>
                <BlueButton name="Ок" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Modal>

        <Modal visible={this.state.designerModal}>
          <ImageBackground
            source={require('../../assets/image/blurBg.png')}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                height: '28%',
                backgroundColor: '#fff',
                borderRadius: 20,
                position: 'relative',
                paddingHorizontal: 15,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 18,
                  top: 18,
                }}
                onPress={() => this.setState({designerModal: false})}>
                <Image
                  source={require('../../assets/image/ixs.png')}
                  style={{
                    width: 22.5,
                    height: 22.5,
                  }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  marginTop: 60,
                  fontSize: 22,
                  textAlign: 'center',
                  color: '#2D9EFB',
                  fontFamily: 'Poppins_500Medium',
                }}>
                Сотрудничает с дизайнерами
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                }}
                onPress={() => this.setState({designerModal: false})}>
                <BlueButton name="Ок" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Modal>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
            // marginLeft: -10,
            paddingBottom: 10,
          }}
          onPress={this.handleBackButtonClick}>
          <Svg
            width={25}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
              d="M20.168 27.708a1.458 1.458 0 01-1.137-.54l-7.044-8.75a1.458 1.458 0 010-1.851l7.292-8.75a1.46 1.46 0 112.245 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.138 2.391z"
              fill="#94D8F4"
            />
          </Svg>
          <Text style={styles.backText}>Назад</Text>
        </TouchableOpacity>
        {this.state.loading === false ? (
          <View style={styles.main}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.campaign}>
                {this.state.user.length > 0 && (
                  <>
                    <View style={styles.infoCompanyMain}>
                      <View style={{width: '32%'}}>
                        <Image
                          source={{
                            uri: this.state.urlImage + this.state.user[0].logo,
                          }}
                          style={{
                            width: 100,
                            height: 100,
                            marginRight: 12,
                            borderColor: '#C8C8C8',
                            borderWidth: 1,
                            resizeMode: 'cover',
                            borderRadius: 10,
                          }}
                        />
                      </View>

                      <View style={styles.infoCompany}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            // width: '95%',
                            // backgroussndColor: 'red',
                          }}>
                          <View>
                            <Text
                              style={{
                                fontSize: 20,
                                // fontFamily: 'Raleway_500Medium',
                                color: '#333333',
                                fontWeight: '700',
                              }}>
                              {this.state.user[0].company_name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 16,
                                color: '#A8A8A8',
                                fontFamily: 'Raleway_500Medium',
                              }}>
                              {this.state.user[0].made_in}
                            </Text>
                          </View>
                          <TouchableOpacity onPress={() => this.favorite()}>
                            {this.state.favoriteBool == true && (
                              <Image
                                source={require('../../assets/image/heartHast.png')}
                                style={{
                                  width: 24,
                                  height: 21.43,
                                  // marginRight: screenWidth > 393 ? -2 : 1,
                                  marginBottom: 15,
                                  marginRight: 1.5,
                                  // marginTop: 5,
                                }}
                              />
                            )}
                            {this.state.favoriteBool == false && (
                              <Image
                                source={require('../../assets/image/heartSev.png')}
                                style={{
                                  width: 24,
                                  height: 21.43,
                                  tintColor: 'red',
                                  marginRight: 1.5,

                                  marginBottom: 15,
                                }}
                              />
                            )}
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 4,
                              // width:
                              //   screenWidth > 360
                              //     ? '62.5%'
                              //     : screenWidth > 393
                              //     ? '71%'
                              //     : '59%',
                            }}>
                            {`${this.state.user[0].saite}` !== 'null' && (
                              <TouchableOpacity
                                onPress={() => {
                                  Linking.openURL(
                                    this.addProtocol(this.state.user[0].saite),
                                  );
                                }}>
                                <Image
                                  source={require('../../assets/image/globus.png')}
                                  style={{
                                    width: 24,
                                    height: 24,
                                    marginRight: 14,
                                  }}
                                />
                              </TouchableOpacity>
                            )}
                            {this.state.user[0].saite == null && (
                              <View style={{height: 24}}></View>
                            )}
                            {this.state.user[0].telegram !== null && (
                              <TouchableOpacity
                                onPress={() => {
                                  Linking.openURL(
                                    'https://t.me/' +
                                      this.state.user[0].telegram,
                                  );
                                }}>
                                <Image
                                  source={require('../../assets/image/telegram.png')}
                                  style={{
                                    width: 24,
                                    height: 24,
                                    marginRight: 14,
                                  }}
                                />
                              </TouchableOpacity>
                            )}

                            {this.state.user[0].extract !== null && (
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({VipiskaModal: true});
                                }}>
                                <Image
                                  source={require('../../assets/image/sidebar.png')}
                                  style={{
                                    width: 18,
                                    height: 24,
                                    marginRight: 14,
                                  }}
                                />
                              </TouchableOpacity>
                            )}
                            {this.state.user[0].job_with_designer == 'Да' && (
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({designerModal: true});
                                }}>
                                <Image
                                  source={require('../../assets/image/design.png')}
                                  style={{
                                    width: 24,
                                    height: 24,
                                    marginRight: 10,
                                  }}
                                />
                              </TouchableOpacity>
                            )}
                            {this.state.user[0].dmodel == 'Да' && (
                              <TouchableOpacity
                                onPress={() =>
                                  this.setState({dmodel_popup: true})
                                }>
                                <Image
                                  source={require('../../assets/image/cube.png')}
                                  style={{
                                    width: 24,
                                    height: 24,
                                  }}
                                />
                              </TouchableOpacity>
                            )}
                          </View>
                          <TouchableOpacity
                            style={{
                              marginTop: 4,
                              marginLeft: 1,
                            }}
                            onPress={this.handleShare}>
                            <Image
                              style={{width: 25, height: 25}}
                              source={require('../../assets/image/PNG/share.png')}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        position: 'relative',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        alignSelf: 'center',
                        // paddingHorizontal: 0,
                        marginTop: 9,
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          borderColor: '#F5F5F5',
                          width: '60%',
                          borderRadius: 5,
                          position: 'relative',
                          height: 24,
                          paddingLeft: 5,
                        }}
                        onPress={() =>
                          this.setState({
                            sOpenCityDropDown: !this.state.sOpenCityDropDown,
                          })
                        }>
                        <Text
                          style={{
                            fontFamily: 'Raleway_400Regular',
                            color: '#333333',
                          }}>
                          {this.state.changed}
                        </Text>
                        <View
                          style={{position: 'absolute', right: 17, bottom: 6}}>
                          {!this.state.sOpenCityDropDown && (
                            <Svg
                              width="18"
                              height="10"
                              viewBox="0 0 18 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <Path
                                d="M1 1L9 9L17 1"
                                stroke="#888888"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </Svg>
                          )}
                          {this.state.sOpenCityDropDown && (
                            <Svg
                              width="18"
                              height="10"
                              viewBox="0 0 18 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <Path
                                d="M1 9L9 1L17 9"
                                stroke="#888888"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </Svg>
                          )}
                        </View>
                      </TouchableOpacity>
                      <View
                        style={
                          this.state.sOpenCityDropDown
                            ? styles.sOpenCityDropDownActive
                            : styles.sOpenCityDropDown
                        }>
                        <ScrollView nestedScrollEnabled={true}>
                          {this.state.city_for_sales_user.length ==
                          this.state.city_count ? (
                            <TouchableOpacity
                              style={{
                                width: '100%',
                                justifyContent: 'center',
                                textAlign: 'left',
                              }}
                              onPress={() =>
                                this.setState({
                                  sOpenCityDropDown: false,
                                })
                              }>
                              <Text
                                style={{
                                  textAlign: 'left',
                                  paddingVertical: 10,
                                  fontFamily: 'Raleway_Regular',
                                  color: '#333333',
                                }}>
                                {this.state.changed}
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            this.state.city_for_sales_user.map(
                              (item, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    style={{
                                      width: '100%',
                                      justifyContent: 'center',
                                      textAlign: 'left',
                                    }}
                                    onPress={() =>
                                      this.setState({
                                        changed: item.city_name,
                                        sOpenCityDropDown: false,
                                      })
                                    }>
                                    <Text
                                      style={{
                                        textAlign: 'left',
                                        paddingVertical: 10,
                                        fontFamily: 'Raleway_400Regular',
                                        color: '#333333',
                                      }}>
                                      {item.city_name}
                                    </Text>
                                  </TouchableOpacity>
                                );
                              },
                            )
                          )}
                        </ScrollView>
                      </View>

                      {this.state.user.length > 0 && (
                        <View style={styles.checkBox}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 13,
                                marginRight: 5,
                                fontFamily: 'Raleway_400Regular',
                                color: '#333333',
                              }}>
                              Шоурум
                            </Text>
                            <View>
                              {this.state.user[0].show_room == 'Да' ? (
                                <Svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <Path
                                    d="M4 11.4L7.52941 15.4L16 5"
                                    stroke="#52A8EF"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <Rect
                                    x="0.2"
                                    y="0.2"
                                    width="19.6"
                                    height="19.6"
                                    rx="3.8"
                                    stroke="#52A8EF"
                                    stroke-width="0.4"
                                  />
                                </Svg>
                              ) : (
                                <Svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <Rect
                                    x="0.2"
                                    y="0.2"
                                    width="19.6"
                                    height="19.6"
                                    rx="3.8"
                                    stroke="#52A8EF"
                                    stroke-width="0.4"
                                  />
                                </Svg>
                              )}
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  </>
                )}

                <View
                  style={{
                    width: '100%',
                    height: 58,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 14,
                    marginBottom: 19,
                    zIndex: -1,
                  }}>
                  <TouchableOpacity
                    style={[
                      styles.info,
                      {borderRightWidth: 2, borderRightColor: '#EEEEEE'},
                    ]}
                    onPress={() => {
                      // this.setState({ aboutUsPopup: true })
                      this.props.navigation.navigate('AboutUsScreen', {
                        value: this.state.about_us,
                        hideText: true,
                      });
                    }}>
                    <Image
                      source={require('../../assets/image/la_percent.png')}
                      style={{
                        width: 30,
                        height: 30,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text style={styles.infoText}>Доп. информация</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.info,
                      {borderRightWidth: 2, borderRightColor: '#EEEEEE'},
                    ]}
                    // onPress={() => {
                    //   this.props.navigation.navigate("Modal");
                    // }}
                    onPress={() => {
                      const number = this.state.whatsapp;
                      const convertedNumber = number.replace(/\D/g, '');
                      Linking.openURL(
                        `http://wa.me/${convertedNumber}?text=Здравствуйте! Пишу из приложения Refectio.`,
                        // `whatsapp://send?text=Здравствуйте!Пишу из приложения Refectio&phone=${this.state.whatsapp}`
                      ).catch(err => console.log(err));
                    }}>
                    <Image
                      source={require('../../assets/image/whatsapp.png')}
                      style={{
                        width: 30,
                        height: 30,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text style={styles.infoText}>Написать в вотсап</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.info}
                    // onPress={() => {
                    //   this.props.navigation.navigate("Modal");
                    // }}
                  >
                    <Image
                      source={require('../../assets/image/pcichka.png')}
                      style={{
                        width: 30,
                        height: 30,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text style={styles.infoText}>Отзывы</Text>
                  </TouchableOpacity>
                </View>

                <View style={{zIndex: -1}}>
                  <ScrollView
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {this.state.user_category_for_product.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={async () => {
                            await this.updateProductAfterClickToCategory(
                              item.parent_category_name,
                            );
                            this.setState({active: index});
                          }}
                          style={
                            this.state.active === index
                              ? styles.categoriesButtonActive
                              : styles.categoriesButton
                          }>
                          <Text
                            style={
                              this.state.active === index
                                ? styles.categoriesNameActive
                                : styles.categoriesName
                            }>
                            {item.parent_category_name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>

                {this.state.change_category_loaded && (
                  <View style={{marginTop: 200}}>
                    <ActivityIndicator size={100} color={'#C2C2C2'} />
                  </View>
                )}

                {!this.state.change_category_loaded &&
                  this.state.products.map((item, index) => {
                    return (
                      <View key={index} style={{marginTop: 18}}>
                        <Slider2 slid={item.product_image} />
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
                        //     img: `https://admin.refectio.ru/storage/app/uploads/` + item.images,
                        //   },
                        // ]}
                        data={item.product_image.map((value) => {
                          return { img: `https://admin.refectio.ru/storage/app/uploads/` + value.image };
                        })}
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
                        <View
                          style={{
                            width: '100%',
                          }}>
                          <View style={styles.itemNameBox}>
                            <Text style={styles.itemType}>
                              {item.name.substr(0, 6)}
                            </Text>
                            <Text style={styles.itemName}>
                              {item.name.substr(5)}
                            </Text>
                          </View>
                          {item.facades && (
                            <Text
                              style={{
                                color: '#333333',
                                width: '95%',
                                marginTop: Platform.OS === 'ios' ? 5 : 0,
                              }}>
                              Фасады : {item.facades}
                            </Text>
                          )}
                          {item.frame && (
                            <Text style={{color: '#333333'}}>
                              Корпус: {item.frame}
                            </Text>
                          )}
                          {item.profile && (
                            <Text style={{color: '#333333'}}>
                              Профиль: {item.profile}
                            </Text>
                          )}
                          {item.tabletop && (
                            <Text style={{color: '#333333', width: '90%'}}>
                              Столешница: {item.tabletop}
                            </Text>
                          )}
                          {item.length && (
                            <Text style={{color: '#333333'}}>
                              Длина: {item.length.replace('.', ',')} м.
                            </Text>
                          )}
                          {item.height && (
                            <Text style={{color: '#333333'}}>
                              Высота: {item.height.replace('.', ',')} м.
                            </Text>
                          )}
                          {item.material && (
                            <Text style={{color: '#333333'}}>
                              Материал: {item.material}
                            </Text>
                          )}
                          {item.price && (
                            <Text style={{color: '#333333'}}>
                              Цена:{' '}
                              {item.price
                                .toString()
                                .split('.')
                                .join('')
                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                              руб.
                            </Text>
                          )}
                          {item.about && item.about != 'null' && (
                            <TouchableOpacity
                              style={{
                                width: 27,
                                height: 27,
                                position: 'absolute',
                                right: 0,
                                top: 5,
                              }}
                              onPress={() =>
                                this.props.navigation.navigate(
                                  'AboutUsScreen',
                                  {
                                    value: item.about,
                                    hideText: true,
                                  },
                                )
                              }>
                              <Image
                                source={require('../../assets/image/Screenshot_2.png')}
                                style={{width: 27, height: 27}}
                                width={27}
                                height={27}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    );
                  })}
              </View>
            </ScrollView>
          </View>
        ) : (
          <View style={styles.loaderBox}>
            <ActivityIndicator color={'#868686'} size={'large'} />
          </View>
        )}
        <GhostNavComponent
          active_page={'Главная'}
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
    marginTop: 15,
  },
  nameCompanyParent: {
    marginTop: 12,
    paddingLeft: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loaderBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemNameBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 'auto',
    marginTop: 5,
    marginBottom: 4,
  },
  itemName: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 13,
    color: '#333333',
    fontWeight: '700',
  },
  itemType: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 13,
    color: '#333333',
    fontWeight: '700',
  },
  campaign: {
    width: '100%',
    marginBottom: 34,
  },
  infoCompanyMain: {
    overflow: 'visible',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  infoCompany: {
    width: '68.7%',
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  categoriesName: {
    fontSize: 14,
    // fontFamily: 'Raleway_SemiBold',
    fontWeight: '600',
    color: '#333333',
  },
  categoriesNameActive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  categoriesButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginRight: 6,
  },
  categoriesButtonActive: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#94D8F4',
    borderRadius: 8,
    marginRight: 6,
  },
  info: {
    width: '33.3%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'Raleway_400Regular',
  },
  zakazInfo: {
    fontSize: 14,
    fontFamily: 'Raleway_400Regular',
    // marginTop: 5
  },
  sOpenCityDropDown: {
    width: '60%',
    height: 0,
    left: 0,
    position: 'absolute',
    top: '100%',
    zIndex: 100,
  },
  sOpenCityDropDownActive: {
    width: '60%',
    height: 120,
    left: 0,
    position: 'absolute',
    top: '100%',
    elevation: 2,
    borderColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 5,
    zIndex: 100,
    backgroundColor: '#fff',
  },
  backText: {
    color: '#94D8F4',
    fontSize: 16,
    marginTop: 5,
  },
});
