import React from "react";
import {SongComponent} from "./SongComponent";
import {Match} from "../models/models";

export interface MatchProps {
  match: Match
}

// match of songs to compete
export class MatchComponent extends React.Component<MatchProps> {
  render() {
    return (
      <div className={'match'}>
        <SongComponent song={this.props.match.home}/>
        <SongComponent song={this.props.match.away}/>
      </div>
    )
  }
}
