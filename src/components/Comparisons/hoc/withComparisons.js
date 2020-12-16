import React from "react";
import {
  Button,
  Paper,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";

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
    padding: "2.5em",
  },
  header: {
    margin: "0 auto",
    fontSize: "1.15em",
  },
}));

const withComparisons = (WrappedComponent) => {
  return (props) => {
    const classes = useStyles();

    if (props.criterias) {
      const componentsList = props.criterias.map((criteria) => {
        return (
          <Paper className={classes.root} key={criteria}>
            <Typography
              style={{ position: "absolute" }}
              className={classes.header}
              variant="caption"
            >
              Określ preferencję wariantów pod względem:{" "}
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
          <Typography
            style={{ position: "absolute" }}
            className={classes.header}
            variant="caption"
          >
            Określ preferencję kryteriów:
          </Typography>
          <WrappedComponent {...props} pairs={pairs(props.items)} />
        </Paper>
      );
    }
  };
};

export default withComparisons;
