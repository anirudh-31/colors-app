import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChromePicker } from "react-color";
import Button from "@mui/material/Button";
import DraggableColorBox from "./DraggableColorBox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import Nav from "./Nav";
import ColorPicker from "./ColorPickerForm";
const drawerWidth = 400;

const styles = (theme) => ({
  root: {
    display: "flex",
  },

  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    height: "100%",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    width: "100%",
  },
  button: {
    width: "50%",
  },
});

class NewPalette extends Component {
  static defaultProps = {
    maxColors: 20,
  };
  constructor(props) {
    super(props);

    this.addNewColor = this.addNewColor.bind(this);
    this.saveNewPalette = this.saveNewPalette.bind(this);
    this.clearPalette = this.clearPalette.bind(this);
    this.deleteColor = this.deleteColor.bind(this);
    this.genColor = this.genColor.bind(this);

    this.state = {
      open: false,
      currColor: "#E41AF6",
      newColorName: "",
      addedColors: this.props.palettes[0].colors,
    };
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isUniqueColorName", (value) => {
      return this.state.addedColors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isUniqueColor", (value) => {
      return this.state.addedColors.every(
        ({ color }) =>
          color.toLowerCase() !== this.state.currColor.toLowerCase()
      );
    });
  }
  deleteColor(name) {
    let modifiedColors = this.state.addedColors.filter(
      (color) => color.name !== name
    );
    this.setState({
      addedColors: modifiedColors,
    });
  }
  saveNewPalette(name) {
    const currPalette = {
      paletteName: name,
      id: name.toLowerCase().replace(/ /g, "-"),
      emoji: "uk",
      colors: this.state.addedColors,
    };
    this.props.savePalette(currPalette);
    this.props.history.push("/");
  }
  clearPalette() {
    this.setState({
      addedColors: [],
    });
  }
  handleName(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  addNewColor(color) {
    const newClr = color;
    this.setState({
      addedColors: [...this.state.addedColors, newClr],
      currColor: "#000",
      newColorName: "",
    });
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ addedColors }) => ({
      addedColors: arrayMove(addedColors, oldIndex, newIndex),
    }));
  };

  genColor() {
    const allColors = this.props.palettes.map((p) => p.colors).flat();
    var rand = Math.floor(Math.random() * allColors.length);
    const col = allColors[rand];
    this.setState({
      addedColors: [...this.state.addedColors, col],
    });
  }
  render() {
    const paletteFull = this.state.addedColors.length === this.props.maxColors;
    const { classes } = this.props;
    const { open, currColor } = this.state;

    return (
      <div className={classes.root}>
        <Nav
          open={this.state.open}
          palettes={this.props.palettes}
          savePalette={this.saveNewPalette}
          handleDrawer={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={this.clearPalette}
              >
                Clear Palette
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={this.genColor}
                disabled={paletteFull}
              >
                Random Color
              </Button>
            </div>
            <ColorPicker
              addColor={this.addNewColor}
              paletteFull={paletteFull}
              addedColors={this.state.addedColors}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          <DraggableColorList
            onSortEnd={this.onSortEnd}
            axis="xy"
            colors={this.state.addedColors}
            deleteColor={this.deleteColor}
          />
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPalette);
