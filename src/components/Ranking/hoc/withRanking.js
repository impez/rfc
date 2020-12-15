import React from "react";
import { AHPUser, AHPItem, FuzzyMiddleman } from "../../../ahpLogic";
import { connect } from "react-redux";

const withRanking = (WrappedComponent) => {
  let decisionMaker;

  return connect(mapStateToProps)((props) => {
    const [userMetadata, setUserMetadata] = React.useState({});

    const { criterias, variants, criteriasSliders, variantsSliders } = props;

    React.useEffect(() => {
      const metadata = { criteriasRank: {}, variantsRank: {} };

      decisionMaker = new AHPUser({
        criteriaItems: criterias,
        variantItems: variants,
        criteriaRates: criteriasSliders,
        variantRates: variantsSliders,
      });

      for (const criteriaItem of decisionMaker.criteriaItems) {
        const rate = decisionMaker.getVariantRates();
        const variantRate = rate[criteriaItem];
        const variantItemOfAhp = new AHPItem(
          FuzzyMiddleman.getTransformed(variantRate, 100),
          decisionMaker.getVariantItems()
        );

        variantItemOfAhp.initProcess();
        metadata["variantsRank"][criteriaItem] = variantItemOfAhp.getMetadata();
      }

      const itemOfAhp = new AHPItem(
        FuzzyMiddleman.getTransformed(decisionMaker.getCriteriaRates(), 100),
        decisionMaker.criteriaItems
      );

      itemOfAhp.initProcess();
      metadata["criteriasRank"] = itemOfAhp.getMetadata();
      metadata["finalRank"] = {};

      for (const variantItem of decisionMaker.variantItems) {
        let sum = 0;

        for (const criteriaItem of decisionMaker.criteriaItems) {
          let varRank = metadata.variantsRank[
            criteriaItem
          ].weights.filter((item) => Object.keys(item).includes(variantItem));
          varRank = Object.values(varRank[0])[0];

          let criRank = metadata.criteriasRank.weights.filter((item) =>
            Object.keys(item).includes(criteriaItem)
          );

          criRank = Object.values(criRank[0])[0];

          sum += varRank * criRank;
        }

        metadata["finalRank"][variantItem] = sum;
        metadata["expert"] = props.expertName;
        setUserMetadata(metadata);
      }
    }, []);

    return <WrappedComponent {...props} metadata={userMetadata} />;
  });
};

const mapStateToProps = (state) => {
  return state;
};

export default withRanking;
