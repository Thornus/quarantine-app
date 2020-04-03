import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { t } from 'i18n-js';

const NavigationButtons = ({navigation, data, nextScreen, hideBack = false, backText, nextText, isNextDisabled = false}) => {
  if(!backText) {
    backText = hideBack ? '' : t('buttons.back');
  }

  return (
    <View style={styles.buttonsContainer}>
      <Button
        onPress={() => navigation.goBack()}
        title={backText}
        style={styles.button}
      />

      <Button
        onPress={() => {navigation.navigate(nextScreen, data)}}
        title={nextText || t('buttons.next')}
        disabled={isNextDisabled}
        style={styles.button}
      />
    </View>
  );
}

export default NavigationButtons;

const styles = StyleSheet.create({
  button: {
    flex: 1
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10
  }
});