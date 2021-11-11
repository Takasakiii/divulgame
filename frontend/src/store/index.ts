import { createStore, combineReducers } from "redux";

import LoginReducer from "./Login/Login.reducer";

const rootReducer = combineReducers({
  login: LoginReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
