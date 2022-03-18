import React, { Component } from "react";
import Palatte from "./Palatte";
import PaletteList from "./PaletteList";
import seed from "./seed";
import { generatePalette } from "./ColorHelper";
import { Switch, Route, Link } from "react-router-dom";
import ColorPalette from "./ColorPalette";
import NewPalette from "./NewPalette";

class App extends Component {
  constructor() {
    super();
    this.state = {
      palettes: seed,
    };
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }
  savePalette(newPalette) {
    this.setState({
      palettes: [...this.state.palettes, newPalette],
    });
  }
  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    });
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (
            <NewPalette savePalette={this.savePalette} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList palettes={this.state.palettes} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={(routerProps) => (
            <Palatte
              palatte={generatePalette(
                this.findPalette(routerProps.match.params.id)
              )}
            />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <ColorPalette
              colorId={routeProps.match.params.colorId}
              palatte={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
