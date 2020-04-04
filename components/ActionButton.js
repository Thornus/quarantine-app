import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const ActionButton = ({text, onPress, icon, style}) => {
  return (
    <RectButton style={{...styles.button, ...style}} onPress={onPress}>
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
    backgroundColor: '#11999e',
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
    fontFamily: 'montserrat-bold',
    fontSize: 16,
    color: 'white'
  }
});