import {View, Text} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setFactoryItems} from '../../../config/store/reducers/factory';
import Button from '../../components/Button/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ENDPOINT} from '../../utils/vars';
import CustomTimePicker from '../../components/CustomTimePicker/CustomTimePicker';

const tmp = {
  __v: 0,
  _id: '65146900ff08a5c63c83705b',
  ambientalFactors: {soilStatus: 80, soilWater: 80},
  createdAt: '2023-09-27T17:40:16.905Z',
  note: '',
  schedule: {feeding: {status: false}, watering: {status: false}},
  title: 'Campo di grano',
  type: 'Agricoltura',
};

export default function DetailFactoryItem({navigation, route}) {
  const {item} = route?.params;
  const dispatcher = useDispatch();

  const userToken = useSelector((state) => state?.user?.token);

  const deleteFactoryItem = async () => {
    const result = await axios.delete(`http://192.168.1.128:3001/api/factory/${item?._id}`, {
      headers: {Authorization: `Bearer ${userToken}`},
    });
    if (result?.data?.status === 'success') {
      const response = await axios.post(`${ENDPOINT}factory/`, {}, {headers: {Authorization: `Bearer ${userToken}`}});
      dispatcher(setFactoryItems(response?.data?.data));
      navigation.navigate('Factory');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View key={item?._id} style={{flex: 1, borderRadius: 10, padding: 10, margin: 5, marginBottom: 80}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}>
          <Text>Title:</Text>
          <Text style={{flex: 1, paddingLeft: 5}}>{item?.title}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}>
          <Text>Type:</Text>
          <Text style={{flex: 1, paddingLeft: 5}}>{item?.type}</Text>
        </View>
        {item?.ambientalFactors && (
          <View
            style={{
              flexDirection: 'column',
              marginTop: 20,
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{marginLeft: 10}}>Ambiental Factor</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              {item?.ambientalFactors?.soilStatus && (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <Text>Soil Status:</Text>
                  <Text style={{width: 40, paddingLeft: 5}}>{item?.ambientalFactors?.soilStatus}%</Text>
                </View>
              )}
              {item?.ambientalFactors?.soilWater && (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <Text>Soil Water:</Text>
                  <Text style={{width: 40, paddingLeft: 5}}>{item?.ambientalFactors?.soilWater}%</Text>
                </View>
              )}
            </View>
          </View>
        )}
        {(item?.schedule?.watering?.status || item?.schedule?.feeding?.status) && (
          <View
            style={{
              flexDirection: 'column',
              marginTop: 20,
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{marginLeft: 10}}>Schedule Routine</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              {item?.schedule?.watering?.status && (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginTop: 20,
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    marginRight: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={{marginLeft: 10}}>Watering</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomTimePicker time={new Date(item?.schedule?.watering?.scheduledTime)} readOnly={true} />
                  </View>
                </View>
              )}
              {item?.schedule?.feeding?.status && (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginTop: 20,
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    marginRight: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={{marginLeft: 10}}>Feeding</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomTimePicker time={new Date(item?.schedule?.feeding?.scheduledTime)} readOnly={true} />
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}>
          <Text>Note:</Text>
          <Text style={{flex: 1, paddingLeft: 5}}>{item?.note}</Text>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button title="Delete Factory Item" onPress={deleteFactoryItem} />
      </View>
    </View>
  );
}
