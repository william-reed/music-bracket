import * as React from "react";
import {SongAndId} from "../../models/models";
import {YouTubePlayer} from "../youtube/YouTubePlayer";

export interface SearchResultComponentProps {
  song: SongAndId,
  moreSongsNeeded: boolean,
  songAdded: (song: SongAndId) => void,
}

export default ({song, moreSongsNeeded, songAdded}: SearchResultComponentProps) =>
  (<div className={"search-result space"}>
      <h5>{song.title}</h5>
      <YouTubePlayer videoId={song.youtubeId} audioOnly={false}/>
      <button onClick={() => songAdded(song)}
              disabled={!moreSongsNeeded}>
        Add Song
      </button>
    </div>
  )
