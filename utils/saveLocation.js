import CryptoJS from 'react-native-crypto-js';
import { AsyncStorage } from 'react-native';
import { ENCRYPTION_KEY } from 'react-native-dotenv';
import getZipCode from './getZipCode';

export default saveLocation = async (countryCode, regionCode, city) => {
  let zipCode = '';
  if(countryCode === 'US') {
    zipCode = getZipCode(regionCode, city);
  }

  const encryptedString = CryptoJS.AES.encrypt(JSON.stringify({countryCode, regionCode, city, zipCode}), ENCRYPTION_KEY).toString();
  try {
    await AsyncStorage.setItem('@itc:location', encryptedString);
  } catch (error) {
    console.error('Error saving data.');
  }
}