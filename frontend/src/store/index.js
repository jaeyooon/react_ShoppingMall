import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, 
    REHYDRATE, persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
    user: userReducer,
})


const persistConfig = {
    key: 'root',    // localStorage에 저장할 때 key의 이름
    storage     // localStorage에 저장
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] // 이러한 액션들이 들어오면 serializableCheck를 false로 하겠다는 의미
        }
    })
})

export const persistor = persistStore(store);