import * as React from "react";
import {SongAndId} from "../../models/models";
import {YouTubePlayer} from "../youtube/YouTubePlayer";

export interface SongProps {
  song: SongAndId
  selected: () => void,
  winner: boolean,
}

// display a song
export class SongComponent extends React.Component<SongProps> {
  render() {
    return (
      <div className={'song ' + (this.props.winner && 'winner')}>
        <p>{this.props.song.title}</p>
        <YouTubePlayer videoId={this.props.song.youtubeId} audioOnly={true}/>
        <input type="radio" onChange={this.props.selected} checked={this.props.winner}/>
      </div>
    )
  }
}
