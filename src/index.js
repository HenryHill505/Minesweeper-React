import React from "react";
import ReactDOM from "react-dom";

import Board from "./Board";
import "./styles.css";

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

  gameLose() {
    this.setState({ gameState: 0 });
  }

  gameWin() {
    this.setState({ gameState: 0 });
  }

  startGame() {
    let rowVal = parseInt(document.getElementById("RowsBox").value);
    let columnVal = parseInt(document.getElementById("ColumnsBox").value);
    let mineVal = parseInt(document.getElementById("MinesBox").value);

    this.setState({
      rowCount: rowVal,
      columnCount: columnVal,
      mineCount: mineVal,
      gameState: 1
    });
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
          mineCount={this.state.mineCount}
          loseFunction={() => this.gameLose()}
          winFunction={() => this.gameWin()}
        />
      );
    }
  }
}

//=========================================

const rootElement = document.getElementById("root");
ReactDOM.render(<Game />, rootElement);
