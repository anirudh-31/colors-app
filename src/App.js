import React, { Component } from "react";
import Palatte from "./Palatte";
import seed from "./seed";

class App extends Component {
  render() {
    return (
      <div>
        <Palatte palatte={seed[5]} />
      </div>
    );
  }
}

export default App;
