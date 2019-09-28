import {IndexedSongAndId, SongAndId} from "../../models/models";

export const SET_TITLE = "builder:title-set";
export const SET_NUM_SONGS = "builder:number-songs-set";
export const SET_SONG = "builder:song-set";
export const ADD_SONG = "builder:song-add";

interface SetTitleAction {
  type: typeof SET_TITLE
  payload: string
}

interface SetNumSongsAction {
  type: typeof SET_NUM_SONGS
  payload: number
}

interface SetSongAction {
  type: typeof SET_SONG
  payload: IndexedSongAndId
}

interface AddSongAction {
  type: typeof ADD_SONG,
  payload: SongAndId
}

export type BuilderActionTypes = SetTitleAction | SetNumSongsAction | SetSongAction | AddSongAction

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// search
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const SET_SEARCH_QUERY = "search:query";
export const SET_SEARCH_RESULTS = "search:results";
export const SET_SEARCH_LOADING = "search:loading";
export const SEARCH_CLICKED = "search:clicked";

interface SetSearchQueryAction {
  type: typeof SET_SEARCH_QUERY,
  payload: string
}

interface SetSearchResultsAction {
  type: typeof SET_SEARCH_RESULTS,
  payload: SongAndId[]
}

interface SetSearchLoadingAction {
  type: typeof SET_SEARCH_LOADING,
  payload: boolean
}

export type BuilderSearchActionTypes = SetSearchQueryAction | SetSearchResultsAction | SetSearchLoadingAction
