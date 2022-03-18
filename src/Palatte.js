import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Footer from "./Footer";

import "./Palette.css";

import NavBar from "./NavBar";

class Palatte extends Component {
  constructor(props) {
    super(props);
    this.handleLevel = this.handleLevel.bind(this);
    this.handleType = this.handleType.bind(this);
    this.state = {
      level: 500,
      type: "hex",
    };
  }
  handleType(type) {
    this.setState({
      type: type,
    });
  }
  handleLevel(level) {
    this.setState({
      level: level,
    });
  }
  render() {
    const { classes, palatte } = this.props;
    return (
      <div className="Palette">
        {/* Navbar */}{" "}
        <NavBar
          showSlider={true}
          level={this.state.level}
          changeLevel={this.handleLevel}
          handleType={this.handleType}
        />
        <div className="PaletteColors">
          {/* color boxes */}
          {palatte.colors[this.state.level].map((color) => (
            <ColorBox
              key={color.id}
              paletteId={palatte.id}
              colorId={color.id}
              background={color[this.state.type]}
              name={color.name}
              showLink={true}
            />
          ))}
        </div>
        <Footer name={palatte.paletteName} emoji={palatte.emoji} />
      </div>
    );
  }
}

export default Palatte;
