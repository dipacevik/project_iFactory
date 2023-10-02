import {View, Text, FlatList, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setUserTasks} from '../../../config/store/reducers/user';
import {ENDPOINT} from '../../utils/vars';
import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker';
import {SwipeListView} from 'react-native-swipe-list-view';
import Button from '../../components/Button/Button';
import moment from 'moment';

export default function TaskList() {
  const dispatcher = useDispatch();
  const userToken = useSelector((state) => state?.user?.token);
  const taskStore = useSelector((state) => state?.user?.tasks);

  const fetchData = async () => {
    const result = await axios.get(`${ENDPOINT}user/task/`, {headers: {Authorization: `Bearer ${userToken}`}});
    dispatcher(setUserTasks(result?.data?.data));
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log('asdasdasdsa', taskStore);
  const completeTask = async (data, rowMap) => {
    const {item} = data;
    const result = await axios.patch(
      `${ENDPOINT}user/task/${item?._id}`,
      {},
      {headers: {Authorization: `Bearer ${userToken}`}},
    );
    if (result?.data?.status === 'success') {
      rowMap[item?._id].closeRow();
      const result = await axios.get(`${ENDPOINT}user/task/`, {headers: {Authorization: `Bearer ${userToken}`}});
      dispatcher(setUserTasks(result?.data?.data));
    }
  };

  const renderTask = ({item}) => (
    <View
      key={item?._id}
      style={{
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text>{item?.description}</Text>
      {item?.todo && Platform.OS === 'android' && (
        <CustomDatePicker
          date={'2023-09-28T09:50:15.593Z'}
          readOnly={true}
          viewStyle={{padding: 5}}
          textStyle={{fontSize: 15}}
        />
      )}
      {item?.todo && Platform.OS === 'ios' && (
        <View
          style={{
            padding: 18,
            backgroundColor: 'lightgrey',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>{moment('2023-09-28T09:50:15.593Z').format('YYYY/MM/DD HH:mm')}</Text>
        </View>
      )}
    </View>
  );

  const renderEmpty = () => {
    return (
      <View>
        <Text>Non ci sono task al momento.</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SwipeListView
        data={taskStore}
        renderItem={renderTask}
        keyExtractor={(item) => item._id}
        renderHiddenItem={(data, rowMap) => (
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Button
              icon="check"
              btnStyle={{
                height: 40,
                width: 40,
                margin: 10,
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: 'green',
              }}
              textStyle={{color: 'white'}}
              onPress={() => completeTask(data, rowMap)}
            />
          </View>
        )}
        ListEmptyComponent={renderEmpty}
        rightOpenValue={-55}
        disableRightSwipe
        previewRowKey="0"
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
    </View>
  );
}
