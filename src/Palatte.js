import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Palatte.css";
export default class Palatte extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Palatte">
        {/* Navbar */}{" "}
        <div className="Palatte-colors">
          {/* color boxes */}
          {this.props.palatte.colors.map((color) => (
            <ColorBox background={color.color} name={color.name} />
          ))}
        </div>
      </div>
    );
  }
}
