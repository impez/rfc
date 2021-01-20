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
  Snackbar,
  TextField,
  makeStyles,
} from "@material-ui/core";
import SimpleAccordion from "./SimpleAccordion";
import CriteriasList from "./CriteriasList";
import VariantsList from "./VariantsList";
import { connect } from "react-redux";
import {
  updateGoal,
  updateExpertName,
  setRoute,
  start,
  blockEval,
} from "../../actions";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="standard" {...props} />;
}

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
  return ["Ustal cel", "Dobierz kryteria", "Dobierz warianty"];
}

function isEmptyString(str) {
  if (str.replace(/\s/g, "") == "") {
    return true;
  } else return false;
}

function errorMessage(step) {
  switch (step) {
    case 0:
      return "Cel nie może być pusty";

    case 1:
      return "Wpisz co najmniej dwa kryteria";

    case 2:
      return "Wpisz co najmniej dwie alternatywy";

    default:
      break;
  }
}

function Start(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
    if (activeStep === 0 && isEmptyString(props.goal)) {
      setOpen(true);
    } else if (activeStep === 1 && props.criterias.length < 2) {
      setOpen(true);
    } else if (activeStep === 2 && props.variants.length < 2) {
      setOpen(true);
    } else {
      setOpen(false);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

      if (activeStep >= 2) {
        props.setRoute("kryteria");
        props.initCb(true);
        props.start(true);
        props.blockEval(false);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Paper>
      <Grid container>
        <Grid item xs={12} md={6}>
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
                          {activeStep === steps.length - 1 ? "start" : "dalej"}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
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

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMessage(activeStep)}
        </Alert>
      </Snackbar>
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
  start,
  blockEval,
})(Start);
