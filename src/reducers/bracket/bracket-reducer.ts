import {BracketParentStore, BracketStore, MatchStore, RoundStore} from "../../models/store/bracket-store";
import {
  BracketActionTypes,
  SET_BASE_DATA,
  SET_INVALID,
  SET_LOADING,
  SET_WINNER
} from "../../actions/bracket/action-types";
import {Winner} from "../../models/models";

const initialState: BracketParentStore = {
  loading: true,
  invalid: false,
  bracket: {
    title: "",
    songs: [],
    rounds: [],
  }
};

/**
 * Is the given round completed?
 */
function isRoundComplete(round: RoundStore): boolean {
  return round.matches.every((match: MatchStore) => {
    return match.winner !== Winner.NONE;
  });
}

/**
 * On round completion generate the new bracket
 * @param {BracketStore} bracket current bracket
 * @param {RoundStore} round just completed
 * @returns {BracketStore} the modified bracket which contains the setup next round
 */
function onRoundComplete(bracket: BracketStore, round: RoundStore): BracketStore {
  // is this the final round?
  if (round.matches.length === 1) {
    let match = round.matches[0];
    let winner = match.winner === Winner.HOME ? match.homeIndex : match.awayIndex;
    return {...bracket, winner}
  }

  // wipe any rounds beyond this since they may no longer be valid
  let newRounds = bracket.rounds.slice(0, round.number); // round numbers are 1 indexed, so it doesn't matter that slice is exclusive

  // create the next round based on the winners from this round
  let songsInNextMatch: number[] = [];
  round.matches.forEach((match: MatchStore) => {
    songsInNextMatch.push(match.winner === Winner.HOME ? match.homeIndex : match.awayIndex)
  });

  let nextRound = songsToRound(round.number  + 1, songsInNextMatch);

  newRounds.push(nextRound);

  return {...bracket, rounds: newRounds}
}

/**
 * Generate the next round
 * @param {number} number the round number (1 indexed)
 * @param {number[]} songs the index of the song (remember the data is normalized)
 * @returns {RoundStore} of the next round
 */
function songsToRound(number: number, songs: number[]): RoundStore {
  if (songs.length % 2 !== 0) {
    console.error("not given proper length")
  }

  let round: RoundStore = {
    number,
    matches: []
  };
  for (let i = 0; i < songs.length - 1; i += 2) {
    round.matches.push({
      homeIndex: songs[i],
      awayIndex: songs[i + 1],
      winner: Winner.NONE,
    })
  }

  return round;
}

export function bracketParentReducer(
  state = initialState,
  action: BracketActionTypes
): BracketParentStore {
  switch (action.type) {
    case SET_BASE_DATA: {
      let data = action.payload;

      return {
        loading: false, invalid: false, bracket: {
          title: data.title,
          songs: data.songs,
          rounds: [songsToRound(1, Array.from(Array(data.songs.length).keys()))],
        }
      }
    }
    case SET_WINNER: {
      // TODO: maybe i should look into some deep copy libraries or something, eek
      // or maybe my data would be better restructured

      let roundIndex = action.payload.round - 1; // subtract one since rounds are 1 indexed
      let matchIndex = action.payload.match;

      let round = state.bracket.rounds[roundIndex];
      let match = round.matches[matchIndex];

      let newMatches = [...round.matches];
      newMatches[matchIndex] = {...match, winner: action.payload.winner};

      let newRounds = [...state.bracket.rounds];
      newRounds[roundIndex] = {...round, matches: newMatches};

      let newBracket: BracketStore = {...state.bracket, rounds: newRounds.slice(0, roundIndex + 1), winner: undefined};
      if (isRoundComplete(newRounds[roundIndex])) {
        return {...state, bracket: onRoundComplete(newBracket, newRounds[roundIndex])};
      } else {
        // make sure to remove anything new
        return {...state, bracket: newBracket};
      }
    }
    case SET_LOADING:
      return {...state, loading: action.payload};
    case SET_INVALID:
      return {...state, invalid: action.payload};
    default:
      return state
  }
}
