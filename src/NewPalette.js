import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChromePicker } from "react-color";
import Button from "@mui/material/Button";
import DraggableColorBox from "./DraggableColorBox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
const drawerWidth = 400;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
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
});
ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
  if (value !== this.state.user.password) {
    return false;
  }
  return true;
});
class NewPalette extends Component {
  constructor(props) {
    super(props);
    this.handleName = this.handleName.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.saveNewPalette = this.saveNewPalette.bind(this);
    this.clearPalette = this.clearPalette.bind(this);

    this.state = {
      open: false,
      currColor: "#000",
      newName: "",
      addedColors: [],
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
  saveNewPalette() {
    let name = "New Test Palette";
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
      newName: evt.target.value,
    });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  addNewColor() {
    const newClr = { color: this.state.currColor, name: this.state.newName };
    this.setState({
      addedColors: [...this.state.addedColors, newClr],
      currColor: "#000",
      newName: "",
    });
  }

  render() {
    const { classes } = this.props;
    const { open, currColor } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={this.saveNewPalette}
            >
              Save Palette
            </Button>
          </Toolbar>
        </AppBar>
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
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.clearPalette}
            >
              Clear Palette
            </Button>
            <Button variant="contained" color="primary">
              Random Color
            </Button>
          </div>
          <ChromePicker
            color={currColor}
            onChangeComplete={(color) =>
              this.setState({
                currColor: color.hex,
              })
            }
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
              value={this.state.newName}
              onChange={this.handleName}
              validators={["required", "isUniqueColorName", "isUniqueColor"]}
              errorMessages={[
                "Enter a color name",
                "Enter a unique color name",
                "This color already exists",
              ]}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: this.state.currColor }}
              type="submit"
            >
              Add Color
            </Button>
          </ValidatorForm>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          {this.state.addedColors.map((color) => (
            <DraggableColorBox color={color.color} name={color.name} />
          ))}
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPalette);
