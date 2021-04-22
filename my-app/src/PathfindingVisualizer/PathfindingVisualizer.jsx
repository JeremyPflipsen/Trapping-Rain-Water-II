import React, { Component } from "react";
import Node from "./Node/Node";

import "./PathfindingVisualizer.css";

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [[]],
    };
  }

  componentDidMount() {
    const nodes = [];
    for (let row = 0; row < this.props.grid.length; row++) {
      const currentRow = [];
      for (let col = 0; col < this.props.grid[0].length; col++) {
        const currentNode = {
          col,
          row,
          isStart: false,
          isFinish: false,
        };
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }
    this.setState({
      grid: nodes
    });
  }

  render() {
    let { grid } = this.state;

    if(this.props.grid.length !== this.state.grid.length || this.props.grid[0].length !== this.state.grid[0].length){
      this.componentDidMount()
      return <div></div> //render will get called again after componentDidMount, so we just return something here in the mean time
    }

    return (
      <>
        <div className = 'grid'>
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { col, row, isStart, isFinish} = node;
                  return (
                    <Node 
                      key = {nodeIdx}
                      col = {col}
                      row = {row}
                      isStart = {isStart}
                      isFinish={isFinish}
                      actualValue={this.props.grid[row][col]}
                      inputValueChange={this.props.inputValueChange}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>);
  }
}
