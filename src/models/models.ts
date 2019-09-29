// interface vs types?!?!

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

export interface SongAndId {
  title: string,
  youtubeId: string
}

export interface IndexedSongAndId {
  index: number,
  song: SongAndId
}

