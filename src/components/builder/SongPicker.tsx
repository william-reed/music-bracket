import * as React from "react";
import {SongAndId} from "../../models/models";

interface SongPickerProps {
  title: string,
  youtubeId: string,
  setSong: (song: SongAndId) => void,
}

/**
 * Allow for picking of songs
 */
export default ({title, youtubeId, setSong}: SongPickerProps) => {
  return (
    <div className={"song-picker space"}>
      <input type="text"
             value={title}
             placeholder="Song Name"
             onChange={(event) => setSong({youtubeId, title: event.target.value})}/>
      <input type="text"
             value={youtubeId}
             placeholder="YouTube Video ID"
             onChange={(event) => setSong({title, youtubeId: event.target.value})}/>
      <button onClick={() => setSong({title: "", youtubeId: ""})}>Clear</button>
    </div>
  );
}

