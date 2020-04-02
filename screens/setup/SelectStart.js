import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Modal, Button } from 'react-native';
import { store } from '../../store';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import GradientWrapper from '../../components/GradientWrapper';
import NavigationButtons from '../../components/NavigationButtons';
import { t } from 'i18n-js';

const SelectStart = ({navigation}) => {
  const {dispatch, state: globalState} = useContext(store);
  const {name, startDate} = globalState;

  const momentStringFormat = 'MMMM D, YYYY';

  let stringToAppend = '';
  if(startDate.isSame(moment(), 'days')) {
    stringToAppend = ` ${t('selectStart.today')}`;
  }
  const [dateString, setDateString] = useState(startDate.format(momentStringFormat) + stringToAppend);
  const [showPicker, setShowPicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    selectedDate = moment(selectedDate);

    setShowPicker(false);
    dispatch({type: 'SET_START_DATE', payload: {startDate: selectedDate}});

    let stringToAppend = '';
    if(selectedDate.isSame(moment(), 'days')) {
      stringToAppend = ` ${t('selectStart.today')}`;
    }

    setDateString(selectedDate.format(momentStringFormat) + stringToAppend);
  }

  return (
    <GradientWrapper viewExtendedStyle={{justifyContent: 'center'}}>
      <View style={{flex: 1, justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
        <Text style={styles.text}>
          {`${t('selectStart.introduction')} ${name}!`}
        </Text>

        <Text style={styles.text}>
          {t('selectStart.question')}
        </Text>

        <Button
          onPress={() => setShowPicker(true)}
          title={dateString}
        />

        <Modal
          animationType="fade"
          transparent
          visible={showPicker}
          presentationStyle="overFullScreen"
        >
          <DateTimePicker
            value={startDate.toDate()}
            onChange={onDateChange}
            style={{position: 'relative', top: '60%'}}
          />
        </Modal>
      </View>

      <NavigationButtons navigation={navigation} nextScreen='HowLong'/>
    </GradientWrapper>
  );
}

export default SelectStart;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'montserrat-regular',
    fontSize: 20,
    color: 'black',
    marginBottom: 10
  }
});