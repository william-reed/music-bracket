import {BuilderParentStore} from "./builder-store";
import {BracketParentStore} from "./bracket-store";

export interface DataStore {
  builder: BuilderParentStore,
  bracket: BracketParentStore
}

