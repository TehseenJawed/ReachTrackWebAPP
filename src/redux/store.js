import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import trackReducer from './reducers/trackReducer';
import { persistStore, persistReducer } from 'redux-persist'
import {thunk} from "redux-thunk";
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  auth: authReducer,
  track: trackReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// create the saga middleware
// const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

const persistedStore = persistStore(store);

export {store, persistedStore}

// then run the saga
// sagaMiddleware.run(rootSaga);
