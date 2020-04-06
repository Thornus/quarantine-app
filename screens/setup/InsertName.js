import React, { useContext } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { store } from '../../store';
import design from '../../utils/design';
import GradientWrapper from '../../components/GradientWrapper';
import NavigationButtons from '../../components/NavigationButtons';
import { t } from 'i18n-js';

const InsertName = ({navigation}) => {
  const {dispatch, state: globalState} = useContext(store);
  const {name} = globalState;

  const navigateToNextScreen = () => {
    navigation.navigate('SelectStart');
  }

  return (
    <GradientWrapper>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{...styles.text, marginBottom: design.spacing.largeMargin}}>
          {t('insertName.getStarted')}
        </Text>

        <Text style={styles.text}>
          {t('insertName.question')}
        </Text>

        <TextInput
          value={name}
          autoFocus
          enablesReturnKeyAutomatically
          returnKeyType='next'
          style={styles.nameInput}
          onChangeText={(str) => dispatch({type: 'SET_NAME', payload: {name: str.trim()}})}
          onSubmitEditing={navigateToNextScreen}
        />
      </View>

      <NavigationButtons navigation={navigation} nextScreen='SelectStart' isNextDisabled={!name.length} hideBack/>
    </GradientWrapper>
  );
}

export default InsertName;

const styles = StyleSheet.create({
  text: {
    fontFamily: design.fontFamilies.regular,
    fontSize: design.sizes.headerFontSize,
    color: design.colors.fontColor,
    marginBottom: design.spacing.defaultMargin
  },
  nameInput: {
    fontSize: design.sizes.headerFontSize,
    fontFamily: design.fontFamilies.semibold,
    color: design.colors.fontColor,
    textAlign: 'left',
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomWidth: 1
  }
});