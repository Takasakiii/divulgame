import { createStore, combineReducers } from "redux";

import LoginReducer from "./Login/Login.reducer";

const rootReducer = combineReducers({
  login: LoginReducer,
});

const store = createStore(rootReducer);

export default store;
