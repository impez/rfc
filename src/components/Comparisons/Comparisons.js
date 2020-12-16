import React from "react";
import MultiSlider from "../Sliders/MultiSlider";
import withComparisons from "./hoc/withComparisons";

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const Comparisons = (props) => {
  const [output, setOutput] = React.useState("");

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

  React.useEffect(() => {
    setOutput(shuffle(sliders));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {output}
    </div>
  );
};

export default withComparisons(Comparisons);
