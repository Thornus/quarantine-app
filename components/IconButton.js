import React from 'react';
import { StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

const IconButton = ({onPress, icon, style, enabled = true}) => {
  return (
    <BorderlessButton style={{...styles.button, ...style}} onPress={onPress} enabled={enabled}>
      {icon}
    </BorderlessButton>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {

  }
});