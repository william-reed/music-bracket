import {combineReducers} from "redux";
import {builderParentReducer} from "./builder/builder-reducer";

export const rootReducer = combineReducers({
  builder: builderParentReducer,
});
