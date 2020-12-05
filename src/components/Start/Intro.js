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
import AddIcon from "@material-ui/icons/Add";
import ItemsList from "./ItemsList";
import InputForm from "./InputForm";

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
}));

function getSteps() {
  return ["Ustal cel procesu", "Dobierz kryteria", "Dobierz warianty"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <div>
          <TextField id="standard-basic" label="Wpisz cel" />
        </div>
      );
    case 1:
      return (
        <div>
          <InputForm />
          <ItemsList />
        </div>
      );
    case 2:
      return (
        <div>
          Ostatnim etapem jest wpisanie dostępnych możliwych wariantów.
          <InputForm />
        </div>
      );
    default:
      return "Unknown step";
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
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
      <Grid Item xs={12} md={8}>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} orientation="vertical">
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
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <SimpleAccordion />
      </Grid>
    </Grid>
  );
}
