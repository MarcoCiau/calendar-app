import { combineReducers } from "redux";
import { calendarReducer } from "./calendar";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
  ui: uiReducer,
  calendar : calendarReducer
  //TODO: add AuthReducer
  //TODO: add Calendar Reducer
});

