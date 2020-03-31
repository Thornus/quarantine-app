import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import GradientWrapper from '../../components/GradientWrapper';
import NavigationButtons from '../../components/NavigationButtons';
import { t } from 'i18n-js';

const SelectStart = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState(date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}) + ' (Today)');
  const [showPicker, setShowPicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShowPicker(false);
    setDate(selectedDate);

    let stringToAppend = '';
    if(selectedDate.getDate() === new Date().getDate() && selectedDate.getMonth() === new Date().getMonth()) {
      stringToAppend = ' (Today)';
    }

    setDateString(selectedDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}) + stringToAppend); // TODO: change locale according to phone
  }

  return (
    <GradientWrapper viewExtendedStyle={{justifyContent: 'center'}}>
      <View style={{flex: 1, justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
        <Text style={styles.text}>
          {`${t('selectStart.introduction')} ${navigation.getParam('name')}!`}
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
            value={date}
            onChange={onDateChange}
            style={{position: 'relative', top: '60%'}}
          />
        </Modal>
      </View>

      <NavigationButtons navigation={navigation}/>
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