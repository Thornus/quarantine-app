import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as StoreReview from 'expo-store-review';
import Icon from '@expo/vector-icons/Ionicons';
import { store } from '../../store';
import moment from 'moment';
import { t } from 'i18n-js';
import design from '../../utils/design';
import GradientWrapper from '../../components/GradientWrapper';
import Congrats from '../../components/Congrats';
import ActionButton from '../../components/ActionButton';
import IconButton from '../../components/IconButton';
import Dashboard from '../../components/Dashboard';
import Tag from '../../components/Tag';

const Home = ({navigation}) => {
  const {dispatch, state: globalState} = useContext(store);
  const {name, startDate, daysLength, symptomsByDay} = globalState;

  const endDate = moment(startDate).add(daysLength, 'days');
  const today = moment();
  const daysCount = daysLength - endDate.diff(today, 'days');

  if(!symptomsByDay[daysCount-1] && !today.isAfter(endDate)) {
    symptomsByDay.push([]);
    dispatch({type: 'SET_SYMPTOMS', payload: {symptomsByDay}});
  }

  const todaySymptoms = symptomsByDay[daysCount-1] || [];

  const addIconWhite = <Icon 
                          style={{marginLeft: design.spacing.defaultMargin}} 
                          name="md-add-circle-outline" 
                          size={28} 
                          color={design.colors.secondaryFontColor}/>;

  const addIconGreen = <Icon 
                          style={{marginTop: 4}} 
                          name="md-add-circle-outline" 
                          size={28} 
                          color={design.colors.primaryColor}/>;


  const createTodaySymptomsTags = () => {
    let symptomsTags = [];

    for (let i = 0; i < todaySymptoms.length; i++) {
      const symptomText = todaySymptoms[i];

      symptomsTags.push(
        <Tag 
          text={symptomText}
          key={symptomText}
        />
      );
    }

    return symptomsTags;
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
    handleRating(daysCount);
  });

  let symptomsTags = createTodaySymptomsTags();

  if(today.isAfter(endDate)) {
    return(
      <GradientWrapper viewExtendedStyle={{marginHorizontal: design.spacing.defaultMargin}}>
        <Congrats/>
      </GradientWrapper>
    );
  }

  return(
    <GradientWrapper viewExtendedStyle={{marginHorizontal: design.spacing.defaultMargin}}>
      <Text style={styles.titleText}>{`${t('home.day')} ${daysCount} ${t('home.of')} ${daysLength}`}</Text>
      <Text style={{...styles.bodyText}}>{getTodayMessage()}</Text>

      <Dashboard/>

      {symptomsTags.length ?
      
        <View style={styles.symptomsSection}>
          <Text style={{...styles.bodyText, marginBottom: design.spacing.smallMargin}}>{`${t('home.todaySymptoms')}`}</Text>

          <View style={styles.symptomsTagsContainer}>
            {symptomsTags}

            <IconButton
              icon={addIconGreen}
              onPress={() => navigation.navigate('AddSymptoms', {daysCount})} 
            />
          </View>
        </View> :

        <ActionButton 
          text={t('buttons.addSymptoms')} 
          icon={addIconWhite} 
          onPress={() => navigation.navigate('AddSymptoms', {daysCount})} 
        />
      }
    </GradientWrapper>
  );
}

export default Home;

const handleRating = (daysCount) => {
  setTimeout(async () => {
      let {rating} = await getSavedData('rating') || {};

      if(!rating && daysCount > 2) {
        if(StoreReview.isAvailableAsync()) {
          StoreReview.requestReview();
        }
    
        await saveData({rating}, 'rating');
      }
    }, 2000);
}

const styles = StyleSheet.create({
  titleText: {
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
  symptomsTagsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
