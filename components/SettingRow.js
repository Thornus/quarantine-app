import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import design from '../utils/design';

const SettingRow = ({label, children, style}) => {
  return(
  <View style={{...styles.container, ...style}}>
    {label && <Text style={styles.label}>{label}</Text>}

    {children}

    <View style={styles.horizontalRuler}/>

  </View>
  );
};

export default SettingRow;

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  label: {
    fontFamily: design.fontFamilies.semibold,
    fontSize: design.sizes.buttonFontSize,
    marginBottom: design.spacing.extraSmallMargin
  },
  horizontalRuler: {
    marginVertical: design.spacing.defaultMargin,
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});