import {Round} from "../models/models";
import * as React from "react";
import {MatchComponent} from "./MatchComponent";

export interface RoundProps {
  round: Round
}

// match of songs to compete
export class RoundComponent extends React.Component<RoundProps> {
  render() {
    return (
      <div className={'round'}>
        <h4>Round {this.props.round.number}</h4>
        {this.props.round.matches.map((match, index: number) =>
          <MatchComponent key={this.props.round.number + '-' + index} match={match}/>)
        }
      </div>
    )
  }
}
