// interface vs types?!?!

import {RoundComponent} from "../components/bracket/RoundComponent";

export enum Winner {
  HOME, AWAY, NONE
}

export type Match = {
  home: SongAndId,
  away: SongAndId
  winner: Winner
}

export type Round = {
  number: number,
  matches: Array<Match>
}

export type Bracket = {
  title: string,
  rounds: Array<Round>
}

// minimal data bracket as returned from server
export type ApiBracket = {
  title: string,
  songs: SongAndId[]
}

export interface SongAndId {
  title: string,
  youtubeId: string
}

export interface IndexedSongAndId {
  index: number,
  song: SongAndId
}

