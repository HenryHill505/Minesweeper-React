import React from "react";

class MainMenu extends React.Component {
  render() {
    return (
      <div>
        <input name="difficulty" value="easy" />
        <input name="difficulty" value="medium" />
        <input name="difficulty" value="hard" />
        <input name="difficulty" value="custom" />
      </div>
    );
  }
}
