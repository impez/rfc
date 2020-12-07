import React from "react";
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  header: {
    textAlign: "center",
    fontSize: "1.7em",
    margin: "0 auto",
    width: "80%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      fontSize: "1.25em",
    },
    padding: "1em",
  },
  divider: {
    width: "80%",
    margin: "0 auto",
  },
}));

const Comparisons = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Paper square>
          <Typography className={classes.header} variant="h1">
            Zaznacz preferowane alternatywy
          </Typography>
          <Divider className={classes.divider} />
          sdfgdsfg
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Comparisons;
