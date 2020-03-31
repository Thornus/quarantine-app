import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { connect } from 'react-redux';
// import setLanguageActionCreator from '../../actions/setLanguageActionCreator';
import Constants from 'expo-constants';
import CryptoJS from 'react-native-crypto-js';
import { AsyncStorage } from 'react-native';
import { ENCRYPTION_KEY } from 'react-native-dotenv';
import RNPickerSelect from 'react-native-picker-select';
import i18n, { t } from 'i18n-js';
import langs from '../../data/langs';
import getSavedData from '../../utils/getSavedData';
import GradientWrapper from '../../components/GradientWrapper';
import LocationHeader from '../../components/LocationHeader';
import Rating from '../../components/Rating';

const langCodesToLangMap = {
  'en-US': langs.english.langName,
  'es-ES': langs.spanish.langName
};

class Settings extends React.Component {
  static navigationOptions = () => {
    return {
      title: t('settings.title')
    }
  }

  state = {
    selectedLanguage: langCodesToLangMap[i18n.locale]
  }

  async componentDidMount() {
    const locationData = await getSavedData('location');
    this.setState({locationData})
  }

  async selectLanguage(lang) {
    this.setState({selectedLanguage: lang});

    for (const langCode in langCodesToLangMap) {
      if (langCodesToLangMap[langCode] === lang && langCodesToLangMap.hasOwnProperty(langCode)) {
        i18n.locale = langCode;
        this.props.dispatch(setLanguageActionCreator(langCode));

        const encryptedString = CryptoJS.AES.encrypt(JSON.stringify({langCode}), ENCRYPTION_KEY).toString();
        await AsyncStorage.setItem('@itc:lang', encryptedString);
        return;
      }
    }
  }

  render() {
    let pickerItems = [];

    for(const langKey in langs) {
      if(langs.hasOwnProperty(langKey)) {
        const langName = langs[langKey].langName;

        pickerItems.push({
          key: langName,
          label: langName,
          value: langName
        });
      }
    }

    return (
      <GradientWrapper>
        <LocationHeader navigateTo={this.props.navigation.navigate} locationData={this.state.locationData}/>
        
        <View style={styles.container}>
          <View style={styles.view}>
            <Text style={{...styles.text, flex: 1, paddingTop: 10}}>{t('settings.languageText').toUpperCase()}</Text>
            <RNPickerSelect
              onValueChange={(lang) => this.selectLanguage(lang)}
              items={pickerItems}
              value={this.state.selectedLanguage}
              placeholder={{}}
              style={{inputIOS: styles.pickerText, inputAndroid: styles.pickerText}}
            />
          </View>

          <Rating/>
        </View>

        <View style={styles.appVersionContainer}>
          <Text style={{...styles.text, marginBottom: 20}}>{t('settings.appVersion').toUpperCase()} {Constants.nativeAppVersion}</Text>
        </View>
      </GradientWrapper>
    );
  }
}

// export default connect()(Settings);
export default Settings;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 15
  },
  view: {
    flexDirection: 'row',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 12
  },
  text: {
    fontFamily: 'montserrat-regular',
    fontSize: 18,
    color: 'white'
  },
  pickerText: {
    fontFamily: 'montserrat-bold',
    fontSize: 18,
    color: '#ffc',
    padding: 10
  },
  appVersionContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  }
});
