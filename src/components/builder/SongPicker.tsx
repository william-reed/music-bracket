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
export class SongPicker extends React.PureComponent<SongPickerProps> {

  render() {
    let title = this.props.title;
    let youtubeId = this.props.youtubeId;
    return (
      <div className={"song-picker space"}>
        <input type="text"
               value={title}
               placeholder="Song Name"
               onChange={(event) => this.props.setSong({youtubeId, title: event.target.value})}/>
        <input type="text"
               value={youtubeId}
               placeholder="YouTube Video ID"
               onChange={(event) => this.props.setSong({title, youtubeId: event.target.value})}/>
        <button onClick={() => this.props.setSong({title: "", youtubeId: ""})}>Clear</button>
      </div>
    );
  }
}
