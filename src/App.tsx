import React from 'react';
import {connect} from 'react-redux';
import {BuilderContainer} from "./containers/BuilderContainer";
import {BuilderParentStore} from "./models/store/builder-store";
import {Dispatch} from "redux";
import {BracketStore} from "./models/store/store";

interface AppProps {
  builder: BuilderParentStore,
  dispatch: Dispatch<any>;
}

class App extends React.Component<AppProps> {
  render() {
    return (<BuilderContainer builder={this.props.builder} dispatch={this.props.dispatch}/>);
  }
}

const mapStateToProps = (store: BracketStore) => ({
  builder: store.builder
});

export default connect(mapStateToProps)(App);
