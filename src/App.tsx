import React from 'react';
import {connect} from 'react-redux';
import {BuilderContainer} from "./containers/BuilderContainer";
import {BuilderParentStore} from "./models/store/builder-store";
import {Dispatch} from "redux";
import {BracketStore} from "./models/store/store";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {BracketContainer} from "./containers/BracketContainer";

interface AppProps {
  builder: BuilderParentStore,
  dispatch: Dispatch<any>;
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/"
                 render={() => <BuilderContainer builder={this.props.builder} dispatch={this.props.dispatch}/>}/>
          <Route exact path="/:bracketId"
                 render={(props) => <BracketContainer bracketId={props.match.params.bracketId}/>}/>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (store: BracketStore) => ({
  builder: store.builder
});

export default connect(mapStateToProps)(App);
