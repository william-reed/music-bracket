import {SongAndId, Winner} from "../models";

// normalized form of my models for simplified redux processing
// seems weird, probably not actually needed. but recommended for redux
export interface BracketParentStore {
  loading: boolean,
  invalid: boolean,
  bracket: BracketStore
}

export interface BracketStore {
  title: string,
  winner?: number
  songs: SongAndId[]
  rounds: RoundStore[]
}

export interface RoundStore {
  number: number,
  matches: MatchStore[]
}

export interface MatchStore {
  homeIndex: number,
  awayIndex: number,
  winner: Winner
}
