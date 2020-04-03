import React from 'react';
// import { connect } from 'react-redux';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { Ionicons, MaterialCommunityIcons }from '@expo/vector-icons';
import Home from '../screens/main/Home';
import SymptomsHistory from '../screens/main/SymptomsHistory';
import Settings from '../screens/main/Settings';

const defaultNavigationOptions = ({ navigation }) => ({
  tabBarIcon: ({ focused, horizontal, tintColor }) => {
    const { routeName } = navigation.state;
    let iconName = 'ios-home';

    if (routeName === 'SymptomsHistory') {
      return <MaterialCommunityIcons name='clipboard-pulse-outline' size={25} color={tintColor} style={{marginBottom: -10}}/>;
    } else if(routeName === 'Settings') {
      iconName = 'ios-settings';
    }

    return <Ionicons name={iconName} size={25} color={tintColor} style={{marginBottom: -10}}/>;
  },
});

const tabBarOptions = {
  keyboardHidesTabBar: false,
  activeTintColor: '#ffffff',
  inactiveTintColor: '#c0c1bf',
  style: {
    backgroundColor: '#11999e',
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
    SymptomsHistory: {screen: SymptomsHistory},
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
