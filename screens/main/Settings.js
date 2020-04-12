import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Constants from 'expo-constants';
import { store } from '../../store';
import design from '../../utils/design';
// import RNPickerSelect from 'react-native-picker-select';
import i18n, { t } from 'i18n-js';
import langs from '../../data/langs';
import GradientWrapper from '../../components/GradientWrapper';
import SettingRow from '../../components/SettingRow';
import Rating from '../../components/Rating';
import ActionButton from '../../components/ActionButton';

const langCodesToLangMap = {
  'en-US': langs.english.langName,
  'es-ES': langs.spanish.langName
};

const Settings = ({navigation}) => {
  const {state: globalState} = useContext(store);
  const {doctorEmail} = globalState;

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

      <SettingRow label={t('settings.doctorEmail')}>
        <Text style={{fontSize: design.sizes.buttonFontSize, color: design.colors.lighterFontColor}}>{doctorEmail || t('settings.noDoctorEmail')}</Text>
        
        <ActionButton 
          text={doctorEmail ? t('buttons.editEmail') : t('buttons.setEmail')}
          onPress={() => navigation.navigate('AddDoctorEmail', {isSettings: true})} 
          style={{alignSelf: 'flex-start', marginTop: design.spacing.defaultMargin}}
        />
      </SettingRow>
      
      <SettingRow label={t('settings.ratingTitle')}>
        <Rating/>
      </SettingRow>

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
