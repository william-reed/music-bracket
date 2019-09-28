import * as React from "react";
import {ChangeEvent} from "react";

export interface SizeSelectorProps {
  amount: number,
  onSizeChanged: (newSize: number) => void
}

/**
 * Bracket Size selector.
 *
 * Only allows powers of two.
 */
export class SizeSelector extends React.PureComponent<SizeSelectorProps> {
  // both are inclusive
  readonly MIN_POW = 3;
  readonly MAX_POW = 6;
  readonly OPTIONS =
    Array.from({length: this.MAX_POW - this.MIN_POW + 1}, (x, i) => i + this.MIN_POW)
    .map((i: number) => Math.pow(2, i))
    .map((i: number) => <option value={i} key={i}>{i} songs</option>);


  onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.props.onSizeChanged(Number(event.target.value));
  };

  render() {
    return (
      <select onChange={this.onChange} value={this.props.amount}>
        {this.OPTIONS}
      </select>
    );
  }
}
