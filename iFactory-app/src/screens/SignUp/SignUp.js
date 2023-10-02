import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import Button from '../../components/Button/Button';
import axios from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import {ENDPOINT} from '../../utils/vars';

export default function SignUp({navigation}) {
  const [username, setUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);

  const signup = async () => {
    const info = await axios.post(`${ENDPOINT}user/sign-up/`, {
      email: username,
      firstName,
      lastName,
      password,
      passwordConfirm,
    });
    if (info?.data?.status === 'success') {
      navigation.navigate('User');
    }
  };

  const signUpView = () => {
    return (
      <View style={{flex: 1, margin: 20}}>
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
        <Button title="Sign Up" onPress={signup} />
      </View>
    );
  };
  return <>{signUpView()}</>;
}
