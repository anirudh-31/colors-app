import React, { Component } from "react";
import "./ColorBox.css";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";
import { withStyles } from "@mui/styles";

export default class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.handleCopy = this.handleCopy.bind(this);
    this.state = {
      copied: false,
    };
  }
  handleCopy(e) {
    this.setState(
      {
        copied: true,
      },
      () => {
        setTimeout(() => this.setState({ copied: false }), 1500);
      }
    );
  }
  render() {
    const { name, background, colorId, paletteId, showLink } = this.props;
    const isDarkColor = chroma(background).luminance() <= 0.08;
    const isLightColor = chroma(background).luminance() >= 0.5;
    return (
      <CopyToClipboard text={background} onCopy={this.handleCopy}>
        <div className="ColorBox" style={{ backgroundColor: background }}>
          <div
            className={`copy-overlay ${this.state.copied && "show"}`}
            style={{ background }}
          />
          <div
            className={`copy-msg ${this.state.copied && "show"} ${
              isLightColor && "dark-text"
            }`}
          >
            <h1>Copied!</h1>
            <p>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkColor && "light-text"}>{name}</span>
            </div>
            <button className={`copy-button ${isLightColor && "dark-text"}`}>
              Copy
            </button>
          </div>
          {showLink && (
            <span className={`see-more ${isLightColor && "dark-text"}`}>
              <Link
                to={`/palette/${paletteId}/${colorId}`}
                onClick={(e) => e.stopPropagation()}
              >
                MORE
              </Link>
            </span>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}
