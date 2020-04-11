import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
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
  // state = {
  //   selectedLanguage: langCodesToLangMap[i18n.locale]
  // }

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
    <GradientWrapper viewExtendedStyle={{marginHorizontal: design.spacing.defaultMargin}}>
      <Text style={styles.titleText}>{t('settings.title')}</Text>
      
      <View style={styles.container}>
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

        <Rating/>

        <Text style={{...styles.text, marginTop: design.spacing.defaultMargin}}>{t('settings.thankYou')}</Text>
      </View>

      <View style={styles.appVersionContainer}>
        <Text style={{...styles.text, marginBottom: design.spacing.defaultMargin}}>{t('settings.appVersion').toUpperCase()} {Constants.nativeAppVersion}</Text>
      </View>
    </GradientWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 15
  },
  view: {
    flexDirection: 'row',
    marginHorizontal: design.spacing.defaultMargin,
    marginBottom: 12
  },
  titleText: {
    fontSize: design.sizes.headerFontSize,
    fontFamily: design.fontFamilies.semibold,
    color: design.colors.fontColor,
    marginTop: design.spacing.defaultMargin
  },
  text: {
    fontFamily: design.fontFamilies.regular,
    fontSize: design.sizes.bodyFontSize,
    color: design.colors.fontColor
  },
  pickerText: {
    fontFamily: design.fontFamilies.bold,
    fontSize: design.sizes.bodyFontSize,
    color: '#ffc',
    padding: 10
  },
  appVersionContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  }
});
