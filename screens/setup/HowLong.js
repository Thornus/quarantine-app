import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { store } from '../../store';
import design from '../../utils/design';
import GradientWrapper from '../../components/GradientWrapper';
import NavigationButtons from '../../components/NavigationButtons';
import NumericInput from 'react-native-numeric-input';
import { t } from 'i18n-js';
import saveData from '../../utils/saveData';

const HowLong = ({navigation}) => {
  const {dispatch, state: globalState} = useContext(store);
  const {name, startDate, daysLength} = globalState;

  return (
    <GradientWrapper>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Text style={styles.text}>
          {t('howLong.question')}
        </Text>
      </View>

      <View style={{flex: 1, maxHeight: 65, marginTop: design.spacing.defaultMargin}}>
        <NumericInput
          value={daysLength}
          minValue={3}
          maxValue={40}
          onChange={value => dispatch({type: 'SET_DAYS_LENGTH', payload: {daysLength: value}})}
          style={styles.numericInput}
        />
      </View>

      <View style={{flex: 1}}>
        <Text style={styles.text}>
          {t('howLong.days')}
        </Text>
      </View>

      <NavigationButtons
        navigation={navigation}
        nextScreen='Home'
        nextText='Start'
        nextCallback={() => saveData({name, startDate, daysLength}, 'info')}
      />
    </GradientWrapper>
  );
}

export default HowLong;

const styles = StyleSheet.create({
  text: {
    fontFamily: design.fontFamilies.regular,
    fontSize: design.sizes.bodyFontSize,
    color: design.colors.fontColor,
    marginBottom: design.spacing.defaultMargin
  }
});