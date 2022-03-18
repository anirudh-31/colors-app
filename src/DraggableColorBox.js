import React from "react";
import { withStyles } from "@mui/styles";

const styles = {
  root: {
    height: "25%",
    width: "20%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    // marginBottom: "-1px",
  },
};

function DraggableColorBox(props) {
  const { color, classes, name } = props;
  return (
    <div style={{ backgroundColor: props.color }} className={classes.root}>
      {name}
    </div>
  );
}

export default withStyles(styles)(DraggableColorBox);
