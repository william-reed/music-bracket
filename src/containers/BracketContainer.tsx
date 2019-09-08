import * as React from "react";
import {RoundComponent} from "../components/RoundComponent";

export class BracketContainer extends React.Component {
  render() {
    return (
      <div className={'bracket'}>
        <RoundComponent round={
          {
            number: 1,
            matches: [
              {
                home: {name: "Runaway", youtubeId: "Jg5wkZ-dJXA"},
                away: {name: "School Spirit", youtubeId: "-MOIPnu50O4"}
              },
              {
                home: {name: "Earfquake", youtubeId: "HmAsUQEFYGI"},
                away: {name: "After the Storm", youtubeId: "9f5zD7ZSNpQ"}
              }
            ]
          }
        }/>

        <RoundComponent round={
          {
            number: 2,
            matches: [
              {
                home: {name: "Runaway", youtubeId: "Jg5wkZ-dJXA"},
                away: {name: "After the Storm", youtubeId: "9f5zD7ZSNpQ"}
              },
            ]
          }
        }/>
      </div>
    )
  }
}
