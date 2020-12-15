import React from "react";
import { Grid, Paper, Button, TextField } from "@material-ui/core";
import { updateExpertName, setRoute } from "../../actions";
import { connect } from "react-redux";
import ExpertsAccordion from "./ExpertsAccordion";

const Experts = (props) => {
  const handleTextChange = (e) => {
    props.updateExpertName(e.target.value);
  };

  const handleNewExpert = () => {
    props.setRoute("kryteria");
  };

  return (
    <Grid
      container
      component={Paper}
      style={{ padding: "1em" }}
      justify="center"
      alignItems="center"
    >
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: " center",
          paddingTop: "1em",
          marginBottom: "2em",
          height: "100%",
        }}
      >
        <TextField
          onChange={handleTextChange}
          id="standard-basic"
          label="ID"
          value={props.expertName}
        />
        <Button onClick={handleNewExpert}>nowy ekspert</Button>
      </Grid>
      <Grid item xs={12}>
        <ExpertsAccordion expertsData={props.expertsGroup} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { updateExpertName, setRoute })(
  Experts
);
