import React from "react";

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
        content = <img src="./Flag.png" alt="flag" class="flag-image" />;
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

export default Cell;
