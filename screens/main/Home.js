import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
// import { TAXJAR_API_KEY } from 'react-native-dotenv';
// import { connect } from 'react-redux';
// import setTaxRateOnlyActionCreator from '../../actions/setTaxRateOnlyActionCreator';
import { t } from 'i18n-js';
import getElasticFontSize from '../../utils/getElasticFontSize';
import getSavedData from '../../utils/getSavedData';
import isValidNumber from '../../utils/isValidNumber';
import GradientWrapper from '../../components/GradientWrapper';
import LocationHeader from '../../components/LocationHeader';
import TipArea from '../../components/TipArea';
import MiniCalculator from '../../components/MiniCalculator';

// Canada zip map
const ZIP_MAP = { 
  "ON": "M5T 1K1",
  "BC": "V5Z 2V5",
  "NB": "E3A 0E2",
  "MB": "R2C 0A5",
  "NL": "A1C 2B4",
  "NS": "B3L 4T6",
  "NT": "X1A 1P8",
  "NU": "X0A 0H0",
  "PE": "C1A 9K5",
  "QC": "H2X 3H9",
  "SK": "S7K 1K6",
  "YT": "Y1A 2E6"
};

class Home extends React.Component {
  static navigationOptions = () => {
    return {
      title: t('home.title')
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      subtotal: '',
      taxRate: null
    };

    this.prevFormattedTotal;

    numeral.defaultFormat('0,0.00');
  }

  async componentDidMount() {
    const locationData = await getSavedData('location');

    const countryCode = locationData && locationData.countryCode;
    const regionCode = locationData && locationData.regionCode;
    const selectedCity = locationData && locationData.selectedCity;
    const zipCode = locationData && locationData.zipCode;

    const {data: {rate}} = await axios({
      url: `https://api.taxjar.com/v2/rates/${zipCode || ZIP_MAP[regionCode]}`,
      method: 'get',
      params: {
          country: countryCode || 'US',
          city: selectedCity || ''
      },
      headers: {
          'Authorization': `Bearer ${TAXJAR_API_KEY}`
      }
    });

    this.props.dispatch(setTaxRateOnlyActionCreator(rate.combined_rate));
    this.setState({
      locationData,
      taxRate: rate.combined_rate,
    });
  }

  render() {
    const subtotalString = this.props.subtotal;
    const subtotal = numeral(subtotalString).value();

    const taxAmount = subtotal * this.state.taxRate;
    const tipAmount = subtotal * (this.props.tipPercentage / 100);
    
    let total;
    let formattedTotal;
    if(isValidNumber(subtotalString) || subtotalString === '') {
      total = subtotal + taxAmount + tipAmount;
      formattedTotal = numeral(total).format();
    } else {
      formattedTotal = this.prevFormattedTotal;
    }

    this.prevFormattedTotal = formattedTotal;

    const elasticFontSize = getElasticFontSize(formattedTotal);

    return (
      <GradientWrapper>
        <LocationHeader navigateTo={this.props.navigation.navigate} locationData={this.state.locationData}/>
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <TextInput
            value={subtotalString}
            placeholder='0.00'
            placeholderTextColor='rgba(240, 240, 240, 0.7)'
            underlineColorAndroid='transparent'
            keyboardType='numeric'
            style={styles.subtotalInput}
          />
        </TouchableWithoutFeedback>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>{t('home.total').toUpperCase()}</Text>
          <Text selectable
                includeFontPadding={false} 
                style={{...styles.totalNumber, fontSize: elasticFontSize, lineHeight: elasticFontSize}}>
                {formattedTotal}
          </Text>
          
          { formattedTotal && subtotal ? <TipArea subtotal/> : null }
        </View>

        <MiniCalculator/>
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
  subtotalInput: {
    fontSize: 70,
    fontFamily: 'montserrat-bold',
    color: 'white',
    textAlign: 'center'
  },
  totalContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  totalText: {
    fontSize: 24,
    fontFamily: 'montserrat-bold',
    color: 'white',
    marginTop: 20
  },
  totalNumber: {
    fontFamily: 'montserrat-bold',
    color: '#ffc',
    textAlignVertical: 'center',
    marginTop: 2
  }
});
