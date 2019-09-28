import * as React from "react";
import './BracketContainer.css'
import {RoundComponent} from "../components/bracket/RoundComponent";
import {WinnerComponent} from "../components/bracket/WinnerComponent";
import {Dispatch} from "redux";
import {BracketParentStore, MatchStore, RoundStore} from "../models/store/bracket-store";
import {Winner} from "../models/models";
import {setBaseData, setLoading, setWinner} from "../actions/bracket/bracket-actions";
import {getBracket} from "../api";

interface BracketProps {
  bracketId: string,
  bracket: BracketParentStore,
  dispatch: Dispatch
}

export class BracketContainer extends React.Component<BracketProps> {

  componentDidMount() {
    let dispatch = this.props.dispatch;

    dispatch(setLoading(true));
    // fetch bracket
    getBracket("some bracket id")
      .then((data) => {
        dispatch(setLoading(false));
        dispatch(setBaseData(data));
      })
  }

  render() {
    let bracket = this.props.bracket.bracket;
    let dispatch = this.props.dispatch;

    if (this.props.bracket.loading) {
      return <p>Loading...</p>
    }
    if (this.props.bracket.invalid) {
      return <p>Bracket with ID <strong>{this.props.bracketId}</strong> doesn't exist</p>
    }

    return (
      <div>
        <h3>{bracket.title}</h3>
        <div className={'bracket'}>
          {bracket.rounds.map((roundStore: RoundStore, index: number) =>
            <RoundComponent key={"round-" + index}
                            round={
                              {
                                number: roundStore.number,
                                matches: roundStore.matches.map((matchStore: MatchStore) => ({
                                  home: bracket.songs[matchStore.homeIndex],
                                  away: bracket.songs[matchStore.awayIndex],
                                  winner: matchStore.winner,
                                })),
                              }}
                            onMatchWon={(match: number, winner: Winner) => dispatch(setWinner(roundStore.number, match, winner))}/>
          )}
          {!isNaN(this.props.bracket.bracket.winner as number) &&
          <WinnerComponent name={bracket.songs[this.props.bracket.bracket.winner!].title}/>}
        </div>
      </div>
    )
  }
}
