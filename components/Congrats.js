import React, { useContext }  from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { t } from 'i18n-js';
import { store } from '../store';
import design from '../utils/design';

const Congrats = () => {
  const {state: globalState} = useContext(store);
  const {name} = globalState;

  return(
    <>
      <Text style={styles.titleText}>{`${t('home.congrats')} ${name}!`}</Text>
      <Text style={styles.bodyText}>{`${t('home.itsOver')} 🥳 🎉`}</Text>
      
      <View style={styles.emojiContainer}>
        <Text style={styles.bigEmoji}>🎉</Text>
      </View>
    </>
  );
};

export default Congrats;

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    fontSize: design.sizes.titleFontSize,
    fontFamily: design.fontFamilies.semibold,
    color: design.colors.fontColor,
    marginVertical: design.spacing.defaultMargin
  },
  bodyText: {
    fontSize: design.sizes.bodyFontSize,
    fontFamily: design.fontFamilies.regular,
    color: design.colors.fontColor,
  },
  emojiContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  bigEmoji: {
    fontSize: 140,
    marginBottom: 50
  }
});