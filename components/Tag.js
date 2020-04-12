import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import design from '../utils/design';

const Tag = ({text, icon, style}) => {
  return (
    <View style={{...styles.view, ...style}} accessible>
      <Text style={styles.text}>{text}</Text>
      {icon}
    </View>
  );
}

export default Tag;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: design.colors.primaryColor,
    paddingVertical: design.spacing.extraSmallMargin,
    paddingHorizontal: design.spacing.smallMargin,
    marginRight: design.spacing.smallMargin,
    marginBottom: design.spacing.smallMargin
  },
  text: {
    fontFamily: design.fontFamilies.bold,
    fontSize: design.sizes.buttonFontSize,
    color: design.colors.primaryColor
  }
});