import React from 'react';
import { StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import design from '../utils/design';

export default class GradientWrapper extends React.Component {
  render() {
    let viewExtendedStyle = this.props.viewExtendedStyle || {};

    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient colors={design.themes.white} style={{flex: 1, ...this.props.style}}>
          <SafeAreaView style={{...styles.container, ...viewExtendedStyle}}>
            {this.props.children}
          </SafeAreaView>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }
}

class GradientWrapperNoKeyboardDismiss extends React.Component {
  render() {
    let viewExtendedStyle = this.props.viewExtendedStyle || {};

    return(
      <LinearGradient colors={design.themes.white} style={{flex: 1, ...this.props.style}}>
        <SafeAreaView style={{...styles.container, ...viewExtendedStyle}}>
          {this.props.children}
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

export {GradientWrapperNoKeyboardDismiss};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});