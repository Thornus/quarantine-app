import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { store } from '../../store';
import { t } from 'i18n-js';
import design from '../../utils/design';
import sendEmail from '../../utils/sendEmail';
import GradientWrapper from '../../components/GradientWrapper';
import ActionButton from '../../components/ActionButton';

const AddDoctorEmail = () => {
  const {dispatch, state: globalState} = useContext(store);
  const {doctorEmail, name, symptomsByDay, startDate} = globalState;

  const [emailValue, setEmailValue] = useState(doctorEmail);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const onSendPress = () => {
    if(emailRegex.test(doctorEmail)) {
      setIsValidEmail(true);
      sendEmail(doctorEmail, symptomsByDay, startDate, name);
    } else {
      setIsValidEmail(false);
    }
  };

  return(
    <GradientWrapper viewExtendedStyle={{marginHorizontal: design.spacing.defaultMargin}}>
        <Text style={styles.text}>{`${t('addDoctorEmail.question')}`}</Text>

        <TextInput
          style={styles.input}
          onChangeText={text => {
            setEmailValue(text);
            setIsValidEmail(true); // this is to hide the error before pressing send
            dispatch({type: 'SET_DOCTOR_EMAIL', payload: {doctorEmail: text}});
          }}
          value={emailValue}
          autoFocus
          keyboardType='email-address'
          autoCompleteType='email'
          textContentType='emailAddress'
          autoCapitalize='none'
        />


        {isValidEmail ? <Text style={styles.error}/> : 
          <Text style={styles.error}>
            {doctorEmail.length ? t('addDoctorEmail.invalidEmailError') : t('addDoctorEmail.emptyEmail') }
          </Text>
        }

        <ActionButton
          text={t('buttons.sendToDoctor')}
          icon={mailIcon} 
          onPress={onSendPress} 
          style={styles.mailButton}
        />
    </GradientWrapper>
  );
}

export default AddDoctorEmail;

const mailIcon = <Icon 
                  style={{marginLeft: design.spacing.defaultMargin}} 
                  name="ios-mail" 
                  size={28} 
                  color={design.colors.secondaryFontColor}/>;

const styles = StyleSheet.create({
  text: {
    fontSize: design.sizes.bodyFontSize,
    fontFamily: design.fontFamilies.regular,
    color: design.colors.fontColor,
    marginTop: design.spacing.largeMargin,
    marginBottom: design.spacing.defaultMargin
  },
  error: {
    fontSize: design.sizes.buttonFontSize,
    fontFamily: design.fontFamilies.regular,
    color: design.colors.errorColor,
    marginTop: design.spacing.defaultMargin,
    marginBottom: design.spacing.defaultMargin
  },
  input: {
    width: '85%',
    fontSize: design.sizes.headerFontSize,
    fontFamily: design.fontFamilies.semibold,
    color: design.colors.fontColor,
    textAlign: 'left',
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomWidth: 1
  },
  mailButton: {
    marginTop: design.spacing.largeMargin
  }
});
