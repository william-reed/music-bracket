import {combineReducers} from "redux";
import {builderParentReducer} from "./builder/builder-reducer";
import {bracketParentReducer} from "./bracket/bracket-reducer";

export const rootReducer = combineReducers({
  builder: builderParentReducer,
  bracket: bracketParentReducer,
});
