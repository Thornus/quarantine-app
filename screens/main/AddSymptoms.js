import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Icon from '@expo/vector-icons/Ionicons';
import { store } from '../../store';
import { t } from 'i18n-js';
// import getElasticFontSize from '../../utils/getElasticFontSize';
import GradientWrapper from '../../components/GradientWrapper';
import ActionButton from '../../components/ActionButton';
import design from '../../utils/design';

const AddSymptoms = ({navigation}) => {
  const {dispatch, state: globalState} = useContext(store);
  const {todaySymptoms} = globalState;

  const [symptoms, setSymptoms] = useState(todaySymptoms);

  const symptomsTextArr = t('symptoms');
  let symptomButtons = [];

  for (const symptomKey in symptomsTextArr) {
    const symptomText = symptomsTextArr[symptomKey];

    const buttonStyle = symptoms.indexOf(symptomText) === -1 ? styles.inactiveButton : styles.activeButton;
    symptomButtons.push(
      <ActionButton 
        text={symptomText}
        onPress={() => onSymptomButtonPress(symptomText)}
        key={symptomText}
        style={buttonStyle}
      />
    );
  }

  const onSymptomButtonPress = (symptomText) => {
    const symptomIndex = symptoms.indexOf(symptomText);
    let newSymptomsArr = [...symptoms];

    if(symptomIndex === -1) { //add symptom
      newSymptomsArr.push(symptomText);
    } else { //remove symptom
      newSymptomsArr.splice(symptomIndex, 1);
    }

    setSymptoms(newSymptomsArr);
    dispatch({type: 'SET_TODAY_SYMPTOMS', payload: {todaySymptoms: newSymptomsArr}});
  };

  return(
    <GradientWrapper viewExtendedStyle={{marginRight: design.spacing.defaultMargin, marginLeft: design.spacing.defaultMargin}}>
      <Text style={styles.headerText}>{`${t('addSymptoms.selectSymptoms')}`}</Text>
      
      <View style={styles.symptomsContainer}>
        {symptomButtons}
      </View>
    </GradientWrapper>
  );
}

export default AddSymptoms;

const styles = StyleSheet.create({
  headerText: {
    fontSize: design.sizes.headerFontSize,
    fontFamily: design.fontFamilies.regular,
    color: design.colors.fontColor,
    marginTop: design.spacing.extraLargeMargin,
    marginBottom: design.spacing.defaultMargin
  },
  symptomsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  inactiveButton: {
    marginBottom: design.spacing.defaultMargin,
    marginRight: design.spacing.defaultMargin
  },
  activeButton: {
    marginBottom: design.spacing.defaultMargin,
    marginRight: design.spacing.defaultMargin,
    backgroundColor: design.colors.activeColor
  }
});
