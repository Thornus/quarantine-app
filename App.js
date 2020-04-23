import React from 'react';
import { NativeModules, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { enableScreens } from 'react-native-screens';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import * as Analytics from 'expo-firebase-analytics';
import { createStateProvider } from './store';
import i18n, { t } from 'i18n-js';
import moment from 'moment';
import langs from './data/langs';
import design from './utils/design';
import getSavedData from './utils/getSavedData';
import BottomTabNavigator from './components/BottomTabNavigator';
import InsertName from './screens/setup/InsertName';
import SelectStart from './screens/setup/SelectStart';
import HowLong from './screens/setup/HowLong';
import AddSymptoms from './screens/secondary/AddSymptoms';
import AddDoctorEmail from './screens/secondary/AddDoctorEmail';

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  constructor(props) {
    super(props);

    if(Platform.OS === 'android') {
      StatusBar.setHidden(true);
    }

    enableScreens(); //uses the screens of react-native-screens, boosting performance

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
      'montserrat-semibold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      ...Ionicons.font
    });

    this.setState({fontLoaded: true});
  }

  async setLanguage() {
    const savedLangObject = await getSavedData('lang');
    const localeLang =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    if(savedLangObject) {
      i18n.locale = savedLangObject.langCode;
      moment.locale(savedLangObject.langCode);
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

      if(langExists) {
        moment.locale(localeLang);
      }
    }

    i18n.fallbacks = true;
  }

  async createNavigation() {
    let initialRouteName = 'InsertName';
    let data;

    try {
      data = await getSavedData('info');
    } catch (error) {
      // error retrieving data
    }

    if(data) {
      initialRouteName = 'Main';
    }

    //EXPLANATION: AnimatedSwitchNavigator -> StackNavigator -> TabNavigator
    const StackNavigator = createStackNavigator(
      {
        ScreenWithTabs: {
          screen: BottomTabNavigator,
          navigationOptions: () => {
            return {
              headerShown: false
            };
          }
        },
        AddSymptoms: {
          screen: AddSymptoms,
          navigationOptions: () => {
            return {
              title: t('addSymptoms.title'),
              headerStyle: {
                backgroundColor: design.colors.primaryColor
              },
              headerTitleStyle: {
                color: design.colors.secondaryFontColor
              },
              headerBackTitleStyle: {
                color: design.colors.secondaryFontColor
              }
            };
          }
        },
        AddDoctorEmail: {
          screen: AddDoctorEmail,
          navigationOptions: () => {
            return {
              title: t('addDoctorEmail.title'),
              headerStyle: {
                backgroundColor: design.colors.primaryColor
              },
              headerTitleStyle: {
                color: design.colors.secondaryFontColor
              },
              headerBackTitleStyle: {
                color: design.colors.secondaryFontColor
              }
            };
          }
        }
      }
    );

    const MainNavigator = createAnimatedSwitchNavigator(
      {
        InsertName: {screen: InsertName},
        SelectStart: {screen: SelectStart},
        HowLong: {screen: HowLong},
        Main: {screen: StackNavigator}
      },
      {
        initialRouteName,
        headerMode: 'none',
        backBehavior: 'order'
      }
    );
    
    Analytics.setCurrentScreen(initialRouteName);

    this.StateProvider = await createStateProvider();

    this.setState({AppContainer: createAppContainer(MainNavigator)});
  }

  render() {
    const AppContainer = this.state.AppContainer && this.state.AppContainer;
    const StateProvider = this.StateProvider;

    return(
      this.state.fontLoaded && AppContainer ?
        <StateProvider>
          <AppContainer 
            onNavigationStateChange={(prevState, currentState) => {
              const currentScreen = getActiveRouteName(currentState);
              const prevScreen = getActiveRouteName(prevState);
              if (prevScreen !== currentScreen) {
                Analytics.setCurrentScreen(currentScreen);
              }
            }}
          />
        </StateProvider>
      : null
    );
  }
}

const getActiveRouteName = (navigationState) => {
  if(!navigationState) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];
  if(route.routes) { // Parse the nested navigators
    return getActiveRouteName(route);
  }

  return route.routeName;
}
