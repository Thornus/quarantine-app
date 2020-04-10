import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { store } from '../../store';
import { t } from 'i18n-js';
import GradientWrapper from '../../components/GradientWrapper';
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
    <GradientWrapper viewExtendedStyle={{marginRight: design.spacing.defaultMargin, marginLeft: design.spacing.defaultMargin}}>
      <FlatList
        data={symptomsByDay}
        renderItem={({item, index}) => {
          return <Item symptoms={item} dayNumber={index}/>
        }}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
      />
    </GradientWrapper>
  );
};

export default SymptomsHistory;

const styles = StyleSheet.create({
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
  bodyText: {
    marginBottom: design.spacing.defaultMargin
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginBottom: design.spacing.defaultMargin
  }
});
