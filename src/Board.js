import React from "react";
import Field from "./Field.js";
class Board extends React.Component {
  render() {
    return (
      <Field
        rowCount={this.props.rowCount}
        columnCount={this.props.columnCount}
        mineCount={this.props.mineCount}
      />
    );
  }
}

export default Board;
