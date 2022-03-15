import React, { Component } from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
export default class ColorBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { name, background } = this.props;
    return (
      <CopyToClipboard text={background}>
        <div className="ColorBox" style={{ backgroundColor: background }}>
          <div className="copy-container">
            <div className="content">
              <span>{name}</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
          <span className="see-more">MORE</span>
        </div>
      </CopyToClipboard>
    );
  }
}
