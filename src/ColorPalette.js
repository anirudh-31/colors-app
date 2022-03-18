import React, { Component } from "react";
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default class ColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "hex",
    };
    this._shades = this.gatherShades(this.props.palatte, this.props.colorId);
    this.handleType = this.handleType.bind(this);
  }
  handleType(type) {
    this.setState({
      type: type,
    });
  }
  gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }
    //return all shades of given color
    return shades.slice(1);
  }
  render() {
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[this.state.type]}
        showLink={false}
      />
    ));
    return (
      <div className="ColorPalette Palette">
        <NavBar showSlider={false} handleType={this.handleType} />
        <div className="PaletteColors">
          {colorBoxes}
          <div className="ColorBox goBack">
            <Link
              to={`/palette/${this.props.palatte.id}`}
              className="back-button"
            >
              Go Back
            </Link>
          </div>
        </div>
        <Footer
          name={this.props.palatte.palatteName}
          emoji={this.props.palatte.emoji}
        />
      </div>
    );
  }
}
