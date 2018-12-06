import React from "react";
import Board from "./Board";
import InputRow from "./InputRow";
import MainMenu from "./MainMenu";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 0: startment 1: playing 2: won 3: lost
      gameState: 0,
      rowCount: 0,
      columnCount: 0,
      mineCount: 0,
      customOptions: false
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

  disableCustomOptions() {
    this.setState({ customOptions: false });
  }

  enableCustomOptions() {
    this.setState({ customOptions: true });
  }

  setGameParameters(rows, columns, mines) {
    this.setState({
      rowCount: rows,
      columnCount: columns,
      mineCount: mines
    });
  }

  startGame() {
    let difficulty = document.querySelector('input[name="difficulty"]:checked')
      .value;

    switch (difficulty) {
      case "easy":
        this.setGameParameters(5, 5, 5);
        break;
      case "medium":
        this.setGameParameters(7, 7, 7);
        break;
      case "hard":
        this.setGameParameters(10, 10, 10);
        break;
      case "custom":
        let rows = parseInt(document.getElementById("RowsBox").value);
        let columns = parseInt(document.getElementById("ColumnsBox").value);
        let mines = parseInt(document.getElementById("MinesBox").value);
        this.setGameParameters(rows, columns, mines);
        break;
    }
    this.setState({
      gameState: 1,
      renderCustomMenu: false
    });
  }

  renderMainMenu() {
    if (!this.state.customOptions) {
      return (
        <div>
          <MainMenu
            enableCustomOptions={() => this.enableCustomOptions()}
            disableCustomOptions={() => this.disableCustomOptions()}
          />
          <button onClick={() => this.startGame()}>Start Game</button>
        </div>
      );
    } else {
      return (
        <div>
          <MainMenu
            enableCustomOptions={() => this.enableCustomOptions()}
            disableCustomOptions={() => this.disableCustomOptions()}
          />
          <InputRow fieldName="Rows" defaultValue="5" />
          <InputRow fieldName="Columns" defaultValue="5" />
          <InputRow fieldName="Mines" defaultValue="5" />
          <button onClick={() => this.startGame()}>Start Game</button>
        </div>
      );
    }
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
