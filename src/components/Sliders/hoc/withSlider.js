import React from "react";
import { makeStyles, Divider } from "@material-ui/core";
import { updateCriteriaSlider, updateVariantSlider } from "../../../actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2.5em auto",
    opacity: "0.85",
    transition: "0.15s opacity, 0.2s filter, 0.1s background-color",
    width: "55%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      opacity: "1",
      filter: "blur(0px)",
    },
    "&:hover": {
      opacity: "1",
      filter: "blur(0px)",
      backgroundColor: "rgba(0,0,0,0.01)",
    },
    "&:active": {
      backgroundColor: "rgba(0,0,0,0.02)",
    },
  },
}));

const withSlider = (WrappedComponent, settings) => {
  const initValue = [-1, 0, 1];

  return connect(mapStateToProps, {
    updateCriteriaSlider,
    updateVariantSlider,
  })((props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(initValue);
    const [min, max] = [-8, 8];
    const isCriteriaPresent = props.criteria ? true : false;

    const marks = [
      {
        value: min,
        label: props.leftComp,
      },
      {
        value: max,
        label: props.rightComp,
      },
    ];

    React.useEffect(() => {
      if (isCriteriaPresent)
        props.updateVariantSlider(
          props.criteria,
          props.leftComp,
          props.rightComp,
          initValue
        );
      else
        props.updateCriteriaSlider(props.leftComp, props.rightComp, initValue);
    }, []);

    const handleChange = (e, newValue) => {
      setValue(newValue);
      console.log(props);

      if (isCriteriaPresent)
        props.updateVariantSlider(
          props.criteria,
          props.leftComp,
          props.rightComp,
          newValue
        );
      else
        props.updateCriteriaSlider(props.leftComp, props.rightComp, newValue);
    };

    return (
      <div className={classes.root}>
        <Divider style={{ opacity: "0.5" }} variant="fullWidth"></Divider>
        <WrappedComponent
          {...props}
          handleChange={handleChange}
          value={value}
          marks={marks}
          min={min}
          max={max}
        />
        <Divider style={{ opacity: "0.5" }} variant="fullWidth"></Divider>
      </div>
    );
  });
};

const mapStateToProps = (state) => {
  return state;
};

export default withSlider;
