import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener
} from 'react-native-iap';
import Constants from 'expo-constants';
import { store } from '../../store';
import Icon from '@expo/vector-icons/FontAwesome5';
// import RNPickerSelect from 'react-native-picker-select';
import i18n, { t } from 'i18n-js';
import langs from '../../data/langs';
import design from '../../utils/design';
import GradientWrapper from '../../components/GradientWrapper';
import SettingRow from '../../components/SettingRow';
import Rating from '../../components/Rating';
import ActionButton from '../../components/ActionButton';

const langCodesToLangMap = {
  'en-US': langs.english.langName,
  'es-ES': langs.spanish.langName
};

const itemSkus = Platform.OS === 'ios' ? [] : ['remove_ads_android'];

let purchaseUpdateSubscription = purchaseUpdatedListener((purchase) => {
  console.log('purchaseUpdatedListener', purchase);
  
  const receipt = purchase.transactionReceipt;
  if (receipt) {
    dispatch({type: 'SET_HAS_ADS', payload: {hasAds: false}});
    saveData({hasAds: false}, 'ads');

    // Tell the store that you have delivered what has been paid for.
    // Failure to do this will result in the purchase being refunded on Android and
    // the purchase event will reappear on every relaunch of the app until you succeed
    // in doing the below. It will also be impossible for the user to purchase consumables
    // again until you do this.
    if (Platform.OS === 'ios') {
      RNIap.finishTransactionIOS(purchase.transactionId);
    } else if (Platform.OS === 'android') {
      // If not consumable
      RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
    }

    // From react-native-iap@4.1.0 you can simplify above `method`. Try to wrap the statement with `try` and `catch` to also grab the `error` message.
    // If not consumable
    RNIap.finishTransaction(purchase, false);
  } else {
    // Retry / conclude the purchase is fraudulent, etc...
  }
});

let purchaseErrorSubscription = purchaseErrorListener((error) => {
  console.warn('purchaseErrorListener', error);
});

const requestPurchase = async (sku) => {
  try {
    await RNIap.requestPurchase(sku, false);
  } catch (err) {
    console.warn(err.code, err.message);
  }
};

const editIcon = <Icon
                    name='edit'
                    size={20}
                    color={design.colors.secondaryFontColor}
                    style={{marginLeft: design.spacing.defaultMargin}} 
                  />;

const Settings = ({navigation}) => {
  const {state: globalState} = useContext(store);
  const {doctorEmail, hasAds} = globalState;

  // async componentDidMount() {
  //   const locationData = await getSavedData('location');
  //   this.setState({locationData})
  // }

  // async selectLanguage(lang) {
  //   this.setState({selectedLanguage: lang});

  //   for (const langCode in langCodesToLangMap) {
  //     if (langCodesToLangMap[langCode] === lang && langCodesToLangMap.hasOwnProperty(langCode)) {
  //       i18n.locale = langCode;
  //       this.props.dispatch(setLanguageActionCreator(langCode));

  //       const encryptedString = CryptoJS.AES.encrypt(JSON.stringify({langCode}), ENCRYPTION_KEY).toString();
  //       await AsyncStorage.setItem('@itc:lang', encryptedString);
  //       return;
  //     }
  //   }
  // }

  // let pickerItems = [];

  // for(const langKey in langs) {
  //   if(langs.hasOwnProperty(langKey)) {
  //     const langName = langs[langKey].langName;

  //     pickerItems.push({
  //       key: langName,
  //       label: langName,
  //       value: langName
  //     });
  //   }
  // }

  useEffect(() => {
    (async () => {
      try {
        const products = await RNIap.getProducts(itemSkus);
        // this.setState({products});
        console.log('products:', products)
      } catch(err) {
        console.warn(err); // standardized err.code and err.message available
      }
    })();
  })

  return (
    <GradientWrapper viewExtendedStyle={{alignItems: 'flex-start', marginHorizontal: design.spacing.defaultMargin}}>
      <Text style={styles.titleText}>{t('settings.title')}</Text>
    
      <View style={styles.view}>
        {/* <Text style={{...styles.text, flex: 1, paddingTop: 10}}>{t('settings.languageText').toUpperCase()}</Text> */}
        {/* <RNPickerSelect
          onValueChange={(lang) => this.selectLanguage(lang)}
          items={pickerItems}
          value={this.state.selectedLanguage}
          placeholder={{}}
          style={{inputIOS: styles.pickerText, inputAndroid: styles.pickerText}}
        /> */}
      </View>

      <SettingRow label={t('settings.doctorEmail')}>
        <Text style={styles.text}>{doctorEmail || t('settings.noDoctorEmail')}</Text>
        
        <ActionButton 
          text={doctorEmail ? t('buttons.editEmail') : t('buttons.setEmail')}
          onPress={() => navigation.navigate('AddDoctorEmail', {isSettings: true})} 
          icon={editIcon}
          style={{alignSelf: 'flex-start', marginTop: design.spacing.defaultMargin}}
        />
      </SettingRow>
      
      <SettingRow label={t('settings.ratingTitle')}>
        <Rating/>
      </SettingRow>

      {hasAds && <SettingRow>
        <ActionButton 
          text={t('buttons.removeAds')}
          onPress={() => requestPurchase(Platform.OS === 'ios' ? '' : 'remove_ads_android')} 
          style={{alignSelf: 'flex-start', marginTop: design.spacing.defaultMargin, marginBottom: design.spacing.smallMargin}}
        />
      </SettingRow>}

      <Text style={{...styles.text, marginTop: design.spacing.defaultMargin}}>{t('settings.thankYou')}</Text>

      <View style={styles.appVersionContainer}>
        <Text style={{...styles.text, marginBottom: design.spacing.defaultMargin}}>{t('settings.appVersion').toUpperCase()} {Constants.nativeAppVersion}</Text>
      </View>
    </GradientWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    marginHorizontal: design.spacing.defaultMargin,
    marginBottom: 12
  },
  titleText: {
    fontSize: design.sizes.headerFontSize,
    fontFamily: design.fontFamilies.semibold,
    alignSelf: 'center',
    color: design.colors.fontColor,
    marginTop: design.spacing.defaultMargin
  },
  text: {
    fontFamily: design.fontFamilies.regular,
    fontSize: design.sizes.buttonFontSize,
    color: design.colors.fontColor
  },
  input: {
    width: '100%',
    fontSize: design.sizes.buttonFontSize,
    fontFamily: design.fontFamilies.regular,
    color: design.colors.fontColor,
    textAlign: 'left',
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomWidth: 1
  },
  pickerText: {
    fontFamily: design.fontFamilies.bold,
    fontSize: design.sizes.bodyFontSize,
    color: '#ffc',
    padding: 10
  },
  appVersionContainer: {
    alignSelf: 'center',
    flexGrow: 1,
    justifyContent: 'flex-end'
  }
});
