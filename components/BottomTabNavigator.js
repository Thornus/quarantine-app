import React from 'react';
// import { connect } from 'react-redux';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from '@expo/vector-icons/Ionicons';
import Home from '../screens/main/Home';
import Breakdown from '../screens/main/Breakdown';
import Settings from '../screens/main/Settings';

const defaultNavigationOptions = ({ navigation }) => ({
  tabBarIcon: ({ focused, horizontal, tintColor }) => {
    const { routeName } = navigation.state;
    let iconName = 'ios-home';

    if (routeName === 'Breakdown') {
      iconName = 'ios-list';
    } else if(routeName === 'Settings') {
      iconName = 'ios-settings';
    }

    return <Icon name={iconName} size={25} color={tintColor}/>;
  },
});

const tabBarOptions = {
  keyboardHidesTabBar: false,
  activeTintColor: '#35B1E6',
  inactiveTintColor: 'white',
  style: {
    backgroundColor: '#1f3d4a',
    borderTopWidth: 0
  }
};


// const mapStateToProps = ({languageState}) => {
//   return {
//     language: languageState.language
//   };
// };

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: {screen: Home},
    Breakdown: {screen: Breakdown},
    Settings: {screen: Settings}
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions,
    tabBarOptions
  }
);

// export default connect(mapStateToProps)(BottomTabNavigator);
export default BottomTabNavigator;
