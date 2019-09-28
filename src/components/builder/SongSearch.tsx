import * as React from "react";
import {SearchResultComponent} from "./SearchResultComponent";
import {SongAndId} from "../../models/models";

export interface SongSearchProps {
  songAdded: (song: SongAndId) => void,
  searchClicked: () => void,
  queryChanged: (query: string) => void,
  moreSongsNeeded: boolean,
  query: string,
  searchResults: SongAndId[],
  loading: boolean
}

export class SongSearch extends React.PureComponent<SongSearchProps> {

  render() {
    return (
      <div className={"space"}>
        <input type="text"
               value={this.props.query}
               placeholder="Search for a song"
               onChange={(event) => this.props.queryChanged(event.target.value)}/>
        <button onClick={this.props.searchClicked}>Search</button>


        {this.props.loading && <p>Loading...</p>}
        {!this.props.loading && this.props.searchResults &&
        this.props.searchResults.map((song, i) => <SearchResultComponent song={song}
                                                                         moreSongsNeeded={this.props.moreSongsNeeded}
                                                                         songAdded={this.props.songAdded}
                                                                         key={i}/>)
        }
      </div>
    );
  }
}
