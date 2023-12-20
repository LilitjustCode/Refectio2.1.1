import React, {useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native';
import Loading from '../../Component/Loading';
import CustomerMainPageNavComponent from '../../Customer/CustomerMainPageNav';

export default function SearchScreenCustomer({navigation}) {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    let myHeaders = new Headers();
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    await fetch(
      `https://admin.refectio.ru/public/api/GetProductCategory`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result.data.city);

        setCategories(result.data.city);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);
  // console.log(categories[0].childrens);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          position: 'relative',
        }}>
        <Text style={{fontSize: 25, color: 'black', fontWeight: '600'}}>
          Поиск
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: 40}}>
          {categories.length ? (
            categories.map((el, i) => (
              <TouchableOpacity
                style={{
                  marginBottom: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                  paddingBottom: 5,
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                }}
                key={i}
                onPress={() => {
                  el.childrens.length
                    ? navigation.navigate('SubCategoryScreen', {category: el})
                    : navigation.navigate('CategoryScreen', {category: el});
                }}>
                <View style={{flexDirection: 'row', flexShrink: 1}}>
                  <Image
                    style={{width: 35, height: 35, marginRight: 15}}
                    source={{
                      uri: `https://admin.refectio.ru/storage/app/uploads/${el.icon}`,
                    }}
                  />
                  <Text style={{fontSize: 21, color: 'black', flexShrink: 1}}>
                    {el.name}
                  </Text>
                </View>
                {el.childrens.length ? (
                  <Image
                    source={require('../../../assets/image/right-arrow1.png')}
                    style={{width: 20, height: 20}}
                  />
                ) : null}
              </TouchableOpacity>
            ))
          ) : (
            <View style={{marginVertical: 30}}>
              <Loading />
            </View>
          )}
        </ScrollView>
      </View>
      <CustomerMainPageNavComponent
        active_page={'Поиск'}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}
