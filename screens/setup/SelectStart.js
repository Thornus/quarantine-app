import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Button } from 'react-native';
import GradientWrapper from '../../components/GradientWrapper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { t } from 'i18n-js';

const SelectStart = (props) => {
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState(date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}) + ' (Today)');
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    setDate(selectedDate);

    if(selectedDate !== new Date()) {
      setDateString(selectedDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}));
    }
  }

  return (
    <GradientWrapper viewExtendedStyle={{justifyContent: 'flex-end', alignItems: 'flex-end', marginLeft: 'auto', marginRight: 'auto'}}>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Text style={styles.text}>
          {t('selectStart.question')}
        </Text>
        <Button
          onPress={() => setShowPicker(true)}
          title={dateString} // TODO: change locale according to phone
          style={styles.text}
        />
      </View>

      <View style={{flex: 1}}>
        <Modal
          animationType="fade"
          transparent
          visible={showPicker}
          presentationStyle="overFullScreen"
        >
          <DateTimePicker
            value={new Date()}
            onChange={onChange}
            style={{flex: 1, justifyContent: 'flex-end'}}
          />
        </Modal>
      </View>
    </GradientWrapper>
  );
}

export default SelectStart;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'montserrat-regular',
    fontSize: 20,
    color: 'black'
  }
});