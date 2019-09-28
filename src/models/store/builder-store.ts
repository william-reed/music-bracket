import {SongAndId} from "../models";

export interface BuilderParentStore {
  common: BuilderStore,
  search: BuilderSearchStore
}

export interface BuilderStore {
  title: string,
  numSongs: number,
  songs: SongAndId[],
}

export interface BuilderSearchStore {
  query: string,
  searchResults: SongAndId[],
  loading: boolean,
}
