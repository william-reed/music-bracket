import {Match, Round, Winner} from "../models/models";
import * as React from "react";
import {MatchComponent} from "./MatchComponent";

export interface RoundProps {
  round: Round,
  onRoundComplete: (round: Round) => void,
}

// used to modify the round as its going on
interface RoundState {
  modifiedRound: Round,
}

// match of songs to compete
export class RoundComponent extends React.Component<RoundProps, RoundState> {

  constructor(props: RoundProps) {
    super(props);

    // react complains without giving an initial state with the use of getDerivedStateFromProps
    this.state = {modifiedRound: this.props.round};
  }

  static getDerivedStateFromProps(nextProps: RoundProps) {
    return {modifiedRound: nextProps.round};
  }

  onMatchWon = (matchIndex: number, winner: Winner) => {
    let updatedRound = {...this.state.modifiedRound};
    updatedRound.matches[matchIndex].winner = winner;
    this.setState({modifiedRound: updatedRound});

    this.state.modifiedRound.matches.every((match: Match) => {
      return match.winner !== Winner.NONE;
    }) && this.props.onRoundComplete(this.state.modifiedRound);
  };

  render() {
    return (
      <div className={'round'}>
        <h4>Round {this.state.modifiedRound.number}</h4>
        {this.state.modifiedRound.matches.map((match, index: number) =>
          <MatchComponent key={this.state.modifiedRound.number + '-' + index}
                          match={match}
                          onMatchWon={(winner: Winner) => this.onMatchWon(index, winner)}/>)
        }
      </div>
    )
  }
}
