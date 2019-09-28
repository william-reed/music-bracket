import {
  ADD_SONG,
  BuilderActionTypes,
  BuilderSearchActionTypes,
  SET_NUM_SONGS,
  SET_SEARCH_LOADING,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
  SET_SONG,
  SET_TITLE
} from "./action-types";
import {SongAndId} from "../../models/models";

export function setTitle(title: string): BuilderActionTypes {
  return {
    type: SET_TITLE,
    payload: title
  }
}

export function setNumSongs(num: number): BuilderActionTypes {
  return {
    type: SET_NUM_SONGS,
    payload: num
  }
}

export function setSong(index: number, song: SongAndId): BuilderActionTypes {
  return {
    type: SET_SONG,
    payload: {
      index,
      song
    }
  }
}

export function addSong(song: SongAndId): BuilderActionTypes {
  return {
    type: ADD_SONG,
    payload: song
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// search
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function setSearchQuery(query: string): BuilderSearchActionTypes {
  return {
    type: SET_SEARCH_QUERY,
    payload: query
  }
}

export function setSearchResults(results: SongAndId[]): BuilderSearchActionTypes {
  return {
    type: SET_SEARCH_RESULTS,
    payload: results
  }
}

export function setSearchLoading(loading: boolean): BuilderSearchActionTypes {
  return {
    type: SET_SEARCH_LOADING,
    payload: loading
  }
}
