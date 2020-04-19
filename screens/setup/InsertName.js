import React, { useContext } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, TextInput } from 'react-native';
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
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flexShrink: 1, justifyContent: 'center', marginTop: 'auto', marginBottom: 'auto'}}>
        <Text style={styles.text}>
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
      </KeyboardAvoidingView>

      <NavigationButtons navigation={navigation} nextScreen='SelectStart' isNextDisabled={!name.length} hideBack/>
    </GradientWrapper>
  );
}

export default InsertName;

const styles = StyleSheet.create({
  text: {
    fontFamily: design.fontFamilies.regular,
    fontSize: design.sizes.bodyFontSize,
    color: design.colors.fontColor,
    marginBottom: design.spacing.defaultMargin
  },
  nameInput: {
    fontSize: design.sizes.bodyFontSize,
    fontFamily: design.fontFamilies.semibold,
    color: design.colors.fontColor,
    textAlign: 'left',
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomWidth: 1,
    marginBottom: design.spacing.largeMargin
  }
});