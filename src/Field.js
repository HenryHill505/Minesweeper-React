import React from "react";
import Cell from "./Cell.js";

class Field extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.mineCount);
    let mineGrid = placeMines(
      create2dArray(this.props.rowCount, this.props.columnCount, false),
      this.props.mineCount
    );
    let sensorGrid = createSensorGrid(mineGrid);
    this.state = {
      isClickedArray: create2dArray(
        this.props.rowCount,
        this.props.columnCount,
        false
      ),
      mineArray: mineGrid,
      adjacentsArray: sensorGrid,
      flaggedArray: create2dArray(
        this.props.rowCount,
        this.props.columnCount,
        false
      )
    };
    this.clearedCells = 0;
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
      this.clearedCells += 1;
      this.setState({
        isClickedArray: newArray
      });
      this.openEmptyCells();
    }
  }

  handleClick(row, column) {
    this.clickCell(row, column);

    if (
      this.state.mineArray[row][column] &&
      !this.state.flaggedArray[row][column]
    ) {
      this.loseGame();
    } else if (
      this.clearedCells >=
      this.props.rowCount * this.props.columnCount - this.props.mineCount
    ) {
      this.winGame();
    }
  }

  handleContextMenu(row, column) {
    if (this.state.flaggedArray[row][column]) {
      this.props.removeFlag();
    } else if (!this.state.flaggedArray[row][column]) {
      this.props.placeFlag();
    }
    let newArray = this.state.flaggedArray.slice();
    newArray[row][column] = !this.state.flaggedArray[row][column];
    this.setState({ flaggedArray: newArray });
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

  loseGame() {
    alert("You lose");
    this.props.loseFunction();
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

  winGame() {
    alert("You win");
    this.props.winFunction();
  }

  render() {
    let cellsArray = [];
    for (let i = 0; i < this.props.rowCount; i++) {
      let rowArray = [];
      for (let j = 0; j < this.props.columnCount; j++) {
        rowArray.push(this.renderCell(i, j));
      }
      cellsArray.push(rowArray);
    }
    return (
      <div className="field">
        {cellsArray.map(function(row) {
          return <div className="row">{row}</div>;
        })}
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

////////////////////////

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

export default Field;
