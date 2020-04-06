import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import design from '../../utils/design';

const DataRow = ({label, number, isBold}) => {
  let fontFamily = isBold ? 'montserrat-bold' : 'montserrat-regular';

  return(
  <View style={styles.container}>
    <Text style={{...styles.label, fontFamily}}>{label}</Text>
    <View style={styles.horizontalRuler}/>
    <Text style={{...styles.label, fontFamily, textAlign: 'right'}}>{number || '0.00'}</Text>
  </View>
  );
};

export default DataRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 12
  },
  label: {
    fontSize: design.sizes.bodyFontSize,
    color: design.colors.secondaryFontColor
  },
  horizontalRuler: {
    flexGrow: 1,
    margin: 15,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    textAlign: 'center'
  }
});