import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  Paper,
  Grid,
  TextField,
  makeStyles,
} from "@material-ui/core";
import SimpleAccordion from "./SimpleAccordion";
import CriteriasList from "./CriteriasList";
import VariantsList from "./VariantsList";
import { connect } from "react-redux";
import { updateGoal, updateExpertName, setRoute } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "0 auto",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  stepper: {
    width: "95%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));

function getSteps() {
  return ["Ustal cel procesu", "Dobierz kryteria", "Dobierz warianty"];
}

function Start(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleGoalChange = (e) => {
    props.updateGoal(e.target.value);
  };

  const handleTextChange = (e) => {
    props.updateExpertName(e.target.value);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <TextField
              id="standard-basic"
              label="Wpisz cel"
              value={props.goal}
              onChange={handleGoalChange}
            />
          </div>
        );
      case 1:
        return (
          <div>
            <CriteriasList />
          </div>
        );
      case 2:
        return (
          <div>
            <VariantsList />
          </div>
        );
      default:
        return "Unknown step";
    }
  }

  const handleNext = () => {
    if (activeStep >= 2) {
      props.setRoute("kryteria");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Paper style={{ display: "flex" }}>
      <Grid container>
        <Grid item xs={12} md={7}>
          <div className={classes.root}>
            <Stepper
              className={classes.stepper}
              activeStep={activeStep}
              orientation="vertical"
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          wstecz
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1
                            ? "rozpocznij"
                            : "dalej"}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <SimpleAccordion />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            label="ID (Opcjonalnie)"
            size="small"
            onChange={handleTextChange}
            value={props.expertName}
            style={{
              margin: "1em",
            }}
            variant="filled"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  updateGoal,
  updateExpertName,
  setRoute,
})(Start);
