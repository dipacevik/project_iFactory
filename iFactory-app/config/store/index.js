import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './reducers/user';
import factoryReducer from './reducers/factory';
import usersReducer from './reducers/users';
import taskReducer from './reducers/task';
import {persistStore, persistReducer} from 'redux-persist';

let rootReducer = combineReducers({user: userReducer, factory: factoryReducer, users: usersReducer, task: taskReducer});

const persistorConfig = {key: 'root', storage: AsyncStorage, blacklist: ['factory', 'users', 'task']};

const persistReducers = persistReducer(persistorConfig, rootReducer);

const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);

export {store, persistor};
