import React from "react";
import Field from "./Field.js";
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flagCount: this.props.mineCount
    };
  }

  placeFlag() {
    let newCount = this.state.flagCount - 1;
    this.setState({ flagCount: newCount });
  }

  removeFlag() {
    let newCount = this.state.flagCount + 1;
    this.setState({ flagCount: newCount });
  }
  render() {
    return (
      <div>
        <div>
          <span>Flags: {this.state.flagCount}</span>
          {this.renderSmileyButton()}
        </div>
        <Field
          rowCount={this.props.rowCount}
          columnCount={this.props.columnCount}
          mineCount={this.props.mineCount}
          loseFunction={this.props.loseFunction}
          winFunction={this.props.winFunction}
          placeFlag={() => this.placeFlag()}
          removeFlag={() => this.removeFlag()}
        />
      </div>
    );
  }
  renderSmileyButton() {
    let content;
    let gameState = this.props.gameState;
    if (gameState === 1) {
      content = "Playing";
    } else if (gameState === 2) {
      content = "Success";
    } else if (gameState === 3) {
      content = "Failure";
    }
    return <button>{content}</button>;
  }
}

export default Board;
