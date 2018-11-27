import React from "react";
import Board from "./Board";
import InputRow from "./InputRow";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 0: startment 1: playing 2: won 3: lost
      gameState: 0,
      rowCount: 0,
      columnCount: 0,
      mineCount: 0
    };
  }

  gameLose() {
    this.setState({ gameState: 3 });
  }

  gameRestart() {
    this.setState({ gameState: 0 });
  }

  gameWin() {
    this.setState({ gameState: 2 });
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
        <InputRow fieldName="Rows" defaultValue="5" />
        <InputRow fieldName="Columns" defaultValue="5" />
        <InputRow fieldName="Mines" defaultValue="5" />
        <button onClick={() => this.startGame()}>Start Game</button>
      </div>
    );
  }
  render() {
    if (this.state.gameState === 0) {
      return this.renderMainMenu();
    } else {
      return (
        <div>
          <Board
            rowCount={this.state.rowCount}
            columnCount={this.state.columnCount}
            mineCount={this.state.mineCount}
            gameState={this.state.gameState}
            loseFunction={() => this.gameLose()}
            winFunction={() => this.gameWin()}
            restartFunction={() => this.gameRestart()}
          />
        </div>
      );
    }
  }
}

export default Game;
