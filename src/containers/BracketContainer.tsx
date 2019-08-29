import * as React from "react";
import {RoundComponent} from "../components/RoundComponent";

export class BracketContainer extends React.Component {
  render() {
    return (
      <div>
        <RoundComponent round={
          {
            number: 1,
            matches: [
              {
                home: {name: "Runaway", youtubeUrl: "url"},
                away: {name: "School Spirit", youtubeUrl: "url"}
              },
              {
                home: {name: "Earfquake", youtubeUrl: "url"},
                away: {name: "Flowers", youtubeUrl: "url"}
              }
            ]
          }
        }/>
      </div>
    )
  }
}
