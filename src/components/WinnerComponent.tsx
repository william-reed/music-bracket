import * as React from "react";

export interface WinnerProps {
  name: string,
}

export class WinnerComponent extends React.Component<WinnerProps> {
  render() {
    return (
      <div className={'winner'}>
        <h4>Winner</h4>
        <i>{this.props.name}</i>
      </div>
    );
  }
}
