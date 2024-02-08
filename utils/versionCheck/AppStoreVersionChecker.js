import {Linking, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import checkVersion from 'react-native-store-version';

const _goToStore = async () => {
  await Linking.openURL(
    Platform.OS === 'ios'
      ? process.env.APP_STORE_URL
      : process.env.PLAY_STORE_URL,
  );
};

export const storeVersionChecker = async navigate => {
  const currentAppVersion = DeviceInfo.getVersion();
  try {
    const check = await checkVersion({
      version: currentAppVersion, // app local version
      iosStoreURL: process.env.APP_STORE_URL,
      androidStoreURL: process.env.PLAY_STORE_URL,
      country: 'am', // default value is 'jp'
    });
    console.log('app version check result', check);
    if (check.result === 'new') {
      navigate('AppUpdateAvailable');
      // Alert.alert(
      //   'Check new update',
      //   'You need to update the application to continue using it',
      //   [{text: 'Cancel'}, {text: 'Update now', onPress: _goToStore}],
      // );
    }
  } catch (err) {
    console.log('Error checking app version', err);
  }
};
