import CryptoJS from 'react-native-crypto-js';
import { AsyncStorage } from 'react-native';
import { ENCRYPTION_KEY } from 'react-native-dotenv';

export default getSavedData = async (dataName) => {
  try {
    let data = await AsyncStorage.getItem(`@app:${dataName}`);

    let bytes = data && CryptoJS.AES.decrypt(data, ENCRYPTION_KEY);
    data = bytes && JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
    return data;
  } catch (error) {
    console.log('Error retrieving data:', error);
  }
}