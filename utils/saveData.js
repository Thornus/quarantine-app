import CryptoJS from 'react-native-crypto-js';
import { AsyncStorage } from 'react-native';
import { ENCRYPTION_KEY } from 'react-native-dotenv';

export default saveData = async (data, dataName) => {
  const encryptedString = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();

  try {
    await AsyncStorage.setItem(`@app:${dataName}`, encryptedString);
  } catch (error) {
    console.error('Error saving data.');
  }
}