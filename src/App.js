import React, { Component } from "react";
import Palatte from "./Palatte";
import seed from "./seed";
import { generatePalette } from "./ColorHelper";

class App extends Component {
  render() {
    return (
      <div>
        <Palatte palatte={generatePalette(seed[4])} />
      </div>
    );
  }
}

export default App;
