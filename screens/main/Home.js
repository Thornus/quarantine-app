import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { store } from '../../store';
import moment from 'moment';
import { t } from 'i18n-js';
import design from '../../utils/design';
// import getElasticFontSize from '../../utils/getElasticFontSize';
import GradientWrapper from '../../components/GradientWrapper';
import ActionButton from '../../components/ActionButton';
import Dashboard from '../../components/Dashboard';

const Home = ({navigation}) => {
  const {dispatch, state: globalState} = useContext(store);
  const {name, startDate, daysLength, symptomsByDay} = globalState;

  const endDate = moment(startDate).add(daysLength, 'days');
  const today = moment();
  const daysCount = daysLength - endDate.diff(today, 'days');

  if(!symptomsByDay[daysCount-1]) {
    symptomsByDay.push([]);
    dispatch({type: 'SET_SYMPTOMS', payload: {symptomsByDay}});
  }

  const todaySymptoms = symptomsByDay[daysCount-1] || [];

  const actionButtonIcon = <Icon 
                            style={{marginLeft: 20}} 
                            name="md-add-circle-outline" 
                            size={28} 
                            color="white"/>;

  const createTodaySymptomsButtons = () => {
    let symptomButtons = [];

    for (let i = 0; i < todaySymptoms.length; i++) {
      const symptomText = todaySymptoms[i];

      symptomButtons.push(
        <ActionButton 
          text={symptomText}
          key={symptomText}
          style={styles.symptomButton}
          enabled={false}
        />
      );
    }

    return symptomButtons;
  }

  const getTodayMessage = () => {
    if(daysCount < (daysLength/2)) {
      return `${t('home.messages.beginning')} ${name}!`;
    } else if(daysCount === daysLength/2) {
      return t('home.messages.halfway').replace('{name}', name);
    } else if(daysCount > daysLength/2 && daysCount !== daysLength) {
      return t('home.messages.afterHalfway');
    } else if(daysCount === daysLength) {
      return t('home.messages.lastDay');
    }
  }

  let symptomButtons = createTodaySymptomsButtons();

  return(
    <GradientWrapper viewExtendedStyle={{marginRight: design.spacing.defaultMargin, marginLeft: design.spacing.defaultMargin}}>
      <Text style={styles.titleText}>{`${t('home.day')} ${daysCount} ${t('home.of')} ${daysLength}`}</Text>
      
      <Text style={{...styles.bodyText}}>{getTodayMessage()}</Text>

      <Dashboard/>

      {symptomButtons.length ?
        <View style={styles.symptomsSection}>
          <Text style={{...styles.bodyText, marginBottom: design.spacing.defaultMargin}}>{`${t('home.todaySymptoms')}`}</Text>

          <View style={styles.symptomButtonsContainer}>
            {symptomButtons}
          </View>
        </View> : null
      }

      <ActionButton 
        text={symptomButtons.length ? t('buttons.addRemoveSymptoms') : t('buttons.addSymptoms')} 
        icon={actionButtonIcon} 
        onPress={() => navigation.navigate('AddSymptoms', {daysCount})} 
        style={styles.addButton}
      />
    </GradientWrapper>
  );
}

export default Home;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 32,
    fontFamily: design.fontFamilies.semibold,
    color: design.colors.fontColor,
    marginTop: design.spacing.defaultMargin,
    marginBottom: design.spacing.defaultMargin
  },
  bodyText: {
    fontSize: design.sizes.bodyFontSize,
    fontFamily: design.fontFamilies.regular,
    color: design.colors.fontColor,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  symptomsSection: {
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  symptomButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  symptomButton: {
    marginRight: design.spacing.defaultMargin,
    marginBottom: design.spacing.defaultMargin
  },
  addButton: {
    marginBottom: design.spacing.defaultMargin + 10
  }
});
