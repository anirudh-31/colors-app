import React, { Component } from "react";
import { withStyles } from "@mui/styles";

const styles = {
  Footer: {
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    height: "4vh",
    justifyContent: "flex-end",
    fontWeight: "bold",
    fontSize: "1rem",
    "& > span": {
      fontSize: "1.2rem",
      margin: "0 1rem",
    },
  },
};

class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.classes.Footer}>
        <p>{this.props.name}</p>
        <span>{this.props.emoji}</span>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
