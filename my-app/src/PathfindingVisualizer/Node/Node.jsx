import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { col, row, isFinish, isStart, actualValue, className } = this.props;

    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : "";
    return (
      <input
        id = {`node-${row}-${col}`}
        value = {actualValue}
        type="number"
        className={`node ${extraClassName} ${className}`}
        placeholder={actualValue}
        onInput={(event) => this.props.inputValueChange(row,col,event)}
      ></input>
    )
  }
}

export const DEFAULT_NODE = {
  row: 0,
  col: 0,
};
