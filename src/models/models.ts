export type Song = {
  name: string;
  youtubeUrl: string;
};

export enum Winner {
  HOME, AWAY
}

export type Match = {
  home: Song,
  away: Song
  prevMatchHome?: Match,
  prevMatchAway?: Match,
  winner?: Winner
}

export type Round = {
  number: number,
  matches: Array<Match>
}

export type Bracket = {
  title: string,
  rounds: Array<Round>
}
