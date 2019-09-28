import React from "react";
import {SongComponent} from "./SongComponent";
import {Match, Winner} from "../../models/models";

export interface MatchProps {
  match: Match,
  onMatchWon: (winner: Winner) => void,
}

// match of songs to compete
export class MatchComponent extends React.Component<MatchProps> {
  render() {
    return (
      <div className={'match'}>
        <SongComponent song={this.props.match.home}
                       selected={() => this.props.onMatchWon(Winner.HOME)}
                       winner={this.props.match.winner === Winner.HOME}/>
        <SongComponent song={this.props.match.away}
                       selected={() => this.props.onMatchWon(Winner.AWAY)}
                       winner={this.props.match.winner === Winner.AWAY}/>
      </div>
    )
  }
}
