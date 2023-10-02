import {View, Text, TextInput, Switch, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setFactoryItems} from '../../../config/store/reducers/factory';
import Button from '../../components/Button/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {ENDPOINT} from '../../utils/vars';
import CustomTimePicker from '../../components/CustomTimePicker/CustomTimePicker';

export default function AddFactoryItem({navigation}) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [note, setNote] = useState('');

  const [ambientalFactorShow, setAmbientalFactorShow] = useState(false);
  const [scheduleShow, setScheduleShow] = useState(false);
  const [wateringShow, setWateringShow] = useState(false);
  const [feedingShow, setFeedingShow] = useState(false);

  const [soilStatus, setSoilStatus] = useState('80');
  const [soilWater, setSoilWater] = useState('80');
  const [wateringTime, setWateringTime] = useState(moment().toDate());
  const [feedingTime, setFeedingTime] = useState(moment().toDate());

  const dispatcher = useDispatch();
  const userToken = useSelector((state) => state?.user?.token);

  const addFactoryItem = async () => {
    let data = {title, type, note};
    if (ambientalFactorShow) {
      data = {...data, soilStatus, soilWater};
    }
    if (wateringShow && wateringTime) {
      data = {...data, wateringTime};
    }
    if (feedingShow && feedingTime) {
      data = {...data, feedingTime};
    }
    const result = await axios.post(`${ENDPOINT}factory/add`, data, {
      headers: {Authorization: `Bearer ${userToken}`},
    });
    if (result?.data?.status === 'success') {
      const response = await axios.post(`${ENDPOINT}factory/`, {}, {headers: {Authorization: `Bearer ${userToken}`}});
      dispatcher(setFactoryItems(response?.data?.data));
      navigation.navigate('Factory');
    }
  };

  return (
    <View style={{flex: 1, margin: 10}}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'column',
            marginTop: 20,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}>
          <Text>Title:</Text>
          <TextInput
            style={{paddingLeft: 5}}
            placeholder="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginTop: 20,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}>
          <Text>Type:</Text>
          <TextInput
            style={{flex: 1, paddingLeft: 5}}
            placeholder="Type"
            value={type}
            onChangeText={(text) => setType(text)}
          />
        </View>
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
            <Switch value={ambientalFactorShow} onValueChange={() => setAmbientalFactorShow(!ambientalFactorShow)} />
            <Text style={{marginLeft: 10}}>Ambiental Factor</Text>
          </View>
          {ambientalFactorShow && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                }}>
                <Text>Soil Status:</Text>
                <TextInput
                  style={{width: 40, paddingLeft: 5}}
                  inputMode="decimal"
                  maxLength={3}
                  value={soilStatus}
                  onChangeText={(text) => setSoilStatus(text)}
                />
                <Text>%</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                }}>
                <Text>Soil Water:</Text>
                <TextInput
                  style={{width: 40, paddingLeft: 5}}
                  inputMode="decimal"
                  maxLength={3}
                  value={soilWater}
                  onChange={(text) => setSoilWater(text)}
                />
                <Text>%</Text>
              </View>
            </View>
          )}
        </View>
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
            <Switch value={scheduleShow} onValueChange={() => setScheduleShow(!scheduleShow)} />
            <Text style={{marginLeft: 10}}>Schedule Routine</Text>
          </View>
          {scheduleShow && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
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
                  <Switch value={wateringShow} onValueChange={() => setWateringShow(!wateringShow)} />
                  <Text style={{marginLeft: 10}}>Watering</Text>
                </View>
                {wateringShow && (
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomTimePicker time={wateringTime} setTime={(t) => setWateringTime(t)} />
                  </View>
                )}
              </View>
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
                  <Switch value={feedingShow} onValueChange={() => setFeedingShow(!feedingShow)} />
                  <Text style={{marginLeft: 10}}>Feeding</Text>
                </View>
                {feedingShow && (
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomTimePicker time={feedingTime} setTime={(t) => setFeedingTime(t)} />
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginTop: 20,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}>
          <Text>Note:</Text>
          <TextInput
            style={{flex: 1, paddingLeft: 5}}
            placeholder="Notes"
            value={note}
            onChangeText={(text) => setNote(text)}
          />
        </View>
      </ScrollView>
      <View>
        <Button title="Add Item" onPress={addFactoryItem} />
      </View>
    </View>
  );
}
