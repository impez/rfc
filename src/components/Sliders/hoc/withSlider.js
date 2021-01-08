import React from "react";
import { makeStyles, Divider } from "@material-ui/core";
import { updateCriteriaSlider, updateVariantSlider } from "../../../actions";
import { connect } from "react-redux";
import cloneDeep from "lodash.clonedeep";

const CustomDivider = () => {
  return <Divider style={{ opacity: "0.8" }} variant="fullWidth"></Divider>;
};

const isEmptyObject = (obj) => {
  if (obj === undefined) return true;
  return Object.entries(obj).length === 0 ? true : false;
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
    const wasSliderInitialized = props.savedValue === undefined ? false : true;
    const [value, setValue] = React.useState(
      wasSliderInitialized ? props.savedValue : [-1, 0, 1]
    );
    const [min, max] = [-8, 8];
    const valueRef = React.useRef();

    React.useEffect(() => {
      valueRef.current = value;
    }, [value]);

    React.useEffect(() => {
      const {
        criteria,
        leftComp,
        rightComp,
        updateCriteriaSlider,
        updateVariantSlider,
      } = props;
      const isCriteriaPresent = criteria === undefined ? false : true;

      return () => {
        if (isCriteriaPresent)
          updateVariantSlider(criteria, leftComp, rightComp, valueRef.current);
        else {
          updateCriteriaSlider(leftComp, rightComp, valueRef.current);
        }
      };
    }, []);

    const handleChange = (e, newValue) => {
      setValue(newValue);
    };

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

const mapStateToProps = (state, ownProps) => {
  const { leftComp, rightComp, criteria } = ownProps;
  const wasInitialized = criteria
    ? state.variantsSliders[criteria]
      ? true
      : false
    : true;
  const comp = `${leftComp}:${rightComp}`;
  const savedValue = wasInitialized
    ? criteria
      ? state.variantsSliders[criteria][comp]
      : state.criteriasSliders[comp]
    : undefined;

  return {
    savedValue: savedValue,
  };
};

export default withSlider;
