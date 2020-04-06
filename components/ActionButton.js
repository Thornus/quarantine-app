import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import design from '../utils/design';

const ActionButton = ({text, onPress, icon, style, enabled = true}) => {
  return (
    <RectButton style={{...styles.button, ...style}} onPress={onPress} enabled={enabled}>
      <View style={styles.view} accessible>
        <Text style={styles.text}>{text}</Text>

        {icon}
      </View>
    </RectButton>
  );
}

export default ActionButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: design.colors.primaryColor,
    borderRadius: 4,
    paddingLeft: 20,
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 12
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontFamily: design.fontFamilies.bold,
    fontSize: design.sizes.buttonFontSize,
    color: design.colors.secondaryFontColor
  }
});