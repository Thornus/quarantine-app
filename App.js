import React from 'react';
import { AsyncStorage } from 'react-native';
// import { connect } from 'react-redux';
import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
// import { Provider } from 'react-redux';
// import store from './store';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import langs from './data/langs';
import axios from 'axios';
// import getSavedData from './utils/getSavedData';
// import BottomTabNavigator from './components/BottomTabNavigator';
import SelectStart from './screens/setup/SelectStart';
// import ConfirmLocation from './screens/setup/ConfirmLocation';

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  constructor(props) {
    super(props);

    i18n.translations = {
      "en-US": langs.english,
      "es-ES": langs.spanish
    };
  }

  async componentDidMount() {
    await this.setLanguage();

    await this.createNavigation();

    await Font.loadAsync({
      'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      ...Ionicons.font
    });

    this.setState({fontLoaded: true});
  }

  async setLanguage() {
    const localeLang = Localization.locale === 'en' ? 'en-US' : Localization.locale;
    // const savedLangObject = await getSavedData('lang');
    const savedLangObject = null;

    if(savedLangObject) {
      i18n.locale = savedLangObject.langCode;
    } else {
      let langExists = false;

      for (const langCode in i18n.translations) {
        if (i18n.translations.hasOwnProperty(langCode)) {
          if(localeLang === langCode) {
            langExists = true;
            break;
          }
        }
      }

      i18n.locale = langExists ? localeLang : 'en-US';
    }

    i18n.fallbacks = true;
  }

  async getLocationFromIp() {
    const {data: {city, region_code, country_code}} = await axios('https://freegeoip.app/json');

    if(city) {
      return {
        city,
        regionCode: region_code,
        countryCode: country_code
      }
    }
  }

  async getLocationFromStorage() {
    try {
      return await AsyncStorage.getItem('@itc:location');
    } catch (error) {
      // error retrieving data
    }
  }

  async createNavigation() {
    let initialRouteName = 'SelectStart';

    // const locationFromStorage = await this.getLocationFromStorage();
    // const locationFromIp = await this.getLocationFromIp();

    // if(locationFromStorage) {
    //   initialRouteName = 'Main';
    // } else if(locationFromIp) {
    //   initialRouteName = 'ConfirmLocation';
    // }

    const MainNavigator = createAnimatedSwitchNavigator(
      {
        SelectStart: {screen: SelectStart},
        // ConfirmLocation: {
        //   screen: props => <ConfirmLocation {...props}/>,
        //   params: {
        //     city: locationFromIp && locationFromIp.city,
        //     regionCode: locationFromIp && locationFromIp.regionCode,
        //     countryCode: locationFromIp && locationFromIp.countryCode
        //   }
        // },
        // Main: {screen: BottomTabNavigator}
      },
      {
        initialRouteName,
        headerMode: 'none',
        backBehavior: 'order'
      }
    );
    
     this.setState({AppContainer: createAppContainer(MainNavigator)});
  }

  render() {
    // const AppContainer = this.state.AppContainer && connect(mapStateToProps)(this.state.AppContainer);
    const AppContainer = this.state.AppContainer && this.state.AppContainer;

    // return(
    //   this.state.fontLoaded && AppContainer ?
    //   <Provider store={store}>
    //     <AppContainer/>
    //   </Provider>
    //   : null
    // );

    return(
      this.state.fontLoaded && AppContainer ?
          <AppContainer/>
        : null
    );
  }
}

// const mapStateToProps = ({languageState}) => {
//   return {
//     language: languageState.language
//   };
// };
