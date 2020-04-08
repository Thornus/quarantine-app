import React from 'react';
import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { enableScreens } from 'react-native-screens';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createStateProvider } from './store';
import * as Localization from 'expo-localization';
import { t } from 'i18n-js';
import i18n from 'i18n-js';
import moment from 'moment';
import langs from './data/langs';
import design from './utils/design';
import getSavedData from './utils/getSavedData';
import BottomTabNavigator from './components/BottomTabNavigator';
import InsertName from './screens/setup/InsertName';
import SelectStart from './screens/setup/SelectStart';
import HowLong from './screens/setup/HowLong';
import AddSymptoms from './screens/main/AddSymptoms';

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  constructor(props) {
    super(props);

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
    const localeLang = Localization.locale === 'en' ? 'en-US' : Localization.locale;
    const savedLangObject = await getSavedData('lang');

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
      moment.locale(langExists ? localeLang : 'en-US');
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
        }
      },
      {
        mode: 'modal'
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
    
    this.StateProvider = await createStateProvider();

    this.setState({AppContainer: createAppContainer(MainNavigator)});
  }

  render() {
    const AppContainer = this.state.AppContainer && this.state.AppContainer;
    const StateProvider = this.StateProvider;

    return(
      this.state.fontLoaded && AppContainer ?
        <StateProvider>
          <AppContainer/>
        </StateProvider>
      : null
    );
  }
}
