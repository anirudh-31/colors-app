import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./NavBar.css";
export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header className="NavBar">
        <div className="logo">
          <a href="/">Colorama</a>
        </div>
        <div className="slider-content">
          <div className="level-indicator">
            <p>Level: {this.props.level}</p>
          </div>
          <div className="slider">
            <Slider
              defaultValue={this.props.level}
              min={100}
              step={100}
              max={900}
              onAfterChange={this.props.changeLevel}
            />
          </div>
        </div>
      </header>
    );
  }
}
