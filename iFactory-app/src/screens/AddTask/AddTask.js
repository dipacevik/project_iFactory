import {View, Text, TextInput, Switch} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {ENDPOINT} from '../../utils/vars';
import Button from '../../components/Button/Button';
import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker';
import {setTask} from '../../../config/store/reducers/task';
import moment from 'moment';

export default function AddTask({navigation, route}) {
  const {id} = 'adf'; /* route?.params */
  const [description, setDescription] = useState('');
  const [todo, setTodo] = useState(new Date());

  const dispatcher = useDispatch();
  const userToken = useSelector((state) => state?.user?.token);

  const [todoShow, setTodoShow] = useState(false);

  const addTask = async () => {
    let body = {userId: id, description};
    if (todoShow) {
      body.todo = moment(todo).toDate();
    }
    let result = await axios.post(`${ENDPOINT}user/task/add/`, body, {headers: {Authorization: `Bearer ${userToken}`}});
    if (result?.data?.status === 'success') {
      result = await axios.post(
        `${ENDPOINT}user/task/`,
        {userId: id},
        {headers: {Authorization: `Bearer ${userToken}`}},
      );
      dispatcher(setTask({userId: id, tasks: result?.data?.data}));
      navigation.goBack();
    }
  };

  return (
    <View style={{margin: 10}}>
      <View style={{flexDirection: 'column', marginTop: 20, borderWidth: 1, borderRadius: 10, padding: 10}}>
        <Text>Task:</Text>
        <TextInput
          style={{
            paddingLeft: 5,
          }}
          placeholder="Description Task"
          value={description}
          onChangeText={(text) => setDescription(text)}
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
          <Switch value={todoShow} onValueChange={() => setTodoShow(!todoShow)} />
          <Text style={{marginLeft: 10}}>Todo</Text>
        </View>
        {todoShow && (
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
              <CustomDatePicker date={todo} setDate={(d) => setTodo(d)} />
            </View>
          </View>
        )}
      </View>
      <Button title="Add Task" onPress={addTask} />
    </View>
  );
}
