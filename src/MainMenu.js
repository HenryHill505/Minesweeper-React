import React from "react";

class MainMenu extends React.Component {
  render() {
    return (
      <div>
        <div>
          <input type="radio" name="difficulty" value="easy" /> Easy
        </div>
        <div>
          <input type="radio" name="difficulty" value="medium" /> Medium
        </div>
        <div>
          <input type="radio" name="difficulty" value="hard" /> Hard
        </div>
        <div>
          <input
            type="radio"
            name="difficulty"
            value="custom"
            id="customRadio"
          />
          Custom
        </div>
      </div>
    );
  }
}

export default MainMenu;
