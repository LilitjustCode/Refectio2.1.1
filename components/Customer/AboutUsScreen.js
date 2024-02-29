import React, {useEffect, useState, useRef} from 'react';
import {Dimensions, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native';
import {StyleSheet} from 'react-native';
import Loading from '../Component/Loading';
import CustomerMainPageNavComponent from './CustomerMainPageNav';
import {Keyboard} from 'react-native';
import {BackBtn} from '../search/customer/CategoryScreen';
import {Text} from 'react-native';
import RichTextEditorComponent from '../Auth/RichTextEditor';
import {TouchableOpacity} from 'react-native';
import BlueButton from '../Component/Buttons/BlueButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HTML from 'react-native-render-html';
import WebView from 'react-native-webview';

export default function AboutUsScreen({navigation, value, hideText}) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [aboutUs, setAboutUs] = useState(value);
  const webViewRef = useRef(null);

  // useEffect(() => {
  //   if (webViewRef.current) {
  //     webViewRef.current.injectJavaScript(`
  //       const contentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  //       window.ReactNativeWebView.postMessage(contentHeight);
  //     `);
  //   }
  // }, [aboutUs]);

  // const onMessage = event => {
  //   const contentHeight = parseInt(event.nativeEvent.data, 10);
  //   if (!isNaN(contentHeight) && webViewRef.current) {
  //     webViewRef.current.setNativeProps({
  //       style: {
  //         height: contentHeight + 'px',
  //       },
  //     });
  //   }
  // };

  // updateAboutUs = async () => {
  //   let myHeaders = new Headers();
  //   let userToken = await AsyncStorage.getItem("userToken");
  //   let AuthStr = "Bearer " + userToken;
  //   myHeaders.append("Authorization", AuthStr);

  //   let formdata = new FormData();
  //   console.log(userToken);
  //   console.log('aboutUs',aboutUs);
  //   formdata.append("about_us", aboutUs);

  //   let requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: formdata,
  //     redirect: "follow",
  //   };

  //   fetch(`https://admin.refectio.ru/public/api/update_about_us_user`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //       navigation.goBack()
  //     })
  //     .catch((error) => console.log("error", error));
  // }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {aboutUs.length > 0 &&
      aboutUs != 'null' &&
      aboutUs != 'undefined' &&
      aboutUs != '<p><br></p>' ? (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
          }}>
          <View>
            <BackBtn onPressBack={() => navigation.goBack()} />
            <Text
              style={{
                marginVertical: 20,
                fontSize: 20,
                // textAlign: "center/",
                // color: "#2D9EFB",
                fontFamily: 'Poppins_500Medium',
              }}>
              Дополнительная информация
            </Text>
          </View>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                flexDirection: 'row',
                position: 'relative',
                // alignItems: "center",
                // marginTop: 15,
              }}>
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: '#F5F5F5',
                  // borderRadius: 6,
                  position: 'relative',
                  marginRight: 12,
                  width: '100%',
                  // paddingHorizontal: 10,
                }}>
                {/* <HTML
                  contentWidth={700}
                  // source={{
                  //   html: `<div style="font-size: 16px">${aboutUs}</div>`,
                  // }}
                  source={{html: aboutUs}}
                /> */}

                <WebView
                  ref={webViewRef}
                  style={{
                    width: 300,
                    zIndex: 99999,
                    flex: 1,
                    overflow: 'hidden',
                    height: 800,
                    // Add other styles as needed
                  }}
                  source={{
                    html: `<div style="font-size:50px; overflow: hidden; height:auto; width:1000">${aboutUs}</div>`,
                  }}
                  // onMessage={onMessage}
                  // // injectedJavaScriptBeforeContentLoaded={true}
                  // javaScriptEnabled={true}
                />
              </View>
            </View>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                // position: 'absolute',
                // bottom: '10%',
                marginTop: 20,
                marginBottom: 20,
              }}
              disabled={disabled}
              onPress={() => navigation.goBack()}>
              <BlueButton name="Ок" />
            </TouchableOpacity>
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
          }}>
          <BackBtn onPressBack={() => navigation.goBack()} />
          <Text
            style={{
              marginVertical: 20,
              fontSize: 20,
              // textAlign: "center/",
              // color: "#2D9EFB",
              fontFamily: 'Poppins_500Medium',
            }}>
            Дополнительная информация
          </Text>
          <RichTextEditorComponent
            value={aboutUs}
            hideIcon
            hideText={hideText}
            // height={"70%"}
          />
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: '10%',
            }}
            disabled={disabled}
            onPress={() => navigation.goBack()}>
            <BlueButton name="Ок" />
          </TouchableOpacity>
        </View>
      )}

      {!isKeyboardVisible && (
        <CustomerMainPageNavComponent
          active_page={'Поиск'}
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  );
}
