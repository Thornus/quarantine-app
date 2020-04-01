import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import GradientWrapper from '../../components/GradientWrapper';
import NavigationButtons from '../../components/NavigationButtons';
import NumericInput from 'react-native-numeric-input'
import { t } from 'i18n-js';

const HowLong = ({navigation}) => {
  const [daysLength, setDaysLength] = useState(14);

  return (
    <GradientWrapper>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Text style={styles.text}>
          {t('howLong.question')}
        </Text>
      </View>

      <View style={{flex: 1, maxHeight: 65, marginTop: 20}}>
        <NumericInput
          value={daysLength}
          minValue={3}
          maxValue={40}
          onChange={value => setDaysLength(value)}
          style={styles.numericInput}
        />
      </View>

      <View style={{flex: 1}}>
        <Text style={styles.text}>
          {t('howLong.days')}
        </Text>
      </View>

      <NavigationButtons navigation={navigation} nextScreen='Home'/>
    </GradientWrapper>
  );
}

export default HowLong;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'montserrat-regular',
    fontSize: 20,
    color: 'black',
    marginBottom: 20
  },
  numericInput: {
    
  }
});