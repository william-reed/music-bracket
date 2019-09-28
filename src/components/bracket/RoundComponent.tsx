import {Round, Winner} from "../../models/models";
import * as React from "react";
import {MatchComponent} from "./MatchComponent";

export interface RoundProps {
  round: Round,
  onMatchWon: (match: number, winner: Winner) => void,
}

// match of songs to compete
export class RoundComponent extends React.Component<RoundProps> {
  render() {
    let round = this.props.round;
    return (
      <div className={'round'}>
        <h4>Round {round.number}</h4>
        {round.matches.map((match, index: number) =>
          <MatchComponent key={round.number + '-' + index}
                          match={match}
                          onMatchWon={(winner: Winner) => this.props.onMatchWon(index, winner)}/>)
        }
      </div>
    )
  }
}
