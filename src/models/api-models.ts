// minimal data bracket as returned from server
import {SongAndId} from "./models";

export type ApiBracket = {
  title: string,
  songs: SongAndId[]
}

export type BracketId = {
  id: string
}
