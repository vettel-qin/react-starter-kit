import { createStore } from "redux";
import rootReducer from "../reducers";
const store = process.env.REACT_REDUX_DEVTOOLS_EXTENSION
  ? createStore(rootReducer)
  : window.__REDUX_DEVTOOLS_EXTENSION__
  ? createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__())
  : createStore(rootReducer);

export default store;
