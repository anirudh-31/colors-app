import React, { Component } from "react";
import ColorBox from "./ColorBox";

import "./Palatte.css";

import NavBar from "./NavBar";

export default class Palatte extends Component {
  constructor(props) {
    super(props);
    this.handleLevel = this.handleLevel.bind(this);
    this.state = {
      level: 500,
    };
  }
  handleLevel(level) {
    this.setState({
      level: level,
    });
  }
  render() {
    return (
      <div className="Palatte">
        {/* Navbar */}{" "}
        <NavBar level={this.state.level} changeLevel={this.handleLevel} />
        <div className="Palatte-colors">
          {/* color boxes */}
          {this.props.palatte.colors[this.state.level].map((color) => (
            <ColorBox background={color.hex} name={color.name} />
          ))}
        </div>
      </div>
    );
  }
}
