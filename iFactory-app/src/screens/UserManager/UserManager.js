import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setUsersList} from '../../../config/store/reducers/users';
import axios from 'axios';
import Button from '../../components/Button/Button';
import {ENDPOINT} from '../../utils/vars';

const tmp = [
  {
    __v: 0,
    _id: '651430ebf7a9321e994401ea',
    active: false,
    createdAt: '2023-09-27T13:40:59.304Z',
    email: 'vi.dipace',
    firstName: 'Vincenzo',
    lastName: 'Di Pace',
    logs: null,
    role: 'user',
    username: 'di pace.vincenzo1',
  },
];

export default function UserManager({navigation}) {
  const dispatcher = useDispatch();
  const userToken = useSelector((state) => state?.user?.token);
  const usersList = useSelector((state) => state?.users?.users);

  const fetchData = async () => {
    const result = await axios.post(`${ENDPOINT}user/`, {}, {headers: {Authorization: `Bearer ${userToken}`}});
    console.log('TEST', result?.data?.data);
    dispatcher(setUsersList(result?.data?.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderUser = ({item}) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetailUser', {item})}>
      <View key={item?._id} style={{flex: 1, borderWidth: 1, borderRadius: 10, padding: 10, margin: 5}}>
        <Text>@{item?.username}</Text>
        <Text>
          FirstName: {item?.firstName} LastName: {item?.lastName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => {
    return (
      <View>
        <Text>Non ci sono utenti inseriti su questa fattoria.</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Button title="Add User" onPress={() => navigation.navigate('AddUser')} />
      <View style={{flex: 1}}>
        <FlatList
          data={usersList}
          renderItem={renderUser}
          ListEmptyComponent={renderEmpty}
          style={{flex: 1, margin: 10}}
        />
      </View>
    </View>
  );
}
