import React from 'react';
import {connect} from 'react-redux';
import {BuilderContainer} from "./containers/BuilderContainer";
import {BuilderParentStore} from "./models/store/builder-store";
import {Dispatch} from "redux";
import {DataStore} from "./models/store/store";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {BracketContainer} from "./containers/BracketContainer";
import {BracketParentStore} from "./models/store/bracket-store";

interface AppProps {
  bracket: BracketParentStore,
  builder: BuilderParentStore,
  dispatch: Dispatch<any>,
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/"
                 render={() => <BuilderContainer builder={this.props.builder} dispatch={this.props.dispatch}/>}/>
          <Route exact path="/:bracketId"
                 render={(props) => <BracketContainer bracketId={props.match.params.bracketId} bracket={this.props.bracket} dispatch={this.props.dispatch}/>}/>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (store: DataStore) => ({
  builder: store.builder,
  bracket: store.bracket,
});

export default connect(mapStateToProps)(App);
