import {Platform, StyleSheet, Text, View} from 'react-native';
import DateTimePicker, {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import React from 'react';
import Button from '../Button/Button';
import moment from 'moment';

export default function CustomDatePicker({readOnly = false, date, setDate, viewStyle, textStyle}) {
  const isAndroid = Platform.OS === 'android';

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (e, d) => setDate(d),
      mode: 'date',
      is24Hour: true,
      locale: 'it-IT',
    });
  };

  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (e, d) => setDate(d),
      mode: 'time',
      is24Hour: true,
      locale: 'it-IT',
    });
  };
  if (isAndroid) {
    if (readOnly) {
      return (
        <View style={[styles.view, viewStyle]}>
          <Text style={[styles.text, textStyle]}>{moment(date).format('YYYY/MM/DD HH:mm')}</Text>
        </View>
      );
    }
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Button title={moment(date).format('YYYY/MM/DD')} onPress={showDatePicker} />
        <Button title={moment(date).format('HH:mm')} onPress={showTimePicker} />
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  view: {
    padding: 18,
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
