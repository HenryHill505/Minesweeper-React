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
          <img src="./Flag.png" alt="flag" class="flag-image" />
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
    let imageSource;
    let gameState = this.props.gameState;
    if (gameState === 1) {
      imageSource = "./Smiley-Playing.jpg";
    } else if (gameState === 2) {
      imageSource = "./Smiley-Win.jpg";
    } else if (gameState === 3) {
      imageSource = "./Smiley-Dead.jpg";
    }
    return (
      <button id="smiley-button" onClick={() => this.props.restartFunction()}>
        <img src={imageSource} />
      </button>
    );
  }
}

export default Board;
