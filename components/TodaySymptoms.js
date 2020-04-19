import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { t } from 'i18n-js';
import Icon from '@expo/vector-icons/Ionicons';
import Tag from '../components/Tag';
import IconButton from '../components/IconButton';
import design from '../utils/design';

const addIconGreen = <Icon 
                        name="md-add-circle-outline" 
                        size={design.sizes.iconSize} 
                        color={design.colors.primaryColor}
                        style={{marginTop: 4}} 
                      />;

const TodaySymptoms = ({symptoms, onAddPress}) => {
  let symptomsTags = [];
  let symptomsTagsContainer;

  for (let i = 0; i < symptoms.length; i++) {
    const symptomText = symptoms[i];

    symptomsTags.push(
      <Tag 
        text={symptomText}
        key={symptomText}
      />
    );
  }

  if(symptomsTags.length > 4) {
    symptomsTagsContainer = 
            <ScrollView 
            contentContainerStyle={styles.symptomsTagsContainer}
            persistentScrollbar>
              {symptomsTags}

              <IconButton
                icon={addIconGreen}
                onPress={onAddPress} 
              />
            </ScrollView>;
  } else {
    symptomsTagsContainer = <View style={styles.symptomsTagsContainer}>
      {symptomsTags}

      <IconButton
        icon={addIconGreen}
        onPress={onAddPress} 
      />
    </View>;
  }

  return(
    <View style={styles.view}>
      <Text style={{...styles.bodyText, marginBottom: design.spacing.smallMargin}}>{`${t('home.todaySymptoms')}`}</Text>

      {symptomsTagsContainer}
    </View>
  );
}

export default TodaySymptoms;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  symptomsTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  bodyText: {
    fontSize: design.sizes.bodyFontSize,
    fontFamily: design.fontFamilies.regular,
    color: design.colors.fontColor,
  }
});