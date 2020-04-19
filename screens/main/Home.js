import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import * as StoreReview from 'expo-store-review';
import Icon from '@expo/vector-icons/Ionicons';
import { store } from '../../store';
import moment from 'moment';
import { t } from 'i18n-js';
import design from '../../utils/design';
import GradientWrapper from '../../components/GradientWrapper';
import Congrats from '../../components/Congrats';
import ActionButton from '../../components/ActionButton';
import Dashboard from '../../components/Dashboard';
import TodaySymptoms from '../../components/TodaySymptoms';

const addIconWhite = <Icon 
                        name="md-add-circle-outline" 
                        size={design.sizes.iconSize}
                        color={design.colors.secondaryFontColor}
                        style={{marginLeft: design.spacing.defaultMargin}} 
                      />;

const Home = ({navigation}) => {
  const {dispatch, state: globalState} = useContext(store);
  const {name, startDate, daysLength, symptomsByDay} = globalState;

  const [isAskingRating, setIsAskingRating] = useState(false);

  const endDate = moment(startDate).add(daysLength, 'days');
  const today = moment();
  const daysCount = daysLength - endDate.diff(today, 'days');

  const symptomsOfTheDay = symptomsByDay[daysCount-1] || [];

  if(!symptomsByDay[daysCount-1] && !today.isAfter(endDate)) {
    symptomsByDay.push([]);
    dispatch({type: 'SET_SYMPTOMS', payload: {symptomsByDay}});
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

  useEffect(() => {
    handleRating();
  });

  const handleRating = async () => {
    if(!isAskingRating) {
      setIsAskingRating(true);
  
      let {rating} = await getSavedData('rating') || {};
      if(!rating && daysCount > 2) {
        setTimeout(async () => {
            if(StoreReview.isAvailableAsync()) {
              StoreReview.requestReview();
            }
        
            await saveData({rating}, 'rating');
        }, 2000);
      }
    }
  }

  if(today.isAfter(endDate)) {
    return(
      <GradientWrapper viewExtendedStyle={{marginHorizontal: design.spacing.defaultMargin}} noKeyboardDismiss={true}>
        <Congrats/>
      </GradientWrapper>
    );
  }

  return(
    <GradientWrapper viewExtendedStyle={{marginHorizontal: design.spacing.defaultMargin}} noKeyboardDismiss={true}>
      <Text style={styles.titleText}>{`${t('home.day')} ${daysCount} ${t('home.of')} ${daysLength}`}</Text>
      <Text style={styles.bodyText}>{getTodayMessage()}</Text>

      <Dashboard/>

      {symptomsOfTheDay.length
      ? <TodaySymptoms 
          symptoms={symptomsOfTheDay}
          onAddPress={() => navigation.navigate('AddSymptoms', {daysCount})}
        /> 
      : <ActionButton 
          text={t('buttons.addSymptoms')} 
          icon={addIconWhite} 
          onPress={() => navigation.navigate('AddSymptoms', {daysCount})} 
        />
      }
    </GradientWrapper>
  );
}

export default Home;

const styles = StyleSheet.create({
  titleText: {
    fontSize: design.sizes.headerFontSize,
    fontFamily: design.fontFamilies.semibold,
    color: design.colors.fontColor,
    marginVertical: design.spacing.defaultMargin
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
  }
});
