import React from "react";
import MultiSlider from "../Sliders/MultiSlider";
import withComparisons from "./hoc/withComparisons";

const Comparisons = (props) => {
  const sliders = props.pairs.map((pair) => {
    const [leftComp, rightComp] = [pair[0], pair[1]];
    return (
      <MultiSlider
        leftComp={leftComp}
        rightComp={rightComp}
        criteria={props.criteria}
        key={`${props.criteria}:${leftComp}:${rightComp}`}
      />
    );
  });

  return <div>{sliders}</div>;
};

export default withComparisons(Comparisons);
