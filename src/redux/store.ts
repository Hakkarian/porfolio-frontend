import { configureStore, combineReducers } from "@reduxjs/toolkit";
 
import { userReducer, commentReducer, projectReducer } from "./slice";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token", "user"],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const rootReducer = combineReducers({
    user: persistedReducer,
    projects: projectReducer,
    comments: commentReducer
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: { trace: true, traceLimit: 25 },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;