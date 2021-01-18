import React from "react";
import withList from "./hoc/withList";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";
import {
  IconButton,
  InputAdornment,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { addCriterion, removeCriterion } from "../../actions";

const useStyles = makeStyles((theme) => ({
  margin: {
    width: "50%",
    margin: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  item: {
    width: "75%",
    backgroundColor: "rgb(20,20,20, 0.02), borderRadius: 3px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));

function CriteriasList(props) {
  const classes = useStyles();

  const listItems = props.items.map((item) => {
    return (
      <ListItem className={classes.item} key={item}>
        <ListItemText primary={item} style={{ cursor: "default" }} />
        <ListItemIcon>
          <IconButton
            onClick={() => {
              props.onItemRemove(item);
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
        </ListItemIcon>
      </ListItem>
    );
  });

  return (
    <div>
      <TextField
        className={classes.margin}
        label="Wpisz kryterium"
        value={props.text}
        onChange={props.onTextChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={props.onItemAdd} size="small">
                <AddIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <List dense>{listItems}</List>
    </div>
  );
}

export default withList(CriteriasList, {
  update: [addCriterion, removeCriterion],
  type: "criterias",
});
