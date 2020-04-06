import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { t } from 'i18n-js';

const NavigationButtons = ({navigation, data, nextScreen, hideBack = false, backText, backCallback, nextText, isNextDisabled = false, nextCallback}) => {
  if(!backText) {
    backText = hideBack ? '' : t('buttons.back');
  }

  const onBackPress = () => {
    if(backCallback && typeof backCallback === 'function') {
      backCallback();
    }

    navigation.goBack();
  };

  const onNextPress = () => {
    if(nextCallback && typeof nextCallback === 'function') {
      nextCallback();
    }

    navigation.navigate(nextScreen, data);
  };

  return (
    <View style={styles.buttonsContainer}>
      <Button
        onPress={onBackPress}
        title={backText}
        style={styles.button}
      />

      <Button
        onPress={onNextPress}
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