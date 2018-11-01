import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Cell extends React.Component {
  render() {
    let content;
    if (this.props.isClicked) {
      if (this.props.hasMine) {
        content = "x";
      } else {
        content = this.props.adjacentMines;
      }
    } else {
      if (this.props.isFlagged) {
        content = "F";
      } else {
        content = "H";
      }
    }
    return (
      <button
        className="Cell"
        onClick={() => this.props.onClick()}
        onContextMenu={() => this.props.onContextMenu()}
      >
        {content}
      </button>
    );
  }
}

class Field extends React.Component {
  constructor(props) {
    super(props);

    let mineGrid = placeMines(create2dArray(5, 5, false), 2);
    let sensorGrid = createSensorGrid(mineGrid);
    this.state = {
      isClickedArray: create2dArray(5, 5, false),
      mineArray: mineGrid,
      adjacentsArray: sensorGrid,
      flaggedArray: create2dArray(5, 5, false)
    };
  }

  handleClick(row, column) {
    this.clickCell(row, column);
    if (this.state.mineArray[row][column]) {
      this.loseGame();
    }
  }

  loseGame() {
    alert("You lose");
  }

  handleContextMenu(row, column) {
    let newArray = this.state.flaggedArray.slice();
    newArray[row][column] = !this.state.flaggedArray[row][column];
    this.setState({ flaggedArray: newArray });
  }

  clickCell(row, column) {
    if (this.state.flaggedArray[row][column]) {
    } else if (
      row > -1 &&
      column > -1 &&
      row < this.state.mineArray.length &&
      column < this.state.mineArray[0].length
    ) {
      let newArray = this.state.isClickedArray.slice();
      newArray[row][column] = true;
      this.setState({ isClickedArray: newArray });
      this.openEmptyCells();
    }
  }

  openEmptyCells() {
    let cellsOpened = true;
    while (cellsOpened) {
      cellsOpened = false;
      for (let i = 0; i < this.state.mineArray.length; i++) {
        for (let j = 0; j < this.state.mineArray[0].length; j++) {
          if (
            this.areAdjacentCellsZero(i, j) &&
            !this.state.isClickedArray[i][j] &&
            !this.state.flaggedArray[i][j]
          ) {
            this.clickCell(i, j);
            cellsOpened = true;
          }
        }
      }
    }
  }

  areAdjacentCellsZero(row, column) {
    if (this.isCellZero(row - 1, column - 1)) {
      return true;
    }
    if (this.isCellZero(row, column - 1)) {
      return true;
    }
    if (this.isCellZero(row + 1, column - 1)) {
      return true;
    }
    if (this.isCellZero(row - 1, column)) {
      return true;
    }
    if (this.isCellZero(row + 1, column)) {
      return true;
    }
    if (this.isCellZero(row - 1, column + 1)) {
      return true;
    }
    if (this.isCellZero(row, column + 1)) {
      return true;
    }
    if (this.isCellZero(row + 1, column + 1)) {
      return true;
    }
    return false;
  }

  isCellZero(row, column) {
    if (
      row > -1 &&
      column > -1 &&
      row < this.state.mineArray.length &&
      column < this.state.mineArray[0].length &&
      this.state.isClickedArray[row][column] &&
      this.state.adjacentsArray[row][column] === 0
    ) {
      return true;
    }
    return false;
  }

  // clickCellArea(row, column) {
  //   if (this.state.adjacentsArray[row][column] === 0 ) {
  //     this.clickCell(row - 1, column - 1);
  //     this.clickCell(row, column - 1);
  //     this.clickCell(row + 1, column - 1);
  //     this.clickCell(row - 1, column);
  //     this.clickCell(row + 1, column);
  //     this.clickCell(row - 1, column + 1);
  //     this.clickCell(row, column + 1);
  //     this.clickCell(row + 1, column + 1);
  //   }
  // }

  render() {
    return (
      <div className="field">
        <div className="row">
          {this.renderCell(0, 0)}
          {this.renderCell(0, 1)}
          {this.renderCell(0, 2)}
          {this.renderCell(0, 3)}
          {this.renderCell(0, 4)}
        </div>
        <div className="row">
          {this.renderCell(1, 0)}
          {this.renderCell(1, 1)}
          {this.renderCell(1, 2)}
          {this.renderCell(1, 3)}
          {this.renderCell(1, 4)}
        </div>
        <div className="row">
          {this.renderCell(2, 0)}
          {this.renderCell(2, 1)}
          {this.renderCell(2, 2)}
          {this.renderCell(2, 3)}
          {this.renderCell(2, 4)}
        </div>
        <div className="row">
          {this.renderCell(3, 0)}
          {this.renderCell(3, 1)}
          {this.renderCell(3, 2)}
          {this.renderCell(3, 3)}
          {this.renderCell(3, 4)}
        </div>
        <div className="row">
          {this.renderCell(4, 0)}
          {this.renderCell(4, 1)}
          {this.renderCell(4, 2)}
          {this.renderCell(4, 3)}
          {this.renderCell(4, 4)}
        </div>
      </div>
    );
  }

  renderCell(row, column) {
    return (
      <Cell
        row={row}
        column={column}
        onClick={() => this.handleClick(row, column)}
        onContextMenu={() => this.handleContextMenu(row, column)}
        isClicked={this.state.isClickedArray[row][column]}
        hasMine={this.state.mineArray[row][column]}
        adjacentMines={this.state.adjacentsArray[row][column]}
        isFlagged={this.state.flaggedArray[row][column]}
      />
    );
  }
}

class Board extends React.Component {
  render() {
    return <Field />;
  }
}

//=========================================

const rootElement = document.getElementById("root");
ReactDOM.render(<Board />, rootElement);

function create2dArray(rows, columns, defaultValue) {
  let newArray = Array(rows);

  for (let i = 0; i < rows; i++) {
    newArray[i] = Array(columns).fill(defaultValue);
  }
  return newArray;
}

function placeMines(mineArray, mineCount) {
  const rows = mineArray.length;
  const columns = mineArray[0].length;
  let minesPlaced = 0;

  while (minesPlaced < mineCount) {
    let randomRow = pickRandomNumber(0, rows - 1);
    let randomColumn = pickRandomNumber(0, columns - 1);

    if (mineArray[randomRow][randomColumn] !== true) {
      mineArray[randomRow][randomColumn] = true;
      minesPlaced++;
    }
  }
  return mineArray;
}

function pickRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createSensorGrid(mineArray) {
  let sensorArray = create2dArray(mineArray.length, mineArray[0].length, 0);
  for (let i = 0; i < sensorArray.length; i++) {
    for (let j = 0; j < sensorArray[0].length; j++) {
      sensorArray[i][j] = calculateAdjacentMines(i, j, mineArray);
    }
  }
  return sensorArray;
}

function calculateAdjacentMines(row, column, mineArray) {
  let mineCounter = 0;

  if (checkCellForMine(row - 1, column - 1, mineArray)) {
    mineCounter += 1;
  }
  if (checkCellForMine(row, column - 1, mineArray)) {
    mineCounter += 1;
  }
  if (checkCellForMine(row + 1, column - 1, mineArray)) {
    mineCounter += 1;
  }
  if (checkCellForMine(row - 1, column, mineArray)) {
    mineCounter += 1;
  }
  if (checkCellForMine(row + 1, column, mineArray)) {
    mineCounter += 1;
  }
  if (checkCellForMine(row - 1, column + 1, mineArray)) {
    mineCounter += 1;
  }
  if (checkCellForMine(row, column + 1, mineArray)) {
    mineCounter += 1;
  }
  if (checkCellForMine(row + 1, column + 1, mineArray)) {
    mineCounter += 1;
  }

  return mineCounter;
}

function checkCellForMine(row, column, mineArray) {
  if (
    row > -1 &&
    column > -1 &&
    row < mineArray.length &&
    column < mineArray[0].length
  ) {
    if (mineArray[row][column]) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
