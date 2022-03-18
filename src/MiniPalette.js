import React from "react";
import { withStyles } from "@mui/styles";

const styles = {
  root: {
    backgroundColor: "#f5f5f5",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    height: "100%",
    width: "100%",
    transition: "all 250ms ease",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "5px 5px 12px 2px rgba(0,0,0,.5)",
      transform: "scale(1.02)",
    },
  },
  colors: {
    backgroundColor: "#dae1e4",
    height: "150px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0",
    paddigTop: "0.5rem",
    fontSize: "0.9rem",
    position: "relative",
    marginBottom: "15px",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.2rem",
  },
  colorBox: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    marginBottom: "-5px",
  },
};

function MiniPalette(props) {
  const { classes, paletteName, colors, emoji } = props;
  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.colors}>
        {colors.map((color) => (
          <div
            key={color.name}
            className={classes.colorBox}
            style={{ backgroundColor: color.color }}
          />
        ))}
      </div>
      <h5 className={classes.title}>
        {paletteName}
        <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
