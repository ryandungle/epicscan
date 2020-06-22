import { createStore, combineReducers } from "redux";

import dataReducer from "./reducers/dataReducer";

const initialState = {};

const reducers = combineReducers({
  data: dataReducer,
});
const store = createStore(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
