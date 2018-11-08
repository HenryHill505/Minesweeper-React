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
        <Field
          rowCount={this.props.rowCount}
          columnCount={this.props.columnCount}
          mineCount={this.props.mineCount}
          loseFunction={this.props.loseFunction}
          winFunction={this.props.winFunction}
        />
      </div>
    );
  }
}

export default Board;
