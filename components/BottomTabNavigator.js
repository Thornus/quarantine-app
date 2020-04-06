import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons, MaterialCommunityIcons }from '@expo/vector-icons';
import design from '../utils/design';
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
  activeTintColor: design.colors.activeIconColor,
  inactiveTintColor: design.colors.inactiveIconColor,
  style: {
    backgroundColor: design.colors.primaryColor,
    borderTopWidth: 0
  }
};

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

export default BottomTabNavigator;
