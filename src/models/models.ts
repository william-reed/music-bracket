// interface vs types?!?!

export type Song = {
  name: string;
  youtubeId: string;
};

export enum Winner {
  HOME, AWAY, NONE
}

export type Match = {
  home: Song,
  away: Song
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

export interface SongAndId {
  title: string,
  youtubeId: string
}

export interface IndexedSongAndId {
  index: number,
  song: SongAndId
}
