import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { commentReducer, projectReducer } from "./slice";

const rootReducer = combineReducers({
    // auth: userReducer,
    projects: projectReducer,
    comments: commentReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store;