import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import GradientWrapper from '../../components/GradientWrapper';
import NavigationButtons from '../../components/NavigationButtons';
import { t } from 'i18n-js';

const InsertName = ({navigation}) => {
  const [name, setName] = useState('');

  const navigateToNextScreen = () => {
    navigation.navigate('SelectStart', {name: name.trim()});
  }

  return (
    <GradientWrapper>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{...styles.text, marginBottom: 40}}>
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
            onChangeText={(str) => setName(str)}
            onSubmitEditing={navigateToNextScreen}
          />
      </View>

      <NavigationButtons navigation={navigation} nextScreen='SelectStart' isNextDisabled={!name.length} data={{name: name.trim()}} hideBack/>
    </GradientWrapper>
  );
}

export default InsertName;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'montserrat-regular',
    fontSize: 20,
    color: 'black',
    marginBottom: 20
  },
  nameInput: {
    fontSize: 20,
    fontFamily: 'montserrat-bold',
    color: 'black',
    textAlign: 'left',
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomWidth: 1
  }
});