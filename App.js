import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {Linking} from 'react-native';
import * as React from 'react';
import {useState, useEffect} from 'react';
import {Dimensions, Image, StatusBar, View} from 'react-native';
import AuthScreenComponent from './components/Auth/AuthScreen';
import ConfirmTelScreenComponent from './components/Auth/ConfirmTelScreen';
import EditPhoneNumberComponent from './components/Auth/EditPhoneNumber';
import ForgetPasswordComponent from './components/Auth/ForgetPassword';
import ForgetPasswordTelComponent from './components/Auth/ForgetPasswordTel';
import LoginScreenComponent from './components/Auth/LoginScreen';
import NewPasswordComponent from './components/Auth/NewPassword';
import RegisteredScreenComponent from './components/Auth/RegisteredScreen';
import RegistrationManufacturerComponent from './components/Auth/RegistrationManufacturer';
import RegistrationUserScreenComponent from './components/Auth/RegistrationUserScreen';
import {AuthContext} from './components/AuthContext/context';
import CustomerMainPageComponent from './components/Customer/CustomerMainPage';
import CustomerPageTwoComponent from './components/Customer/CustomerPageTwo';
import DesignerPageComponent from './components/Designer/DesignerPage';
import DesignerPageTwoComponent from './components/Designer/DesignerPageTwo';
import GhostPageComponent from './components/Ghost/GhostPage';
import GhostPageTwoComponent from './components/Ghost/GhostPageTwo';
// import DesignerMyBroniComponent from "./components/Designer/DesignerMyBroni";
import DesignerSavedComponent from './components/Designer/DesignerSaved';
import MyAccauntComponent from './components/Designer/MyAccaunt';
// import CustomerMyBroniComponent from "./components/Customer/CustomerMyBroni";
// import CustomerRewardsComponent from "./components/Customer/CustomerRewards";
import CustomerMyAccauntComponent from './components/Customer/CustomerMyAccaunt';
// import CheckDesignerComponent from "./components/Customer/CheckDesigner";
// import * as Font from "expo-font";
// import {
//   Poppins_300Light,
//   Poppins_400Regular,
//   Poppins_500Medium,
//   Poppins_600SemiBold,
//   Poppins_700Bold,
// } from "@expo-google-fonts/poppins";

// import {
//   Raleway_400Regular,
//   Raleway_500Medium,
//   Raleway_600SemiBold,
//   Raleway_700Bold,
// } from "@expo-google-fonts/raleway";

// import { Montserrat_400Regular } from "@expo-google-fonts/montserrat";
// import * as Linking from "expo-linking";
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import EditPasswordCustomerCompnent from './components/Auth/EditPaswordCustomer';
import EditPasswordDesignerCompnent from './components/Auth/EditPaswordDesigner';
import EditPhoneNumberConfirmComponent from './components/Auth/EditPhoneNumberConfirm';
import EditPhoneNumberDesignerComponent from './components/Auth/EditPhoneNumberDesigner';
import EditPhoneNumberDesignerConfirmComponent from './components/Auth/EditPhoneNumberDesignerConfirm';
import AddProductComponent from './components/Customer/AddProduct';
import EditProductComponent from './components/Customer/EditProduct';
import AddZakaziComponent from './components/Customer/Live/AddZakazi';
import EditZakaziComponent from './components/Customer/Live/EditZakazi';
import LiveZakazchikSinglComponent from './components/Customer/Live/LiveZakazchikSingl';
import ZakaziLiveComponent from './components/Customer/Live/ZakaziLive';
import PraductiaComponent from './components/Customer/Praductia';
import AddZakazchikDesignerComponent from './components/Designer/Live/AddZakazchikDesigner';
import LiveZakazchikSinglDesignerComponent from './components/Designer/Live/LiveZakazchikSinglDesigner';
import ZakaziLiveDesignerComponent from './components/Designer/Live/ZakaziLiveDesigner';
import ModalComponent from './components/Ghost/Modal';

import AboutUsScreen from './components/Customer/AboutUsScreen';
import SelectCategoryScreen from './components/Customer/SelectCategoryScreen';
import SelectSubCategoryScreen from './components/Customer/SelectSubCategoryScreen';
import CategoryScreenCustomer from './components/search/customer/CategoryScreen';
import CategorySingleScreenCustomer from './components/search/customer/CategorySingleScreen';
import SearchScreenCustomer from './components/search/customer/SearchScreen';
import SubCategoryScreenCustomer from './components/search/customer/SubCategoryScreen';
import CategoryScreenDesigner from './components/search/designer/CategoryScreen';
import CategorySingleScreenDesigner from './components/search/designer/CategorySingleScreen';
import SearchScreenDesigner from './components/search/designer/SearchScreen';
import SubCategoryScreenDesigner from './components/search/designer/SubCategoryScreen';
import CategoryScreenGuest from './components/search/guest/CategoryScreen';
import CategorySingleScreenGuest from './components/search/guest/CategorySingleScreen';
import SearchScreenGuest from './components/search/guest/SearchScreen';
import SubCategoryScreenGuest from './components/search/guest/SubCategoryScreen';
import Carousel from './components/slider/SliderNew';

// const customFonts = {
//   Poppins_300Light,
//   Poppins_400Regular,
//   Poppins_500Medium,
//   Poppins_600SemiBold,
//   Poppins_700Bold,
//   Raleway_400Regular,
//   Raleway_500Medium,
//   Raleway_600SemiBold,
//   Raleway_700Bold,
//   Montserrat_400Regular,
// };

const Stack = createStackNavigator();

function AuthScreen({navigation}) {
  return <AuthScreenComponent navigation={navigation} />;
}

function LoginScreen({navigation}) {
  return <LoginScreenComponent navigation={navigation} />;
}

function RegisteredScreen({navigation}) {
  return <RegisteredScreenComponent navigation={navigation} />;
}

function RegistrationUserScreen({navigation}) {
  return <RegistrationUserScreenComponent navigation={navigation} />;
}

function RegistrationManufacturer({navigation}) {
  return <RegistrationManufacturerComponent navigation={navigation} />;
}

function ConfirmTelScreenFunction({route, navigation}) {
  const {params} = route.params;

  return <ConfirmTelScreenComponent token={params} navigation={navigation} />;
}

function CustomerMainPage({navigation}) {
  return <CustomerMainPageComponent navigation={navigation} />;
}

function GhostPage({navigation}) {
  return <GhostPageComponent navigation={navigation} />;
}

function SelectCategoryScreenComponent({navigation, route}) {
  return (
    <SelectCategoryScreen
      navigation={navigation}
      user_id={route.params.user_id}
    />
  );
}

function SelectSubCategoryScreenComponent({navigation, route}) {
  return (
    <SelectSubCategoryScreen
      navigation={navigation}
      category={route.params.category}
      user_id={route.params.user_id}
    />
  );
}
function EditPhoneNumberConfirmFunc({route, navigation}) {
  const {params} = route.params;

  return (
    <EditPhoneNumberConfirmComponent
      phoneNumb={params}
      navigation={navigation}
    />
  );
}

function EditPhoneNumberDesigner({navigation}) {
  return <EditPhoneNumberDesignerComponent navigation={navigation} />;
}

function EditPhoneNumberDesignerConfirm({route, navigation}) {
  const {params} = route.params;

  return (
    <EditPhoneNumberDesignerConfirmComponent
      phoneNumb={params}
      navigation={navigation}
    />
  );
}

function EditPasswordCustomer({navigation}) {
  return <EditPasswordCustomerCompnent navigation={navigation} />;
}

function DesignerPageTwo({route, navigation}) {
  const {params} = route.params;
  return <DesignerPageTwoComponent user_id={params} navigation={navigation} />;
}

function CustomerPageTwo({route, navigation}) {
  const {params} = route.params;

  return <CustomerPageTwoComponent userID={params} navigation={navigation} />;
}

function SearchScreenComponentGuest({navigation}) {
  return <SearchScreenGuest navigation={navigation} />;
}
function CategoryScreenComponentGuest({navigation, route}) {
  return (
    <CategoryScreenGuest
      navigation={navigation}
      category={route.params.category}
    />
  );
}

function CategorySingleScreenComponentGuest({navigation, route}) {
  return (
    <CategorySingleScreenGuest
      navigation={navigation}
      category={route.params.category}
      mynextUrl={route.params.nextUrl}
      myproducts={route.params.products}
      product={route.params.product}
      cityId={route.params.cityId}
      startPrice={route.params.startPrice}
      endPrice={route.params.endPrice}
    />
  );
}

function SearchScreenComponentDesigner({navigation}) {
  return <SearchScreenDesigner navigation={navigation} />;
}
function CategoryScreenComponentDesigner({navigation, route}) {
  return (
    <CategoryScreenDesigner
      navigation={navigation}
      category={route.params.category}
    />
  );
}

function CategorySingleScreenComponentDesigner({navigation, route}) {
  return (
    <CategorySingleScreenDesigner
      navigation={navigation}
      category={route.params.category}
      mynextUrl={route.params.nextUrl}
      myproducts={route.params.products}
      product={route.params.product}
      cityId={route.params.cityId}
      startPrice={route.params.startPrice}
      endPrice={route.params.endPrice}
    />
  );
}

function SearchScreenComponentCustomer({navigation}) {
  return <SearchScreenCustomer navigation={navigation} />;
}
function CategoryScreenComponentCustomer({navigation, route}) {
  return (
    <CategoryScreenCustomer
      navigation={navigation}
      category={route.params.category}
    />
  );
}

function CategorySingleScreenComponentCustomer({navigation, route}) {
  return (
    <CategorySingleScreenCustomer
      navigation={navigation}
      category={route.params.category}
      mynextUrl={route.params.nextUrl}
      myproducts={route.params.products}
      product={route.params.product}
      cityId={route.params.cityId}
      startPrice={route.params.startPrice}
      endPrice={route.params.endPrice}
    />
  );
}

function SubCategoryScreenComponentCustomer({navigation, route}) {
  return (
    <SubCategoryScreenCustomer
      navigation={navigation}
      category={route.params.category}
    />
  );
}

function SubCategoryScreenComponentDesigner({navigation, route}) {
  return (
    <SubCategoryScreenDesigner
      navigation={navigation}
      category={route.params.category}
    />
  );
}
function SubCategoryScreenComponentGuest({navigation, route}) {
  return (
    <SubCategoryScreenGuest
      navigation={navigation}
      category={route.params.category}
    />
  );
}

function AboutUsScreenComponent({navigation, route}) {
  return (
    <AboutUsScreen
      navigation={navigation}
      value={route.params.value}
      hideText={route.params.hideText}
    />
  );
}

function ForgetPassword({navigation}) {
  return <ForgetPasswordComponent navigation={navigation} />;
}
function ForgetPasswordTel({navigation}) {
  return <ForgetPasswordTelComponent navigation={navigation} />;
}

function NewPassword({navigation}) {
  return <NewPasswordComponent navigation={navigation} />;
}

function GhostPageTwoFunc({route, navigation, id}) {
  console.log(route);
  // const {params} = route.params ? route.params : '367';

  return <GhostPageTwoComponent user_id={'367'} navigation={navigation} />;
}
// function DesignerMyBroni({ navigation }) {
//   return <DesignerMyBroniComponent navigation={navigation} />;
// }

function MyAccaunt({navigation}) {
  return <MyAccauntComponent navigation={navigation} />;
}

function DesignerSaved({navigation}) {
  return <DesignerSavedComponent navigation={navigation} />;
}

// function CustomerMyBroni({ navigation }) {
//   return <CustomerMyBroniComponent navigation={navigation} />;
// }

// function CustomerRewards({ navigation }) {
//   return <CustomerRewardsComponent navigation={navigation} />;
// }

function CustomerMyAccaunt({navigation}) {
  return <CustomerMyAccauntComponent navigation={navigation} />;
}

// function CheckDesigner({ navigation }) {
//   return <CheckDesignerComponent navigation={navigation} />;
// }

function PraductiaFunc({route, navigation}) {
  const {params} = route.params;

  return <PraductiaComponent user_id={params} navigation={navigation} />;
}

function AddProductScreen({route, navigation}) {
  const {category, user_id} = route.params;
  return (
    <AddProductComponent
      category={category}
      navigation={navigation}
      user_id={user_id}
    />
  );
}

function EditProductScreen({route, navigation}) {
  return (
    <EditProductComponent user_id={route.params} navigation={navigation} />
  );
}

function Modal({navigation}) {
  return <ModalComponent navigation={navigation} />;
}

function ZakaziLive({navigation}) {
  return <ZakaziLiveComponent navigation={navigation} />;
}

function LiveZakazchikSinglFunc({route, navigation}) {
  const {params} = route.params;
  console.log(params);
  return (
    <LiveZakazchikSinglComponent navigation={navigation} item_id={params} />
  );
}

function AddZakaziFunc({route, navigation}) {
  const {params} = route.params;
  return <AddZakaziComponent navigation={navigation} item_id={params} />;
}

function EditZakaziFunc({route, navigation}) {
  const {params} = route.params;

  return (
    <EditZakaziComponent
      navigation={navigation}
      order_id={params.order_id}
      item_id={params.item_id}
    />
  );
}

function ZakaziLiveDesignerFunc({navigation}) {
  return <ZakaziLiveDesignerComponent navigation={navigation} />;
}

function LiveZakazchikSinglDesignerFunc({route, navigation}) {
  console.log(route.params);
  const {params} = route.params;
  return (
    <LiveZakazchikSinglDesignerComponent
      navigation={navigation}
      item_id={params}
    />
  );
}

function AddZakazchikDesigner({navigation}) {
  return <AddZakazchikDesignerComponent navigation={navigation} />;
}

const tabBarStyle = {
  height: 90,
  backgroundColor: 'white',
  elevation: 0,
  borderTopColor: 'white',
  width: Dimensions.get('window').width - 50,
  marginTop: 0,
  marginRight: 'auto',
  marginBottom: 0,
  marginLeft: 'auto',
};

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [id, setId] = useState('');
  const [userRole, setUserRole] = React.useState(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [urlLinking, setUrlLinking] = useState('');

  // useEffect(() => {
  //   const handleDeepLink = ({url}) => {
  //     console.log(url, 'ureeell');
  //     const match = url.match(/performer\/(\d+)/);
  //     const performerId = match && match[1];

  //     if (performerId) {
  //       // Perform actions based on performerId
  //       console.log('Opening performer with ID:', performerId);
  //     }
  //   };

  //   Linking.addEventListener('url', handleDeepLink);

  //   return () => {
  //     // Linking.removeEventListener('url', handleDeepLink);
  //   };
  // }, []);

  useEffect(() => {
    // setUrlLinking('');
    console.log('aa')
    const handleDeepLink = ({url}) => {
      setIsLoading(true);
      setUrlLinking(url);
      if (url && url.startsWith('mychat://id/')) {
        const parts = url.split('/');
        console.log(parts);
        const id = parts[parts.length - 1];
        setUrlLinking(url);
        setId(id);
        setIsLoading(false);
        console.log('Opened chat for user useeeg:', id);
      }

      if (url && url.startsWith('http://refectio.ru/')) {
        const parts = url.split('/');
        console.log(parts);
        const id = parts[parts.length - 1];
        setUrlLinking(url);
        setId(id);
        setIsLoading(false);
        console.log('Opened chat for user useegg:', id);
      }
    };

    const handleInitialUrl = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) {
          handleDeepLink({url: initialUrl});
        }
      } catch (error) {
        console.error('Error getting initial URL:', error);
      }
    };

    Linking.addEventListener('url', handleDeepLink);
    handleInitialUrl();

    return () => {
      setUrlLinking('');
    };
  }, []);

  console.log(urlLinking, 'kkk');
  // useEffect(() => {
  //   async function checkForUpdate() {
  //     const update = await Updates.checkForUpdateAsync();
  //     if (update.isAvailable) {
  //       setUpdateAvailable(true);
  //       await AsyncStorage.setItem('update', true);
  //     }
  //   }
  //   checkForUpdate();
  // }, []);

  // const handleUpdate = async () => {
  //   try {
  //     await Updates.fetchUpdateAsync();
  //     Updates.reloadFromCache();
  //   } catch (error) {
  //     // Handle update error
  //   }
  // };

  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userRole: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.userToken,
          userRole: action.userRole,

          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.userToken,
          userRole: action.userRole,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          userRole: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userToken: action.userToken,
          userRole: action.userRole,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        // setIsLoading(true);
        const userToken = String(foundUser.userToken);
        const userRole = String(foundUser.userRole);

        try {
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userRole', userRole);

          console.log(userToken, 'userToken -  AFTER LOGIN');
          console.log(userRole, 'userRole -  AFTER LOGIN');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', userToken: userToken, userRole: userRole});
      },
      signOut: async callback => {
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('userRole');

          setIsLoading(false);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setIsLoading(false);
      },
      notify_count: 0,
    }),
    [],
  );

  // useEffect(() => {
  //   const handleDeepLink = async event => {
  //     const url = event.url;
  //     if (url) {
  //       // Handle the deep link URL received
  //       console.log('Received deep link:', url);
  //     }
  //   };

  //   // Add event listener for deep links
  //   Linking.addEventListener('url', handleDeepLink);

  //   // Remove event listener on component unmount
  //   return () => {
  //     Linking.removeEventListener('url', handleDeepLink);
  //   };
  // }, []);

  // const linking = {
  //   prefixes: ['com.JustCode.Refection://'],
  //   config: {
  //     screens: {
  //       // CatalogCategory: 'CatalogCategory',
  //       // ThemesCatalogComponent: 'ThemesCatalogComponent',
  //       // CheckUserLoginOrNot: 'CheckUserLoginOrNot',
  //     },
  //   },
  // };

  getLiveZakaz = async () => {
    let token = await AsyncStorage.getItem('userToken');
    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://admin.refectio.ru/public/api/GetManufacterOrders`,
      requestOptions,
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === true) {
          if (responseJson.data.data.length > 0) {
            authContext.notify_count = responseJson.notify_count;
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Проверка при входе в приложение.

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken;
      let userRole;

      userToken = null;
      userRole = null;

      try {
        // await AsyncStorage.clear()

        userToken = await AsyncStorage.getItem('userToken');
        userRole = await AsyncStorage.getItem('userRole');

        console.log(userToken, 'userToken');
        console.log(userRole, 'userRole');

        setIsLoading(false);
        console.log('test');
      } catch (e) {
        console.log(e);
      }
      dispatch({
        type: 'RETRIEVE_TOKEN',
        userToken: userToken,
        userRole: userRole,
      });
    }, 1000);
    setInterval(() => {
      this.getLiveZakaz();
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      // <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //   <ActivityIndicator size={100} color="#00f" />
      // </View>

      <View style={{flex: 1}}>
        <Image
          source={require('./assets/splash.png')}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    );
  } else {
    return (
      <AuthContext.Provider value={authContext}>
        <StatusBar
          animated={true}
          hidden={false}
          backgroundColor="white"
          barStyle="dark-content"
        />
        <NavigationContainer>
          {/* {urlLinking.length > 0 && (
            <Stack.Navigator
              initialRouteName="GhostPageTwo"
              screenOptions={({route}) => ({
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: '#2EB6A5',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: tabBarStyle,
              })}>
              <Stack.Screen name="GhostPageTwo" component={GhostPageTwoFunc} />
            </Stack.Navigator>
          )} */}
          {
            //  Designer Pages Tabs
            loginState.userToken !== null && loginState.userRole == '2' ? (
              <Stack.Navigator
                initialRouteName={
                  urlLinking.length > 0 &&
                  loginState.userRole == '2' &&
                  loginState.userToken !== null
                    ? 'DesignerPageTwo'
                    : 'DesignerPage'
                }
                screenOptions={({route}) => ({
                  tabBarShowLabel: false,
                  headerShown: false,
                  tabBarActiveTintColor: '#2EB6A5',
                  tabBarInactiveTintColor: 'gray',
                  tabBarStyle: tabBarStyle,
                })}>
                {urlLinking.length > 0 &&
                loginState.userRole == '2' &&
                loginState.userToken !== null ? (
                  <Stack.Screen
                    name="DesignerPageTwo"
                    component={DesignerPageTwoComponent}
                    initialParams={{id}}
                  />
                ) : (
                  <Stack.Screen
                    name="DesignerPage"
                    component={DesignerPageComponent}
                  />
                )}
                {urlLinking.length > 0 &&
                loginState.userRole == '2' &&
                loginState.userToken !== null ? (
                  <Stack.Screen
                    name="DesignerPage"
                    component={DesignerPageComponent}
                  />
                ) : (
                  <Stack.Screen
                    name="DesignerPageTwo"
                    component={DesignerPageTwoComponent}
                    initialParams={{id}}
                  />
                )}
                {/* <Stack.Screen
                  name="DesignerMyBroni"
    
                  component={DesignerMyBroniComponent}
                /> */}

                <Stack.Screen
                  name="DesignerSaved"
                  component={DesignerSavedComponent}
                />
                <Stack.Screen
                  name={'Slider'}
                  component={Carousel}
                  options={{
                    headerTransparent: true,
                    gestureEnabled: true,

                    animation: 'fade_from_bottom',

                    contentStyle: {
                      flex: 1,
                    },
                    presentation: 'modal',
                    animationTypeForReplace: 'pop',
                  }}
                />
                <Stack.Screen name="MyAccaunt" component={MyAccauntComponent} />
                <Stack.Screen
                  name="SearchScreen"
                  component={SearchScreenComponentDesigner}
                />
                <Stack.Screen
                  name="CategoryScreen"
                  component={CategoryScreenComponentDesigner}
                />
                <Stack.Screen
                  name="CategorySingleScreen"
                  component={CategorySingleScreenComponentDesigner}
                />
                <Stack.Screen
                  name="SubCategoryScreen"
                  component={SubCategoryScreenComponentDesigner}
                />
                <Stack.Screen
                  name="EditPhoneNumberDesigner"
                  component={EditPhoneNumberDesignerComponent}
                />
                <Stack.Screen
                  name="EditPhoneNumberDesignerConfirm"
                  component={EditPhoneNumberDesignerConfirm}
                />
                <Stack.Screen
                  name="EditPasswordDesigner"
                  component={EditPasswordDesignerCompnent}
                />
                <Stack.Screen
                  name="ZakaziLiveDesigner"
                  component={ZakaziLiveDesignerFunc}
                />
                <Stack.Screen
                  name="LiveZakazchikSinglDesigner"
                  component={LiveZakazchikSinglDesignerFunc}
                />
                <Stack.Screen
                  name="AddZakazchikDesigner"
                  component={AddZakazchikDesignerComponent}
                />
                <Stack.Screen
                  name="AboutUsScreen"
                  component={AboutUsScreenComponent}
                />
              </Stack.Navigator>
            ) : // Customer Pages Tabs

            loginState.userToken !== null && loginState.userRole == '3' ? (
              <Stack.Navigator
                initialRouteName={
                  urlLinking.length > 0 &&
                  loginState.userRole == '3' &&
                  loginState.userToken !== null
                    ? 'CustomerMainPageTwo'
                    : 'CustomerMainPage'
                }
                screenOptions={({route}) => ({
                  tabBarShowLabel: false,
                  headerShown: false,
                  tabBarActiveTintColor: '#2EB6A5',
                  tabBarInactiveTintColor: 'gray',
                  tabBarStyle: tabBarStyle,
                })}>
                {urlLinking.length > 0 &&
                loginState.userRole == '3' &&
                loginState.userToken !== null ? (
                  <Stack.Screen
                    name="CustomerMainPageTwo"
                    component={CustomerPageTwoComponent}
                    initialParams={{id}}
                  />
                ) : (
                  <Stack.Screen
                    name="CustomerMainPage"
                    component={CustomerMainPageComponent}
                  />
                )}
                {urlLinking.length > 0 &&
                loginState.userRole == '3' &&
                loginState.userToken !== null ? (
                  <Stack.Screen
                    name="CustomerMainPage"
                    component={CustomerMainPageComponent}
                  />
                ) : (
                  <Stack.Screen
                    name="CustomerMainPageTwo"
                    component={CustomerPageTwoComponent}
                    initialParams={{id}}
                  />
                )}

                <Stack.Screen
                  name={'Slider'}
                  component={Carousel}
                  options={{
                    headerTransparent: true,
                    gestureEnabled: true,

                    animation: 'fade_from_bottom',

                    contentStyle: {
                      flex: 1,
                    },
                    presentation: 'modal',
                    animationTypeForReplace: 'pop',
                  }}
                />

                <Stack.Screen name="AddProduct" component={AddProductScreen} />
                {/* <Stack.Screen
                  name="CheckDesigner"
                  component={CheckDesignerComponent}
                /> */}

                <Stack.Screen
                  name="CustomerMyAccaunt"
                  component={CustomerMyAccauntComponent}
                />
                <Stack.Screen
                  name="SelectSubCategoryScreen"
                  component={SelectSubCategoryScreenComponent}
                />
                <Stack.Screen
                  name="CustomerPageTwo"
                  component={CustomerPageTwoComponent}
                  initialParams={{id}}
                />
                <Stack.Screen
                  name="SelectCategoryScreen"
                  component={SelectCategoryScreenComponent}
                />
                <Stack.Screen name="Praductia" component={PraductiaFunc} />
                <Stack.Screen
                  name="EditPhoneNumber"
                  component={EditPhoneNumberComponent}
                />
                <Stack.Screen
                  name="EditPhoneNumberConfirm"
                  component={EditPhoneNumberConfirmFunc}
                />

                <Stack.Screen
                  name="EditPasswordCustomer"
                  component={EditPasswordCustomerCompnent}
                />
                <Stack.Screen
                  name="ZakaziLive"
                  component={ZakaziLiveComponent}
                />
                <Stack.Screen
                  name="LiveZakazchikSingl"
                  component={LiveZakazchikSinglFunc}
                />
                <Stack.Screen name="AddZakazi" component={AddZakaziFunc} />
                <Stack.Screen name="EditZakazi" component={EditZakaziFunc} />
                <Stack.Screen
                  name="EditProduct"
                  component={EditProductScreen}
                />
                <Stack.Screen
                  name="SearchScreen"
                  component={SearchScreenComponentCustomer}
                />
                <Stack.Screen
                  name="CategoryScreen"
                  component={CategoryScreenComponentCustomer}
                />
                <Stack.Screen
                  name="CategorySingleScreen"
                  component={CategorySingleScreenComponentCustomer}
                />
                <Stack.Screen
                  name="SubCategoryScreen"
                  component={SubCategoryScreenComponentCustomer}
                />
                <Stack.Screen
                  name="AboutUsScreen"
                  component={AboutUsScreenComponent}
                />
              </Stack.Navigator>
            ) : // Guest pages tabs

            loginState.userToken == null ? (
              <Stack.Navigator
                initialRouteName={
                  urlLinking.length > 0 && loginState.userToken == null
                    ? 'GhostPageTwo'
                    : 'GhostPage'
                }
                screenOptions={({route}) => ({
                  tabBarShowLabel: false,
                  headerShown: false,
                  tabBarActiveTintColor: '#2EB6A5',
                  tabBarInactiveTintColor: 'gray',
                  tabBarStyle: tabBarStyle,
                })}>
                {/* {urlLinking.length > 0 ? (
                  <Stack.Screen
                    name="GhostPageTwo"
                    // component={GhostPageTwoFunc}
                    component={GhostPageTwoComponent}
                    initialParams={{id}}
                  />
                ) : (
                  <Stack.Screen
                    name="GhostPage"
                    component={GhostPageComponent}
                  />
                )}
                {} */}
                <Stack.Screen
                  name="GhostPageTwo"
                  // component={GhostPageTwoFunc}
                  component={GhostPageTwoComponent}
                  initialParams={{id}}
                />

                <Stack.Screen name="GhostPage" component={GhostPageComponent} />
                <Stack.Screen
                  name="LoginScreen"
                  component={LoginScreenComponent}
                />
                <Stack.Screen
                  name={'Slider'}
                  component={Carousel}
                  options={{
                    headerTransparent: true,
                    gestureEnabled: true,

                    animation: 'fade_from_bottom',

                    contentStyle: {
                      flex: 1,
                    },
                    presentation: 'modal',
                    animationTypeForReplace: 'pop',
                  }}
                />
                <Stack.Screen
                  name="ConfirmTelScreen"
                  component={ConfirmTelScreenFunction}
                />
                <Stack.Screen
                  name="RegisteredScreen"
                  component={RegisteredScreenComponent}
                />
                <Stack.Screen
                  name="RegisteredUserScreen"
                  component={RegistrationUserScreenComponent}
                />
                <Stack.Screen
                  name="RegistrationManufacturer"
                  component={RegistrationManufacturerComponent}
                />
                <Stack.Screen
                  name="AuthScreen"
                  component={AuthScreenComponent}
                />
                <Stack.Screen
                  name="SearchScreen"
                  component={SearchScreenComponentGuest}
                />
                <Stack.Screen
                  name="CategoryScreen"
                  component={CategoryScreenComponentGuest}
                />
                <Stack.Screen
                  name="CategorySingleScreen"
                  component={CategorySingleScreenComponentGuest}
                />
                <Stack.Screen
                  name="SubCategoryScreen"
                  component={SubCategoryScreenComponentGuest}
                />

                <Stack.Screen
                  name="ForgetPassword"
                  component={ForgetPasswordComponent}
                />
                <Stack.Screen
                  name="ForgetPasswordTel"
                  component={ForgetPasswordTelComponent}
                />
                <Stack.Screen
                  name="NewPassword"
                  component={NewPasswordComponent}
                />
                <Stack.Screen name="Modal" component={ModalComponent} />
                <Stack.Screen
                  name="AboutUsScreen"
                  component={AboutUsScreenComponent}
                />
              </Stack.Navigator>
            ) : (
              <></>
            )
          }
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
}
