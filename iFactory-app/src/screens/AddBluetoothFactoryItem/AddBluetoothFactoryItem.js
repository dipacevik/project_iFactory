import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  NativeEventEmitter,
  NativeModules,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import BleManager, {BleScanCallbackType, BleScanMatchMode, BleScanMode} from 'react-native-ble-manager';
import Button from '../../components/Button/Button';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function AddBluetoothFactoryItem() {
  const [firstScan, setFirstScan] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [peripherals, setPeripherals] = useState([]);

  useEffect(() => {
    BleManager.start({showAlert: false})
      .then(() => console.log('BleManager started'))
      .catch((error) => console.error('Error', error));

    handlePermissions();

    const listeners = [
      // bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral),
      bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan),
    ];

    return () => {
      console.debug('[app] main component unmounting. Removing listeners...');
      for (const listener of listeners) {
        listener.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (firstScan) {
      startScan();
      setFirstScan(false);
    }
  }, [firstScan]);

  // const addOrUpdatePeripheral = (id, updatedPeripheral) => {
  //   const perTemp = peripherals;
  //   const found = perTemp.some((item) => item?.id === id);
  //   if (!found) {
  //     console.debug('[handleDiscoverPeripheral] new BLE peripheral=', updatedPeripheral);
  //     perTemp.push({id, ble: updatedPeripheral});
  //     setPeripherals(perTemp);
  //   }
  // };

  // const handleDiscoverPeripheral = (peripheral) => {
  //   if (peripheral.name) {
  //     // console.debug('[handleDiscoverPeripheral] new BLE peripheral=', peripheral);
  //     addOrUpdatePeripheral(peripheral.id, peripheral);
  //   }
  // };

  const handleStopScan = () => {
    setIsScanning(false);
    console.debug('[handleStopScan] scan is stopped.');
    BleManager.getDiscoveredPeripherals([]).then((results) => {
      let output = [];
      if (results.length == 0) {
        console.log('No connected bluetooth devices');
      } else {
        results.forEach((peripheral) => {
          if (peripheral.name) {
            output.push({id: peripheral.id, ble: peripheral});
          }
        });
      }
      setPeripherals(output);
    });
  };

  const handlePermissions = () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]).then((result) => {
        if (result) {
          console.debug('[handleAndroidPermissions] User accepts runtime permissions android 12+');
        } else {
          console.error('[handleAndroidPermissions] User refuses runtime permissions android 12+');
        }
      });
    } else if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((checkResult) => {
        if (checkResult) {
          console.debug('[handleAndroidPermissions] runtime permission Android <12 already OK');
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((requestResult) => {
            if (requestResult) {
              console.debug('[handleAndroidPermissions] User accepts runtime permission android <12');
            } else {
              console.error('[handleAndroidPermissions] User refuses runtime permission android <12');
            }
          });
        }
      });
    }
  };

  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 5, false, {
        matchMode: BleScanMatchMode.Sticky,
        scanMode: BleScanMode.LowLatency,
        callbackType: BleScanCallbackType.AllMatches,
      })
        .then(() => {
          setIsScanning(true);
          console.log('Scan started');
        })
        .catch((err) => console.log('error', err));
    }
  };

  const renderBlePeripheneral = ({item}) => (
    <TouchableHighlight underlayColor="#0082FC" onPress={() => console.log('item', item)}>
      <View style={[styles.row]}>
        <Text style={styles.peripheralName}>
          {/* completeLocalName (item.name) & shortAdvertisingName (advertising.localName) may not always be the same */}
          {item?.ble?.name}
          {item?.ble?.connecting && ' - Connecting...'}
        </Text>
        <Text style={styles.rssi}>RSSI: {item?.ble?.rssi}</Text>
        <Text style={styles.peripheralId}>{item?.id}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderEmpty = () => {
    return (
      <View>
        <Text>Non ci sono bluetooth nelle vicinanze.</Text>
      </View>
    );
  };

  return (
    <View>
      <Button title={isScanning ? 'Stop Scanning' : 'Scan devices'} onPress={startScan} />
      {isScanning ? (
        <View style={{justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={peripherals}
          renderItem={renderBlePeripheneral}
          ListEmptyComponent={renderEmpty}
          style={{margin: 10}}
        />
      )}
    </View>
  );
}

const styles = new StyleSheet.create({
  peripheralName: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  rssi: {
    fontSize: 12,
    textAlign: 'center',
    padding: 2,
  },
  peripheralId: {
    fontSize: 12,
    textAlign: 'center',
    padding: 2,
    paddingBottom: 20,
  },
  row: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
  },
});
