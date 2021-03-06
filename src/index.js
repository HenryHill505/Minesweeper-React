import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import Game from "./Game";

//=========================================

const rootElement = document.getElementById("root");
ReactDOM.render(<Game />, rootElement);

document.oncontextmenu = function() {
  return false;
};
