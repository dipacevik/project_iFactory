import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {ENDPOINT} from '../../utils/vars';
import Button from '../../components/Button/Button';

export default function AddUser({navigator}) {
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);

  const dispatcher = useDispatch();
  const userToken = useSelector((state) => state?.user?.token);

  const addUser = async () => {
    const info = await axios.post(`${ENDPOINT}user/create/`, {
      email: username,
      firstName,
      lastName,
      password,
      passwordConfirm,
    });
    if (info?.data?.status === 'success') {
      const result = await axios.post(`${ENDPOINT}user/`, {}, {headers: {Authorization: `Bearer ${userToken}`}});
      dispatcher(setUsersList(result?.data?.data));
      navigation.navigate('UserManager');
    }
  };

  return (
    <View style={{margin: 10}}>
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
        <Text>FirstName:</Text>
        <TextInput
          style={{
            paddingLeft: 5,
          }}
          placeholder="firstname"
          value={firstName}
          autoCapitalize="none"
          onChangeText={(text) => setFirstName(text)}
        />
      </View>
      <View style={{flexDirection: 'column', marginTop: 20, borderWidth: 1, borderRadius: 10, padding: 10}}>
        <Text>LastName:</Text>
        <TextInput
          style={{
            paddingLeft: 5,
          }}
          placeholder="lastname"
          value={lastName}
          autoCapitalize="none"
          onChangeText={(text) => setLastName(text)}
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
      <View style={{flexDirection: 'column', marginTop: 20, borderWidth: 1, borderRadius: 10, padding: 10}}>
        <Text>PasswordConfirm:</Text>
        <TextInput
          style={{
            paddingLeft: 5,
          }}
          secureTextEntry={true}
          placeholder="password"
          autoCapitalize="none"
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(text)}
        />
      </View>
      <Button title="Add User" onPress={addUser} />
    </View>
  );
}
