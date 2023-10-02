import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Button({title, icon = null, btnStyle, textStyle, iconSize = 20, onPress}) {
  return (
    <TouchableOpacity style={[styles.button, btnStyle]} onPress={() => onPress(title)}>
      {icon ? (
        <Icon name={icon} size={iconSize} color={textStyle?.color || 'black'} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 18,
    backgroundColor: 'lightblue',
    margin: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
