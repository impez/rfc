import React from "react";
import { Slider, Tooltip } from "@material-ui/core";
import withSlider from "./hoc/withSlider";

const roundNum = (num) => Math.round(num * 100) / 100;

const ValueLabelComponent = (props) => {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
};

const MultiSlider = (props) => {
  return (
    <Slider
      value={props.value}
      step={0.01}
      valueLabelFormat={(x) =>
        x >= 0 ? roundNum(x + 1) : roundNum(Math.abs(x) + 1)
      }
      ValueLabelComponent={ValueLabelComponent}
      marks={props.marks}
      valueLabelDisplay="on"
      orientation="horizontal"
      onChange={props.handleChange}
      min={props.min}
      max={props.max}
    />
  );
};

export default withSlider(MultiSlider);
