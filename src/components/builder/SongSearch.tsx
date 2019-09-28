import * as React from "react";
import {SongAndId} from "../../models/models";
import SearchResultComponent from "./SearchResultComponent";

export interface SongSearchProps {
  songAdded: (song: SongAndId) => void,
  searchClicked: () => void,
  queryChanged: (query: string) => void,
  moreSongsNeeded: boolean,
  query: string,
  searchResults: SongAndId[],
  loading: boolean
}


export default ({songAdded, searchClicked, queryChanged, moreSongsNeeded, query, searchResults, loading}: SongSearchProps) =>
  (
    <div className={"space"}>
      <input type="text"
             value={query}
             placeholder="Search for a song"
             onChange={(event) => queryChanged(event.target.value)}/>
      <button onClick={searchClicked}>Search</button>


      {loading && <p>Loading...</p>}
      {!loading && searchResults &&
      searchResults.map((song, i) => <SearchResultComponent song={song}
                                                            moreSongsNeeded={moreSongsNeeded}
                                                            songAdded={songAdded}
                                                            key={i}/>)
      }
    </div>
  )
