import React, { Component } from "react";
import classNames from "classnames";
import { ChromePicker } from "react-color";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@mui/styles";

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  buttons: {
    width: "100%",
    padding: "1rem ",
    marginTop: "1rem !important",
    fontSize: "2rem ",
  },
  colorInput: {
    width: "100%",
    height: "70px",
  },
};
class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currColor: "#E41AF6",
      newColorName: "",
    };
    this.handleName = this.handleName.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isUniqueColorName", (value) => {
      return this.props.addedColors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isUniqueColor", (value) => {
      return this.props.addedColors.every(
        ({ color }) =>
          color.toLowerCase() !== this.state.currColor.toLowerCase()
      );
    });
  }
  addNewColor() {
    var color = {
      color: this.state.currColor,
      name: this.state.newColorName,
    };

    this.props.addColor(color);
    this.setState({
      color: "#e41af6",
      newColorName: "",
    });
  }
  handleName(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  render() {
    const { paletteFull, classes } = this.props;
    return (
      <div>
        <ChromePicker
          color={this.state.currColor}
          onChangeComplete={(color) =>
            this.setState({
              currColor: color.hex,
            })
          }
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.addNewColor}>
          <TextValidator
            placeholder="Color Name"
            margin="normal"
            className={classes.colorInput}
            value={this.state.newColorName}
            onChange={this.handleName}
            name="newColorName"
            variant="filled"
            validators={["required", "isUniqueColorName", "isUniqueColor"]}
            errorMessages={[
              "Enter a color name",
              "Enter a unique color name",
              "This color already exists",
            ]}
          />
          <Button
            className={classes.buttons}
            variant="contained"
            color="primary"
            style={{
              backgroundColor: paletteFull ? "gray" : this.state.currColor,
            }}
            type="submit"
            disabled={paletteFull}
          >
            {paletteFull ? "Palette Full" : "Add color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPicker);
