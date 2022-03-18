import React from "react";
import { withStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { SortableElement } from "react-sortable-hoc";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-5.5px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)",
      transition: "all 0.3s ease-in-out",
    },
  },
  boxContent: {
    position: "absolute",
    width: "90%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "rgba(0,0,0,0.5)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

function DraggableColorBox(props) {
  const { color, classes, name, toDelete } = props;
  return (
    <div style={{ backgroundColor: props.color }} className={classes.root}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={toDelete} />
      </div>
    </div>
  );
}

export default withStyles(styles)(SortableElement(DraggableColorBox));
