import * as React from "react";
import {SongAndId} from "../../models/models";
import {YouTubePlayer} from "../youtube/YouTubePlayer";

export interface SearchResultComponentProps {
  song: SongAndId,
  moreSongsNeeded: boolean,
  songAdded: (song: SongAndId) => void,
}

export class SearchResultComponent extends React.PureComponent<SearchResultComponentProps> {

  render() {
    return (
      <div className={"search-result space"}>
        <h5>{this.props.song.title}</h5>
        <YouTubePlayer videoId={this.props.song.youtubeId} audioOnly={false}/>
        <button onClick={() => this.props.songAdded(this.props.song)}
                disabled={!this.props.moreSongsNeeded}>
          Add Song
        </button>
      </div>
    );
  }
}
