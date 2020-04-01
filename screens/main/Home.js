import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
// import { TAXJAR_API_KEY } from 'react-native-dotenv';
// import { connect } from 'react-redux';
// import setTaxRateOnlyActionCreator from '../../actions/setTaxRateOnlyActionCreator';
import { t } from 'i18n-js';
import getElasticFontSize from '../../utils/getElasticFontSize';
import GradientWrapper from '../../components/GradientWrapper';

class Home extends React.Component {
  static navigationOptions = () => {
    return {
      title: t('home.title')
    }
  }

  render() {
    return(
      <GradientWrapper>
        <Text style={styles.text}>Day X of Y</Text>
      </GradientWrapper>
    );
  }
}

const mapStateToProps = ({subtotalTipTaxState, languageState}) => {
  return {
    subtotal: subtotalTipTaxState.subtotal,
    tipPercentage: subtotalTipTaxState.tipPercentage,
    language: languageState.language
  };
};

// export default connect(mapStateToProps)(Home);
export default Home;

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontFamily: 'montserrat-bold',
    color: 'black'
  }
});
