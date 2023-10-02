import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {resetUserData, setUserData, setUserTime} from '../../../config/store/reducers/user';
import Button from '../../components/Button/Button';
import axios from 'axios';
import {ENDPOINT} from '../../utils/vars';

export default function User({navigation}) {
  const dispatcher = useDispatch();
  const userToken = useSelector((state) => state?.user?.token);

  const isUserAdmin = useSelector((state) => state?.user?.admin);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const time = useSelector((state) => state?.user?.time);

  const fetchTimeManagement = async () => {
    const result = await axios.get(`${ENDPOINT}user/time/`, {
      headers: {Authorization: `Bearer ${userToken}`},
    });
    dispatcher(setUserTime(result?.data?.data));
  };

  useEffect(() => {
    if (!isUserAdmin && userToken) {
      fetchTimeManagement();
    }
  }, []);

  const login = async () => {
    console.log('CREDENZAL', username, password);
    const result = await axios.post(`${ENDPOINT}user/login/`, {username: 'di pace.vincenzo2', password: '123.Stella'});
    console.log('RESULT', result);
    if (result?.data?.status === 'success') {
      const response = result?.data?.data?.user;
      const user = {
        token: result?.data?.token,
        username: response?.username,
        admin: response?.role,
        firstname: response?.firstName,
        lastname: response?.lastName,
      };
      dispatcher(setUserData(user));
    }
  };

  const loginView = () => {
    return (
      <View style={{flex: 1, margin: 20, justifyContent: 'center'}}>
        <View>
          <Text>Login</Text>
        </View>
        <View style={{flexDirection: 'column', marginTop: 20, borderWidth: 1, borderRadius: 10, padding: 10}}>
          <Text>Username:</Text>
          <TextInput
            style={{
              paddingLeft: 5,
            }}
            placeholder="username"
            value={username}
            autoCapitalize="none"
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={{flexDirection: 'column', marginTop: 20, borderWidth: 1, borderRadius: 10, padding: 10}}>
          <Text>Password:</Text>
          <TextInput
            style={{
              paddingLeft: 5,
            }}
            secureTextEntry={true}
            placeholder="password"
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Button title="Login" onPress={login} />
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      </View>
    );
  };

  const startWork = async () => {
    const result = await axios.post(
      `${ENDPOINT}user/time/`,
      {},
      {
        headers: {Authorization: `Bearer ${userToken}`},
      },
    );
    dispatcher(setUserTime(result?.data?.data));
  };

  const endWork = async () => {
    const result = await axios.patch(
      `${ENDPOINT}user/time/`,
      {},
      {
        headers: {Authorization: `Bearer ${userToken}`},
      },
    );
    dispatcher(setUserTime(result?.data?.data));
  };

  const renderTimeManager = () => {
    return (
      <View style={{flex: 1, margin: 10}}>
        {time?.endTime ? (
          <Text>You have alwready worked today!</Text>
        ) : (
          <>
            <Text>Time Manager</Text>
            {time?.startTime ? (
              <Button title="End Work" onPress={endWork} btnStyle={{padding: 10}} />
            ) : (
              <Button title="Start Work" onPress={startWork} btnStyle={{padding: 10}} />
            )}
          </>
        )}
      </View>
    );
  };

  const profileView = () => {
    return (
      <View style={{flex: 1}}>
        {!isUserAdmin && time && renderTimeManager()}
        <Button title="Logout" onPress={() => dispatcher(resetUserData())} />
      </View>
    );
  };
  return <>{userToken ? profileView() : loginView()}</>;
}

const styles = StyleSheet.create({});
