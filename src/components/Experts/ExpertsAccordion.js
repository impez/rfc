import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Paper,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TwoColumnTable from "../Ranking/TwoColumnTable";

const mergeObjects = (arrObj) => Object.assign({}, ...arrObj);

export default function SimpleAccordion({ expertsData }) {
  const accordions = expertsData.map((data) => {
    return (
      <Grid
        key={data.expert}
        item
        xs={12}
        md={expertsData.length <= 1 ? 12 : expertsData.length === 2 ? 6 : 4}
      >
        <Accordion square>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{data.expert}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <TwoColumnTable
              items={data.finalRank}
              type="variants"
            ></TwoColumnTable>
          </AccordionDetails>
        </Accordion>
      </Grid>
    );
  });

  return <Grid container>{accordions}</Grid>;
}
