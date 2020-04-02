import React, { useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { store } from '../../store';
import moment from 'moment';
import { t } from 'i18n-js';
import getElasticFontSize from '../../utils/getElasticFontSize';
import GradientWrapper from '../../components/GradientWrapper';

const Home = () => {
  // static navigationOptions = () => {
  //   return {
  //     title: t('home.title')
  //   }
  // }

  const {dispatch, state: globalState} = useContext(store);
  const {name, startDate, daysLength} = globalState;

  const endDate = moment(startDate).add(daysLength, 'days');
  const today = moment();
  const dayCount = daysLength - endDate.diff(today, 'days');

  return(
    <GradientWrapper>
      <Text style={styles.text}>{`${t('home.day')} ${dayCount} ${t('home.of')} ${daysLength}`}</Text>
    </GradientWrapper>
  );
}

// const mapStateToProps = ({subtotalTipTaxState, languageState}) => {
//   return {
//     subtotal: subtotalTipTaxState.subtotal,
//     tipPercentage: subtotalTipTaxState.tipPercentage,
//     language: languageState.language
//   };
// };

// export default connect(mapStateToProps)(Home);
export default Home;

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontFamily: 'montserrat-semibold',
    color: 'black'
  }
});
