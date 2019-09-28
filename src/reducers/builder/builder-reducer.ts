import {BuilderStore} from "../../models/store/builder-store";
import {ADD_SONG, BuilderActionTypes, SET_NUM_SONGS, SET_SONG, SET_TITLE} from "../../actions/builder/action-types";
import {combineReducers} from "redux";
import {builderSearchReducer} from "./builder-search-reducer";

const initialState: BuilderStore = {
  title: "",
  numSongs: 8,
  songs: [],
};

export function builderReducer(
  state = initialState,
  action: BuilderActionTypes
): BuilderStore {
  switch (action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case SET_NUM_SONGS:
      return {
        ...state,
        numSongs: action.payload
      };
    case SET_SONG: {
      let song = action.payload.song;
      let index = action.payload.index;

      let songs = [...state.songs];

      // if its empty, remove it
      if (song.youtubeId === "" && song.title === "") {
        songs.splice(index, 1);
      } else {
        songs[index] = song;
      }

      return {
        ...state,
        songs
      };
    }
    case ADD_SONG: {
      let songs = [...state.songs];
      songs.push(action.payload);
      return {
        ...state,
        songs
      };
    }
    default:
      return state
  }
}

export const builderParentReducer = combineReducers({
  common: builderReducer,
  search: builderSearchReducer
});
