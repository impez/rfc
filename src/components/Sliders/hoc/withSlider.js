import React from "react";
import { makeStyles, Divider } from "@material-ui/core";
import { updateCriteriaSlider, updateVariantSlider } from "../../../actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2.5em auto",
    opacity: "0.75",
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
    const isCriteriaPresent = props.criteria ? true : false;
    const [value, setValue] = React.useState(
      isCriteriaPresent
        ? props.variantsSliders[props.criteria] === undefined
          ? [-1, 0, 1]
          : props.variantsSliders[props.criteria][
              `${props.leftComp}:${props.rightComp}`
            ]
        : Object.keys(props.criteriasSliders).length === 0
        ? [-1, 0, 1]
        : props.criteriasSliders[`${props.leftComp}:${props.rightComp}`]
    );
    const [min, max] = [-8, 8];

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
          value
        );
      else props.updateCriteriaSlider(props.leftComp, props.rightComp, value);
    }, []);

    const handleChange = (e, newValue) => {
      setValue(newValue);

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
