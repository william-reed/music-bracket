import {BuilderSearchStore} from "../../models/store/builder-store";
import {
  BuilderSearchActionTypes,
  SET_SEARCH_LOADING,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS
} from "../../actions/builder/action-types";

const initialState: BuilderSearchStore = {
  query: "",
  searchResults: [],
  loading: false
};

export function builderSearchReducer(
  state = initialState,
  action: BuilderSearchActionTypes
): BuilderSearchStore {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload
      };
    case SET_SEARCH_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state
  }
}
