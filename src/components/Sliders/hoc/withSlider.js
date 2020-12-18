import React from "react";
import { makeStyles, Divider } from "@material-ui/core";
import { updateCriteriaSlider, updateVariantSlider } from "../../../actions";
import { connect } from "react-redux";

const CustomDivider = () => {
  return <Divider style={{ opacity: "0.8" }} variant="fullWidth"></Divider>;
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0em auto",
    opacity: "0.65",
    filter: "blur(1px)",
    padding: "1.5em",
    transition: "0.15s opacity, 0.2s filter, 0.1s background-color",
    width: "50%",
    "&:nth-child(1)": {
      marginTop: "2em",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      opacity: "1",
      filter: "blur(0px)",
      "&:nth-child(1)": {
        marginTop: "5em",
      },
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
        <CustomDivider />
        <WrappedComponent
          {...props}
          handleChange={handleChange}
          value={value}
          marks={marks}
          min={min}
          max={max}
        />
        <CustomDivider />
      </div>
    );
  });
};

const mapStateToProps = (state) => {
  return state;
};

export default withSlider;
