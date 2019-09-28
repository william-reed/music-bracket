import * as React from "react";
import "./BuilderContainer.css"
import {SizeSelector} from "../components/builder/SizeSelector";
import {SongSearch} from "../components/builder/SongSearch";
import {SongPicker} from "../components/builder/SongPicker";
import {BuilderParentStore} from "../models/store/builder-store";
import {Dispatch} from "redux";
import {
  addSong,
  setNumSongs, setSearchLoading,
  setSearchQuery, setSearchResults, setSong,
  setTitle,
} from "../actions/builder/builder-actions";
import {videoSearch} from "../api";

interface BuilderProps {
  builder: BuilderParentStore,
  dispatch: Dispatch
}

export class BuilderContainer extends React.Component<BuilderProps> {

  moreSongsNeeded = () => {
    return this.props.builder.common.songs.some(song => song.title === "" && song.youtubeId === "")
      || this.props.builder.common.songs.length < this.props.builder.common.numSongs
  };

  render() {
    let common = this.props.builder.common;
    let search = this.props.builder.search;
    let dispatch = this.props.dispatch;
    return (
      <div>
        <div className={"space"}>
          <input type="text"
                 value={common.title}
                 placeholder="Title"
                 onChange={(event) => dispatch(setTitle(event.target.value))}/>
          <SizeSelector amount={common.numSongs}
                        onSizeChanged={(newSize) => dispatch(setNumSongs(newSize))}/>
        </div>
        <div className={"builder"}>
          <div className={"picker space"}>
            <h3>Song Picker</h3>
            {Array.from({length: common.numSongs}, (x, i) => i).map((i) => {
              let song = common.songs[i];
              let title, youtubeId;

              if (song) {
                title = song.title;
                youtubeId = song.youtubeId;
              } else {
                title = "";
                youtubeId = "";
              }

              return <SongPicker title={title} youtubeId={youtubeId} key={i} setSong={s => dispatch(setSong(i, s))}/>
            })}

            <button disabled={this.moreSongsNeeded()}
                    onClick={() => console.log("todo create action for submitting a bracket")}>Submit
            </button>
          </div>
          <div className={"search space"}>
            <h3>Song Search</h3>
            <SongSearch songAdded={s => dispatch(addSong(s))}
                        searchClicked={async () => {
                          dispatch(setSearchLoading(true));
                          let results = await videoSearch(search.query);
                          dispatch(setSearchLoading(false));
                          dispatch(setSearchResults(results))
                        }}
                        queryChanged={s => dispatch(setSearchQuery(s))}
                        moreSongsNeeded={this.moreSongsNeeded()}
                        query={search.query}
                        searchResults={search.searchResults}
                        loading={search.loading}/>
          </div>
        </div>
      </div>
    )
  }
}
