import React from "react";
import { Slider, makeStyles } from "@material-ui/core";
import withSlider from "./hoc/withSlider";

const roundNum = (num) => Math.round(num * 100) / 100;

const MultiSlider = (props) => {
  return (
    <Slider
      value={props.value}
      step={0.01}
      valueLabelDisplay="auto"
      valueLabelFormat={(x) =>
        x >= 0 ? roundNum(x + 1) : roundNum(Math.abs(x) + 1)
      }
      marks={props.marks}
      onChange={props.handleChange}
      min={props.min}
      max={props.max}
    />
  );
};

export default withSlider(MultiSlider);
