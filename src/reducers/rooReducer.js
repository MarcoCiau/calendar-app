import { combineReducers } from "redux";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
  ui: uiReducer,
  //TODO: add AuthReducer
  //TODO: add Calendar Reducer
});

