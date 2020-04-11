import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { store } from '../../store';
import { t } from 'i18n-js';
import {GradientWrapperNoKeyboardDismiss} from '../../components/GradientWrapper';
import ActionButton from '../../components/ActionButton';
import design from '../../utils/design';

const SymptomsHistory = () => {
  const {state: globalState} = useContext(store);
  const {symptomsByDay} = globalState;

  const Item = ({symptoms, dayNumber}) => {
    let symptomButtons = [];
    for (let i = 0; i < symptoms.length; i++) {
      const symptomText = symptoms[i];
  
      symptomButtons.push(
        <ActionButton 
          text={symptomText}
          key={symptomText}
          style={styles.symptomButton}
          enabled={false}
        />
      );
    }

    return (
      <>
        <Text style={styles.itemTitle}>{`${t('home.day')} ${dayNumber+1}`}</Text>
        <View style={styles.symptomsContainer}>
          {symptomButtons.length ? symptomButtons : <Text style={styles.bodyText}>{t('symptomsHistory.noSymptoms')}</Text>}
        </View>
      </>
    );
  };

  return (
    <GradientWrapperNoKeyboardDismiss viewExtendedStyle={{marginHorizontal: design.spacing.defaultMargin}}>
        <Text style={styles.titleText}>{t('symptomsHistory.title')}</Text>

        <FlatList
          data={symptomsByDay}
          renderItem={({item, index}) => {
            return <Item symptoms={item} dayNumber={index}/>
          }}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          // ListFooterComponent={() => <View style={styles.separator}/>}
          style={styles.flatList}
        />
    </GradientWrapperNoKeyboardDismiss>
  );
};

export default SymptomsHistory;

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
    paddingTop: design.spacing.defaultMargin,
    marginBottom: design.spacing.defaultMargin
  },
  symptomsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  symptomButton: {
    marginBottom: design.spacing.defaultMargin,
    marginRight: design.spacing.defaultMargin
  },
  itemTitle: {
    fontSize: design.sizes.bodyFontSize,
    fontFamily: design.fontFamilies.regular,
    color: design.colors.fontColor,
    marginBottom: design.spacing.smallMargin
  },
  titleText: {
    fontSize: design.sizes.headerFontSize,
    fontFamily: design.fontFamilies.semibold,
    color: design.colors.fontColor,
    marginTop: design.spacing.defaultMargin
  },
  bodyText: {
    marginBottom: design.spacing.defaultMargin
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginBottom: design.spacing.defaultMargin
  }
});
