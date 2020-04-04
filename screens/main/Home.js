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
  const {name, startDate, daysLength} = globalState;

  const endDate = moment(startDate).add(daysLength, 'days');
  const today = moment();
  const dayCount = daysLength - endDate.diff(today, 'days');

  const actionButtonIcon = <Icon 
                            style={{marginLeft: 20}} 
                            name="md-add-circle-outline" 
                            size={28} 
                            color="white"/>;

  return(
    <GradientWrapper>
      <Text style={styles.titleText}>{`${t('home.day')} ${dayCount} ${t('home.of')} ${daysLength}`}</Text>
      
      <View style={styles.container}>
        <Text style={styles.bodyText}>{`${t('home.messages.day1')} ${name}!`}</Text>
        <ActionButton text={t('buttons.addSymptoms')} icon={actionButtonIcon} onPress={() => navigation.navigate('AddSymptoms')}/>
      </View>
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
    marginBottom: 50
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
  }
});
