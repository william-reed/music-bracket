import {BracketActionTypes, SET_BASE_DATA, SET_INVALID, SET_LOADING, SET_WINNER} from "./action-types";
import {ApiBracket, Winner} from "../../models/models";

export function setWinner(round: number, match: number, winner: Winner): BracketActionTypes {
  return {
    type: SET_WINNER,
    payload: {round, match, winner}
  }
}

export function setLoading(loading: boolean): BracketActionTypes {
  return {
    type: SET_LOADING,
    payload: loading
  }
}

export function setInvalid(invalid: boolean): BracketActionTypes {
  return {
    type: SET_INVALID,
    payload: invalid
  }
}

export function setBaseData(data: ApiBracket): BracketActionTypes {
  return {
    type: SET_BASE_DATA,
    payload: data
  }
}
