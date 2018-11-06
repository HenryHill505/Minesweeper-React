import React from "react";
import ReactDOM from "react-dom";

import Board from "./Board";
import "./styles.css";

///////////////////////////////////////////

class InputRow extends React.Component {
  render() {
    return (
      <div>
        <label>{this.props.fieldName}</label>
        <input id={this.props.fieldName + "Box"} />
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: 0,
      rowCount: 0,
      columnCount: 0,
      mineCount: 0
    };
  }

  startGame() {
    let rowVal = document.getElementById("RowsBox").value;
    let columnVal = document.getElementById("ColumnsBox").value;
    let mineVal = document.getElementById("MinesBox").value;
    alert(
      "Rows" + rowVal + "Columns Mines" + columnVal + "MineCount" + mineVal
    );
    this.setState({
      rowCount: rowVal,
      columnCount: columnVal,
      mineCount: mineVal,
      gameState: 1
    });
    alert(
      "Rows" +
        this.state.rowCount +
        "Columns Mines" +
        this.state.columnCount +
        "MineCount" +
        this.state.mineCount
    );
  }

  renderMainMenu() {
    return (
      <div>
        <InputRow fieldName="Rows" />
        <InputRow fieldName="Columns" />
        <InputRow fieldName="Mines" />
        <button onClick={() => this.startGame()}>Start Game</button>
      </div>
    );
  }
  render() {
    if (this.state.gameState === 0) {
      return this.renderMainMenu();
    } else if (this.state.gameState === 1) {
      return (
        <Board
          rowCount={this.state.rowCount}
          columnCount={this.state.columnCount}
          mineCount={this.state.minCount}
        />
      );
    }
  }
}

//=========================================

const rootElement = document.getElementById("root");
ReactDOM.render(<Game />, rootElement);
