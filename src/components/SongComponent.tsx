import * as React from "react";
import {Song} from "../models/models";
import {YoutubeAudioPlayer} from "./YoutubeAudioPlayer";

export interface SongProps {
  song: Song
  selected: () => void,
  winner: boolean,
}

// display a song
export class SongComponent extends React.Component<SongProps> {
  render() {
    return (
      <div className={'song ' + (this.props.winner && 'winner')}>
        <p>{this.props.song.name}</p>
        <YoutubeAudioPlayer videoId={this.props.song.youtubeId}/>
        <input type="radio" onChange={this.props.selected} checked={this.props.winner}/>
      </div>
    )
  }
}
