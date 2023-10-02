import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import User from './User/User';
import SignUp from './SignUp/SignUp';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserManager from './UserManager/UserManager';
import Factory from './Factory/Factory';
import AddFactoryItem from './AddFactoryItem/AddFactoryItem';
import DetailFactoryItem from './DetailFactoryItem/DetailFactoryItem';
import AddFactoryItemChoose from './AddFactoryItemChoose/AddFactoryItemChoose';
import AddBluetoothFactoryItem from './AddBluetoothFactoryItem/AddBluetoothFactoryItem';
import AddUser from './AddUser/AddUser';
import DetailUser from './DetailUser/DetailUser';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddTask from './AddTask/AddTask';
import TaskList from './TaskList/TaskList';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigator() {
  const userToken = useSelector((state) => state?.user?.token);
  const isUserAdmin = useSelector((state) => state?.user?.admin);

  const InitalView = () => (
    <Stack.Navigator>
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );

  const AddFactoryItemNav = () => (
    <Stack.Navigator>
      <Stack.Screen name="AddFactoryItemChoose" component={AddFactoryItemChoose} />
      <Stack.Screen name="AddFactoryItem" component={AddFactoryItem} />
      <Stack.Screen name="AddBluetoothFactoryItem" component={AddBluetoothFactoryItem} />
    </Stack.Navigator>
  );

  const FactoryNav = () => (
    <Stack.Navigator>
      <Stack.Screen name="Factory" component={Factory} />
      <Stack.Screen name="AddFactoryItemNav" component={AddFactoryItemNav} options={{headerShown: false}} />
      <Stack.Screen name="DetailFactoryItem" component={DetailFactoryItem} />
    </Stack.Navigator>
  );

  const UserManagerNav = () => (
    <Stack.Navigator>
      <Stack.Screen name="UserManager" component={UserManager} />
      <Stack.Screen name="AddUser" component={AddUser} />
      <Stack.Screen name="DetailUser" component={DetailUser} />
      <Stack.Screen name="AddTaskUser" component={AddTask} />
    </Stack.Navigator>
  );

  const HomePageView = () => (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <Tab.Screen
        name="FactoryNav"
        component={FactoryNav}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="home" size={40} color={'black'} />,
        }}
      />
      {!isUserAdmin && (
        <Tab.Screen
          name="TaskList"
          component={TaskList}
          options={{
            tabBarIcon: () => <Icon name="checkbox-marked-circle-outline" size={40} color={'black'} />,
          }}
        />
      )}
      {isUserAdmin && (
        <Tab.Screen
          name="UserManagerNav"
          component={UserManagerNav}
          options={{headerShown: false, tabBarIcon: () => <Icon name="book-account" size={40} color={'black'} />}}
        />
      )}
      <Tab.Screen
        name="UserProfile"
        component={User}
        options={{
          tabBarIcon: () => <Icon name="account" size={40} color={'black'} />,
        }}
      />
    </Tab.Navigator>
  );
  return <NavigationContainer>{!userToken ? <InitalView /> : <HomePageView />}</NavigationContainer>;
  /* return (
    <NavigationContainer>
      <HomePageView />
    </NavigationContainer>
  ); */
}
