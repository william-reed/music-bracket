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
      <div style={{backgroundColor: "#c8c8c8", margin: "10px", padding: "5px"}}>
        <SongComponent song={this.props.match.home}/>
        <SongComponent song={this.props.match.away}/>
      </div>
    )
  }
}
