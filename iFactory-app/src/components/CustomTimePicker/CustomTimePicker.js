import {Platform, StyleSheet, Text, View} from 'react-native';
import DateTimePicker, {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import React from 'react';
import Button from '../Button/Button';
import moment from 'moment';

export default function CustomTimePicker({readOnly = false, time, setTime}) {
  const isAndroid = Platform.OS === 'android';

  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: time,
      onChange: (e, date) => setTime(date),
      mode: 'time',
      is24Hour: true,
      locale: 'it-IT',
    });
  };
  if (isAndroid) {
    if (readOnly) {
      return (
        <View style={styles.view}>
          <Text style={styles.text}>{moment(time).format('HH:mm')}</Text>
        </View>
      );
    }
    return <Button title={moment(time).format('HH:mm')} onPress={showTimePicker} />;
  }
  return (
    <DateTimePicker
      value={time}
      mode="time"
      is24Hour={true}
      locale="it-IT"
      disabled={readOnly}
      onChange={(event, date) => setTime(date)}
    />
  );
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
