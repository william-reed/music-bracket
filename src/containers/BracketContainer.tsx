import * as React from "react";
import {Bracket, Match, Round, Song, Winner} from "../models/models";
import './BracketContainer.css'
import {RoundComponent} from "../components/bracket/RoundComponent";
import {WinnerComponent} from "../components/bracket/WinnerComponent";

interface BracketState {
  bracket: Bracket
  winner?: string,
}

export class BracketContainer extends React.Component<{}, BracketState> {

  constructor(props: any) {
    super(props);

    this.state = {
      bracket: {
        title: "test bracket",
        rounds: [
          {
            number: 1,
            matches: [
              {
                home: {name: "Runaway", youtubeId: "Jg5wkZ-dJXA"},
                away: {name: "School Spirit", youtubeId: "-MOIPnu50O4"},
                winner: Winner.NONE,
              },
              {
                home: {name: "Earfquake", youtubeId: "HmAsUQEFYGI"},
                away: {name: "After the Storm", youtubeId: "9f5zD7ZSNpQ"},
                winner: Winner.NONE,
              },
              {
                home: {name: "What would Meek do?", youtubeId: "hGhC473BCIM"},
                away: {name: "Cash Machine", youtubeId: "9rx0eqQl8wk"},
                winner: Winner.NONE,
              },
              {
                home: {name: "Pink + White", youtubeId: "uzS3WG6__G4"},
                away: {name: "Ms. Jackson", youtubeId: "MYxAiK6VnXw"},
                winner: Winner.NONE,
              },
            ]
          }
        ],
      }
    }
  }

  /**
   * Called on completion of a round
   */
  onRoundComplete = (round: Round) => {
    // is this the final round?
    if (round.matches.length === 1) {
      let match = round.matches[0];
      let winnerName = match.winner === Winner.HOME ? match.home.name : match.away.name;
      this.setState({winner: winnerName});
      return;
    }

    let updateBracket = this.state.bracket;

    // wipe any rounds beyond this since they may no longer be valid
    updateBracket.rounds = updateBracket.rounds.slice(0, round.number); // round numbers are 1 indexed, so it doesn't matter that slice is exclusive

    // create the next round based on the winners from this round
    let nextRound: Round = {
      number: round.number + 1,
      matches: [],
    };

    let songsInNextMatch: Array<Song> = [];
    round.matches.forEach((match: Match) => {
      songsInNextMatch.push(match.winner === Winner.HOME ? match.home : match.away)
    });

    for (let i = 0; i < songsInNextMatch.length - 1; i += 2) {
      nextRound.matches.push({
        home: songsInNextMatch[i],
        away: songsInNextMatch[i + 1],
        winner: Winner.NONE,
      })
    }

    updateBracket.rounds.push(nextRound);
    this.setState({bracket: updateBracket});
  };

  render() {
    return (
      <div>
        <h3>{this.state.bracket.title}</h3>
        <div className={'bracket'}>
          {this.state.bracket.rounds.map((round: Round, index: number) =>
            <RoundComponent key={"round-" + index}
                            round={round}
                            onRoundComplete={this.onRoundComplete}/>)}
          {this.state.winner && <WinnerComponent name={this.state.winner}/>}
        </div>
      </div>
    )
  }
}
