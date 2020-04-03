import React from 'react';
import { StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const themes = {
  asteroid: ['#0F2027', '#203A43', '#2C5364'],
  coal: ['#EB5757', '#000000'],
  scooter: ['#36D1DC', '#5B86E5'],
  sky: ['#56CCF2', '#2F80ED'],
  sunset: ['#ff7e5f', '#feb47b'],
  white: ['#e4f9f5', '#ffffff']
}

export default class GradientWrapper extends React.Component {
  render() {
    let viewExtendedStyle = this.props.viewExtendedStyle || {};

    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient colors={themes.white} style={{flex: 1, ...this.props.style}}>
          <SafeAreaView style={{...styles.container, ...viewExtendedStyle}}>
            {this.props.children}
          </SafeAreaView>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});