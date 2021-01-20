import React from "react";
import withRanking from "./hoc/withRanking";
import TwoColumnTable from "./TwoColumnTable";
import Chart from "./Chart";
import { Grid, Paper, Button } from "@material-ui/core";
import { connect } from "react-redux";
import {
  setRoute,
  updateExpertName,
  resetSliders,
  addExpertMetadata,
  blockEval,
} from "../../actions";

const mergeObjects = (arrObj) => Object.assign({}, ...arrObj);

const Ranking = (props) => {
  const [criteriaWeights, setCriteriaWeights] = React.useState([]);
  const [variantWeights, setVariantWeights] = React.useState([]);
  const [
    variantConsistencyRatios,
    setVariantConsistencyRatios,
  ] = React.useState([]);
  const [allRanks, setAllRanks] = React.useState([]);
  const [crEntries, setCrEntries] = React.useState([]);

  const { finalRank } = props.metadata;

  const handleSave = () => {
    props.setRoute("decydenci");
    props.addExpertMetadata(props.metadata);
    props.updateExpertName(`Decydent-${props.expertsGroup.length + 2}`);
    props.resetSliders();
    props.blockEval(true);
  };

  React.useEffect(() => {
    if (props.metadata.criteriasRank !== undefined) {
      const criteriaRankWeights = props.metadata.criteriasRank.weights;
      const variantConsistencyRatios = [];
      const variantRanks = props.metadata.variantsRank;

      for (const [variant, obj] of Object.entries(variantRanks)) {
        variantConsistencyRatios.push({ [variant]: obj.consistencyRatio });
      }
      variantConsistencyRatios.push({
        "*": props.metadata.criteriasRank.consistencyRatio,
      });

      setCriteriaWeights(mergeObjects(criteriaRankWeights));
      setVariantWeights(finalRank);
      setVariantConsistencyRatios(mergeObjects(variantConsistencyRatios));
    }
  }, [props.metadata]);

  React.useEffect(() => {
    const varEntries = Object.entries(variantWeights);
    const critEntries = Object.entries(criteriaWeights);
    const allEntries = [...varEntries, ...critEntries];
    setCrEntries(Object.entries(variantConsistencyRatios));
    setAllRanks(allEntries);
  }, [criteriaWeights, variantWeights, variantConsistencyRatios]);

  return (
    <Grid container component={Paper} justify="center" alignItems="center">
      <Grid item xs={6} style={{ paddingTop: "1em" }}>
        <Button
          onClick={handleSave}
          style={{ width: "100%" }}
          variant="outlined"
        >
          zapisz
        </Button>
      </Grid>
      <Grid item md={8} xs={12}>
        <Chart data={allRanks} label="Waga" color="#6d848a" showText />
      </Grid>
      <Grid item md={4} xs={12}>
        <TwoColumnTable type="variants" items={variantWeights} />
      </Grid>
      <Grid item md={8} xs={12}>
        <Chart
          data={crEntries}
          label="Współczynnik spójności"
          color="#87a9a8"
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TwoColumnTable type="variants_crs" items={variantConsistencyRatios} />
      </Grid>
      <Grid item md={12} xs={12}>
        <TwoColumnTable type="criterias" items={criteriaWeights} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  setRoute,
  updateExpertName,
  addExpertMetadata,
  resetSliders,
  blockEval,
})(withRanking(Ranking));
