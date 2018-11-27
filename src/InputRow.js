import React from "react";

class InputRow extends React.Component {
  render() {
    return (
      <div>
        <label>{this.props.fieldName}</label>
        <input
          type="number"
          min="1"
          defaultValue={this.props.defaultValue}
          id={this.props.fieldName + "Box"}
        />
      </div>
    );
  }
}

export default InputRow;
