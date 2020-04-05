import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { store } from '../../store';
import moment from 'moment';
import { t } from 'i18n-js';
// import getElasticFontSize from '../../utils/getElasticFontSize';
import GradientWrapper from '../../components/GradientWrapper';
import ActionButton from '../../components/ActionButton';

const Home = ({navigation}) => {
  const {dispatch, state: globalState} = useContext(store);
  const {name, startDate, daysLength, todaySymptoms = []} = globalState;

  const endDate = moment(startDate).add(daysLength, 'days');
  const today = moment();
  const dayCount = daysLength - endDate.diff(today, 'days');

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

  let symptomButtons = createTodaySymptomsButtons();

  return(
    <GradientWrapper viewExtendedStyle={{marginRight: 20, marginLeft: 20}}>
      <Text style={styles.titleText}>{`${t('home.day')} ${dayCount} ${t('home.of')} ${daysLength}`}</Text>
      
      <Text style={{...styles.bodyText, marginBottom: 50}}>{`${t('home.messages.day1')} ${name}!`}</Text>

      {symptomButtons.length ?
        <View style={styles.symptomsSection}>
          <Text style={{...styles.bodyText, marginBottom: 20}}>{`${t('home.todaySymptoms')}`}</Text>

          <View style={styles.symptomButtonsContainer}>
            {symptomButtons}
          </View>
        </View> : null
      }

      <ActionButton 
        text={symptomButtons.length ? t('buttons.addRemoveSymptoms') : t('buttons.addSymptoms')} 
        icon={actionButtonIcon} 
        onPress={() => navigation.navigate('AddSymptoms')} 
        style={styles.addButton}
      />
    </GradientWrapper>
  );
}

export default Home;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 32,
    fontFamily: 'montserrat-semibold',
    color: 'black',
    marginTop: 20,
    marginBottom: 80
  },
  bodyText: {
    fontSize: 18,
    fontFamily: 'montserrat-regular',
    color: 'black'
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
    marginRight: 20,
    marginBottom: 20
  },
  addButton: {
    marginBottom: 30
  }
});
