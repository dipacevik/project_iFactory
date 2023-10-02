import {View, Text} from 'react-native';
import React from 'react';
import Button from '../../components/Button/Button';

export default function AddFactoryItemChoose({navigation}) {
  return (
    <View>
      <Button title="Standard Add" onPress={() => navigation.navigate('AddFactoryItem')} />
      <Button title="Bluetooth Add" onPress={() => navigation.navigate('AddBluetoothFactoryItem')} />
    </View>
  );
}
