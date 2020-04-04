import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
// import Icon from '@expo/vector-icons/Ionicons';
// import { store } from '../../store';
import { t } from 'i18n-js';
// import getElasticFontSize from '../../utils/getElasticFontSize';
import GradientWrapper from '../../components/GradientWrapper';
import ActionButton from '../../components/ActionButton';

const AddSymptoms = ({navigation}) => {
  // const {dispatch, state: globalState} = useContext(store);
  // const {name, startDate, daysLength} = globalState;

  const [symptoms, setSymptoms] = useState([]);

  const onSymptomButtonPress = (symptomText) => {
    const symptomIndex = symptoms.indexOf(symptomText);

    if(symptomIndex === -1) {
      setSymptoms([...symptoms, symptomText]);
    } else {
      let newSymptomsArr = [...symptoms];

      newSymptomsArr.splice(symptomIndex, 1);

      setSymptoms(newSymptomsArr);
    }
  };

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
        style={buttonStyle}/>
    );
  }

  // const actionButtonIcon = <Icon 
  //                         style={{marginLeft: 20}} 
  //                         name="md-add-circle-outline" 
  //                         size={28} 
  //                         color="white"/>;

  return(
    <GradientWrapper>
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
    fontSize: 22,
    fontFamily: 'montserrat-regular',
    color: 'black'
  },
  symptomsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  inactiveButton: {
    marginBottom: 20
  },
  activeButton: {
    marginBottom: 20,
    backgroundColor: '#16c6cc'
  }
});
