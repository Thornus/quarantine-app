import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Constants from 'expo-constants';
import { store } from '../../store';
import design from '../../utils/design';
// import RNPickerSelect from 'react-native-picker-select';
import i18n, { t } from 'i18n-js';
import langs from '../../data/langs';
import GradientWrapper from '../../components/GradientWrapper';
import Rating from '../../components/Rating';

const langCodesToLangMap = {
  'en-US': langs.english.langName,
  'es-ES': langs.spanish.langName
};

const Settings = () => {
  const {dispatch, state: globalState} = useContext(store);
  const {doctorEmail} = globalState;

  const [emailValue, setEmailValue] = useState(doctorEmail);
  const [isValidEmail, setIsValidEmail] = useState(true);

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

      <Text style={styles.settingHeader}>{t('settings.doctorEmail')}</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => {
          setEmailValue(text);
          setIsValidEmail(true); // this is to hide the error before pressing send
          dispatch({type: 'SET_DOCTOR_EMAIL', payload: {doctorEmail: text}});
        }}
        value={emailValue || doctorEmail}
        keyboardType='email-address'
        autoCompleteType='email'
        textContentType='emailAddress'
        autoCapitalize='none'
      />
      

      <Rating/>

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
  settingHeader: {
    fontFamily: design.fontFamilies.semibold,
    fontSize: design.sizes.buttonFontSize,
    marginBottom: design.spacing.smallMargin
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
