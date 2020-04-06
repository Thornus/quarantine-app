import React from 'react';
import { StyleSheet } from 'react-native';
import { t } from 'i18n-js';
import GradientWrapper from '../../components/GradientWrapper';
import design from '../../utils/design';
// import getSavedData from '../../utils/getSavedData';

class SymptomsHistory extends React.Component {
  static navigationOptions = () => {
    return {
      title: t('symptomsHistory.title')
    }
  }

  render() {
    return (
      <GradientWrapper>
      </GradientWrapper>
    );
  }
}

export default SymptomsHistory;

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    marginTop: 15
  },
  title: {
    fontFamily: design.fontFamilies.bold,
    fontSize: 24,
    color: design.colors.secondaryFontColor
  }
});
