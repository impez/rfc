import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";
import SimpleAccordion from "./SimpleAccordion";
import CriteriasList from "./CriteriasList";
import VariantsList from "./VariantsList";
import InputForm from "./CriteriasList";
import { connect } from "react-redux";
import { updateGoal, setRoute } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
  const [goal, setGoal] = React.useState("");
  const steps = getSteps();

  const handleGoalChange = (e) => {
    const updatedGoal = e.target.value;

    setGoal(updatedGoal);
    props.updateGoal(updatedGoal);

    console.log(props);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <TextField
              id="standard-basic"
              label="Wpisz cel"
              value={goal}
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

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
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
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { updateGoal, setRoute })(Start);
