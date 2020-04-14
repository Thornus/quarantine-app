import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { store } from '../../store';
import { t } from 'i18n-js';
import design from '../../utils/design';
import sendEmail from '../../utils/sendEmail';
import GradientWrapper from '../../components/GradientWrapper';
import Tag from '../../components/Tag';
import ActionButton from '../../components/ActionButton';

const SymptomsHistory = ({navigation}) => {
  const {state: globalState} = useContext(store);
  const {symptomsByDay, doctorEmail, name, startDate} = globalState;

  const Item = ({symptoms, dayNumber}) => {
    let symptomButtons = [];
    for (let i = 0; i < symptoms.length; i++) {
      const symptomText = symptoms[i];
  
      symptomButtons.push(
        <Tag
          text={symptomText}
          key={symptomText}
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

  const onSendPress = () => {
    if(doctorEmail) {
      sendEmail(doctorEmail, symptomsByDay, startDate, name);
    } else {
      navigation.navigate('AddDoctorEmail');
    }
  }

  return (
    <GradientWrapper noKeyboardDismiss viewExtendedStyle={{marginHorizontal: design.spacing.defaultMargin}}>
        <Text style={styles.titleText}>{t('symptomsHistory.title')}</Text>

        <FlatList
          data={symptomsByDay}
          renderItem={({item, index}) => {
            return <Item symptoms={item} dayNumber={index}/>
          }}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          style={styles.flatList}
        />

        <ActionButton 
          text={t('buttons.sendToDoctor')} 
          icon={mailIcon}
          onPress={onSendPress} 
          style={styles.mailButton}
        />
    </GradientWrapper>
  );
};

export default SymptomsHistory;

const mailIcon = <Icon 
                  style={{marginLeft: design.spacing.defaultMargin}} 
                  name="ios-mail" 
                  size={28} 
                  color={design.colors.secondaryFontColor}/>;

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
  },
  mailButton: {
    marginBottom: design.spacing.defaultMargin + 10
  }
});
