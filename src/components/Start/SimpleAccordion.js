import React from "react";
import { makeStyles } from "@material-ui/core";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import { Slider } from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "default",
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion square>
        <AccordionSummary className="accordion" expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading} variant="overline">
            O Analitycznym Procesie Hierarchicznym
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography
            align="justify"
            style={{ padding: "0.6em", textIndent: "3em", opacity: "0.8" }}
          >
            AHP zostało zaproponowane w 1970 roku przez Thomasa L. Saaty’ego,
            amerykańskiego matematyka. Metoda w zamiarze autora miała być prosta
            oraz uniwersalna, pozwalająca ekspertowi-decydentowi
            (ekspert-decydent – jest to jedno z kluczowych pojęć) na swobodne
            podejmowanie zależnych od siebie decyzji, według których docelowo
            otrzymałby ranking, który miałby pomóc w wyborze najlepszej możliwej
            opcji spośród wprowadzonych przez niego wariantów.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion square>
        <AccordionSummary className="accordion" expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading} variant="overline">
            informacje
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography style={{ padding: "0.6em", opacity: "0.8" }}>
            <ul>
              <b>Dyplomant:</b> Michał Walczuk, michal.walczuk@pollub.edu.pl{" "}
              <br />
              <b>Promotor:</b> dr hab. Paweł Karczmarek, prof. uczelni,
              p.karczmarek@pollub.pl
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
