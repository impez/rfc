import React from "react";
import { makeStyles } from "@material-ui/core";
import { updateCriteriaSlider, updateVariantSlider } from "../../../actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2.5em auto",
    width: "55%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
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
        <WrappedComponent
          {...props}
          handleChange={handleChange}
          value={value}
          marks={marks}
          min={min}
          max={max}
        />
      </div>
    );
  });
};

const mapStateToProps = (state) => {
  return state;
};

export default withSlider;
