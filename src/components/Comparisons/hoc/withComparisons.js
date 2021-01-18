import React from "react";
import {
  Button,
  Paper,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import _ from "lodash";

const pairs = (arr) => {
  const pairs = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      pairs.push([arr[i], arr[j]]);
    }
  }
  return pairs;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "2.5em",
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
    fontSize: "1.15em",
    display: "block",
    width: "100%",
  },
}));

const withComparisons = (WrappedComponent) => {
  return (props) => {
    const classes = useStyles();

    if (props.criterias) {
      const componentsList = props.criterias.map((criteria) => {
        return (
          <Paper className={classes.root} key={criteria}>
            <Typography className={classes.header} variant="caption">
              Oceń preferencję w oparciu o:{" "}
              <Button
                variant="contained"
                disableElevation
                disableFocusRipple
                size="small"
                style={{ cursor: "default" }}
              >
                {criteria}
              </Button>
            </Typography>
            <Divider style={{ marginTop: "1em" }} />
            <WrappedComponent
              {...props}
              pairs={pairs(props.items)}
              criteria={criteria}
            />
          </Paper>
        );
      });

      return <div>{componentsList}</div>;
    } else {
      return (
        <Paper className={classes.root}>
          <Typography className={classes.header} variant="caption">
            Oceń preferencję:
          </Typography>
          <WrappedComponent {...props} pairs={pairs(props.items)} />
        </Paper>
      );
    }
  };
};

export default withComparisons;
