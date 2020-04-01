import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
// import { connect } from 'react-redux';
import { t } from 'i18n-js';
import GradientWrapper from '../../components/GradientWrapper';
import DataRow from '../../components/DataRow';
import getSavedData from '../../utils/getSavedData';

class Breakdown extends React.Component {
  static navigationOptions = () => {
    return {
      title: t('breakdown.title')
    }
  }

  constructor(props) {
    super(props);

    this.state = { };

    numeral.defaultFormat('0,0.00');
  }

  async componentDidMount() {
    const locationData = await getSavedData('location');
    this.setState({locationData})
  }

  render() {
    const subtotal = this.props.subtotal;
    const taxRate = this.props.taxRate || 0;
    const taxAmount = subtotal * taxRate;
    const tipAmount = parseFloat(subtotal) * (this.props.tipPercentage / 100);
    
    const total = parseFloat(subtotal) + taxAmount + tipAmount;
    const formattedTotal = numeral(total).format();

    return (
      <GradientWrapper>
      </GradientWrapper>
    );
  }
}

const mapStateToProps = ({subtotalTipTaxState, languageState}) => {
  return {
    subtotal: subtotalTipTaxState.subtotal,
    taxRate: subtotalTipTaxState.taxRate,
    taxAmount: subtotalTipTaxState.taxAmount,
    tipAmount: subtotalTipTaxState.tipAmount,
    tipPercentage: subtotalTipTaxState.tipPercentage,
    language: languageState.language
  };
};

// export default connect(mapStateToProps)(Breakdown);
export default Breakdown;

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    marginTop: 15
  },
  title: {
    fontFamily: 'montserrat-bold',
    fontSize: 24,
    color: 'white'
  }
});
