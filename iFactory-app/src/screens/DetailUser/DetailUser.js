import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/Button/Button';
import axios from 'axios';
import {ENDPOINT} from '../../utils/vars';
import {setTask} from '../../../config/store/reducers/task';
import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker';
import {SwipeListView} from 'react-native-swipe-list-view';

export default function DetailUser({navigation, route}) {
  const {item} = route?.params;

  const dispatcher = useDispatch();

  const userToken = useSelector((state) => state?.user?.token);
  const isUserAdmin = useSelector((state) => state?.user?.admin);

  const taskStore = {
    _id: {$oid: '65154c65e077f0e02b0920bc'},
    user: {$oid: '651430ebf7a9321e994401ea'},
    description: 'Coltivazione',
    todo: {$date: {$numberLong: '1695894615593'}},
    status: false,
    createdAt: {$date: {$numberLong: '1695894629372'}},
    __v: {$numberInt: '0'},
  };

  const fetchData = async () => {
    const result = await axios.post(
      `${ENDPOINT}user/task/`,
      {userId: item?._id},
      {headers: {Authorization: `Bearer ${userToken}`}},
    );
    dispatcher(setTask({userId: item._id, tasks: result?.data?.data}));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      {item?.todo && (
        <CustomDatePicker date={item?.todo} readOnly={true} viewStyle={{padding: 5}} textStyle={{fontSize: 15}} />
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

  const deleteTask = async (rowData, rowMap) => {
    const {item} = rowData;
    const result = await axios.delete(`${ENDPOINT}user/task/${item?._id}`, {
      headers: {Authorization: `Bearer ${userToken}`},
    });
    if (result?.data?.status === 'success') {
      rowMap[item?._id].closeRow();
      fetchData();
    }
  };

  return (
    <View style={{flex: 1}}>
      {true ? (
        <>
          <View
            style={{
              flexDirection: 'column',
              marginTop: 20,
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              marginHorizontal: 10,
            }}>
            <Text>Working Log Today: {item?.logs === null ? 'none' : item?.logs?.endTime ? 'ended' : 'started'}</Text>
            {item?.logs !== null &&
              (item?.logs?.endTime ? (
                <>
                  <View
                    style={{
                      padding: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text>Started working: </Text>
                    <CustomDatePicker
                      date={item?.logs?.startTime}
                      readOnly={true}
                      viewStyle={{padding: 5}}
                      textStyle={{fontSize: 15}}
                    />
                  </View>
                  <View
                    style={{
                      padding: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text>Ended working: </Text>
                    <CustomDatePicker
                      date={item?.logs?.endTime}
                      readOnly={true}
                      viewStyle={{padding: 5}}
                      textStyle={{fontSize: 15}}
                    />
                  </View>
                </>
              ) : (
                <View
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text>Started Working:</Text>
                  <CustomDatePicker
                    date={item?.logs?.startTime}
                    readOnly={true}
                    viewStyle={{padding: 5}}
                    textStyle={{fontSize: 15}}
                  />
                </View>
              ))}
          </View>
          <Button title="Add Task" onPress={() => navigation.navigate('AddTaskUser', {id: item._id})} />
          <View style={{flex: 1, marginHorizontal: 10}}>
            <SwipeListView
              data={taskStore}
              renderItem={renderTask}
              keyExtractor={(item) => item._id}
              renderHiddenItem={(rowData, rowMap) => (
                <View
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginRight: 20,
                  }}>
                  <Button
                    icon="delete"
                    btnStyle={{
                      height: 40,
                      width: 40,
                      margin: 10,
                      padding: 10,
                      borderWidth: 1,
                      borderRadius: 10,
                      backgroundColor: 'red',
                    }}
                    textStyle={{color: 'white'}}
                    onPress={() => deleteTask(rowData, rowMap)}
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
        </>
      ) : (
        <Text>DetailUser</Text>
      )}
    </View>
  );
}
