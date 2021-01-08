import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core";

const createData = (item, weight) => {
  return { item, weight };
};

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});

const createRows = (data) => {
  const newRows = [];
  const ranks = data === undefined ? [] : Object.entries(data);

  for (const rank of ranks) {
    newRows.push(createData(rank[0], Math.round(rank[1] * 100) / 100));
  }

  return newRows;
};

const label = (type) => {
  switch (type) {
    case "criterias":
      return { firCol: "Criterion", secCol: "Weight" };

    case "variants":
      return { firCol: "Alternative", secCol: "Weight" };

    case "variants_crs":
      return {
        firCol: "Criterion",
        secCol: (
          <div>
            Consistency Ratio
            <p style={{ fontSize: "0.8em", opacity: "0.50" }}>
              (judging alternatives based on each criterion)
            </p>
          </div>
        ),
      };

    default:
      break;
  }
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.action.hover,
  },
}))(TableRow);

const TwoColumnTable = (props) => {
  const [rows, setRows] = React.useState([]);
  const { type } = props;
  const classes = useStyles();

  React.useEffect(() => {
    setRows(createRows(props.items));
  }, [props.items]);

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>{label(type).firCol}</StyledTableCell>
            <StyledTableCell align="right">
              {label(type).secCol}
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.item}>
              <StyledTableCell component="th" scope="row">
                <Typography variant="overline">{row.item}</Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="overline">{row.weight}</Typography>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TwoColumnTable;
