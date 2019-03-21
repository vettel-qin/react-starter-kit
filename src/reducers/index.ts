import { combineReducers } from "redux";
import TodoListReducer from "./todoList";

const reducer = combineReducers({
  todoList: TodoListReducer as any
});

export default reducer;
