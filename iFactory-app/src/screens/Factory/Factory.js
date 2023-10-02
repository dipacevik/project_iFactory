import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/Button/Button';
import {setFactoryItems} from '../../../config/store/reducers/factory';
import axios from 'axios';
import {ENDPOINT} from '../../utils/vars';
const tmp = [
  {
    __v: 0,
    _id: '65146900ff08a5c63c83705b',
    ambientalFactors: {soilStatus: 80, soilWater: 80},
    createdAt: '2023-09-27T17:40:16.905Z',
    note: '',
    schedule: {feeding: {status: false}, watering: {status: false}},
    title: 'Campo di grano',
    type: 'Agricoltura',
  },
];
export default function Factory({navigation}) {
  const dispatcher = useDispatch();
  const factoryStore = useSelector((state) => state?.factory?.items);
  const userToken = useSelector((state) => state?.user?.token);
  const isUserAdmin = useSelector((state) => state?.user?.admin);

  const fetchData = async () => {
    const result = await axios.post(`${ENDPOINT}factory/`, {}, {headers: {Authorization: `Bearer ${userToken}`}});
    console.log('test', result?.data?.data[0].schedule);
    dispatcher(setFactoryItems(result?.data?.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderFactoryItem = ({item}) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetailFactoryItem', {item})}>
      <View key={item?._id} style={{flex: 1, borderWidth: 1, borderRadius: 10, padding: 10, margin: 5}}>
        <Text>{item?.title}</Text>
        <Text>Type: {item?.type}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => {
    return (
      <View>
        <Text>Non ci sono item inseriti su questa fattoria.</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {true && <Button title="Add Factory Item" onPress={() => navigation.navigate('AddFactoryItemNav')} />}
      <View style={{flex: 1}}>
        <FlatList
          data={tmp}
          renderItem={renderFactoryItem}
          ListEmptyComponent={renderEmpty}
          style={{flex: 1, margin: 10}}
        />
      </View>
    </View>
  );
}
