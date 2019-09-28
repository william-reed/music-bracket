import {ApiBracket, Winner} from "../../models/models";

export const SET_WINNER = "bracket:winner-set";
export const SET_LOADING = "bracket:loading-set";
export const SET_INVALID = "bracket:invalid-set";
export const SET_BASE_DATA = "bracket:set";

export interface ISetWinner {
  round: number,
  match: number,
  winner: Winner
}

interface SetWinnerAction {
  type: typeof SET_WINNER,
  payload: ISetWinner
}

interface SetLoadingAction {
  type: typeof SET_LOADING,
  payload: boolean
}

interface SetInvalidAction {
  type: typeof SET_INVALID,
  payload: boolean
}

interface SetBaseDataAction {
  type: typeof SET_BASE_DATA,
  payload: ApiBracket,
}

export type BracketActionTypes = SetWinnerAction | SetLoadingAction | SetInvalidAction | SetBaseDataAction
