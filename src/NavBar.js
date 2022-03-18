import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { IconButton, MenuItem, Select, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { withStyles } from "@mui/styles";

const styles = {
  NavBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "6vh",
    width: "100%",
  },
  logo: {
    marginRight: "15px",
    padding: "0 13px",
    fontSize: "22px",
    backgroundColor: "#eceff1",
    fontFamily: "Roboto",
    height: "100%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    textTransform: "lowercase",
    "& > a": {
      textDecoration: "none",
      color: "#000",
    },
  },
  SliderContent: {
    display: " flex",
    alignItems: "center",
  },
  Slider: {
    width: "340px",
    margin: "0 10px",
    display: "inline-block",
  },
  SelectType: {
    marginLeft: "auto",
    marginRight: "1rem",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
  },
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFormat: "hex",
      open: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose() {
    this.setState({
      open: false,
    });
  }
  handleChange(evt) {
    this.setState({
      currentFormat: evt.target.value,
      open: true,
    });
    this.props.handleType(evt.target.value);
  }

  render() {
    const { classes } = this.props;
    return (
      <header className={classes.NavBar}>
        <div className={classes.logo}>
          <Link to="/">Rangrezz</Link>
        </div>
        {this.props.showSlider && (
          <div className={classes.SliderContent}>
            <div className="level-indicator">
              <p>Level: {this.props.level}</p>
            </div>
            <div className={classes.Slider}>
              <Slider
                defaultValue={this.props.level}
                min={100}
                step={100}
                max={900}
                onAfterChange={this.props.changeLevel}
              />
            </div>
          </div>
        )}
        <div className={classes.SelectType}>
          <Select
            autoWidth
            onChange={this.handleChange}
            value={this.state.currentFormat}
            variant="standard"
          >
            <MenuItem value="hex">HEX</MenuItem>
            <MenuItem value="rgb">RGB</MenuItem>
            <MenuItem value="rgba">RGBA</MenuItem>
          </Select>
        </div>
        <Snackbar
          onClose={this.handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={2500}
          message={
            <span id="message">
              Format Changed to {this.state.currentFormat.toUpperCase()}
            </span>
          }
          ContentProps={{
            "aria-describedby": "message",
          }}
          action={[
            <IconButton
              onClick={this.handleClose}
              color="inherit"
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </header>
    );
  }
}

export default withStyles(styles)(NavBar);
