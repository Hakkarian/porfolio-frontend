import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { userReducer, commentReducer, projectReducer } from "./slice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

// create a configuration for redux-persist
// to save values between reloads
// "whitelist" means to not save the following values

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

// persisted reducer - special "frozen" reducer,
// which accepts a configuration and an original reducer

const persistedReducer = persistReducer(persistConfig, userReducer);

// rootReducer stores all possible reducers together,
// forming a basic redux state

const rootReducer = combineReducers({
  user: persistedReducer,
  projects: projectReducer,
  comments: commentReducer,
});

// which is placed inside of the store configuration
// using configureStore from a redux toolkit

// exports a redux store object that is configured with a root reducer,
// middleware and devtools settings
// where middleware allows for customizing the behavior of the store
// devtools provide debugging capabilities
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

// pass the resulting store inside of the persistor function, to "freeze" user state
export const persistor = persistStore(store);

export default store;
