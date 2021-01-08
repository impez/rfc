import React, { PureComponent } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { connect } from "react-redux";

const useStyles = makeStyles({});

const convertData = (data) => {
  return { name: data[0], weight: data[1] };
};

const Chart = (props) => {
  const [data, setData] = React.useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    if (props.data) {
      const dataArr = [];

      for (const node of props.data) {
        dataArr.push(convertData(node));
      }

      setData(dataArr);
    }
  }, [props.data]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: 350,
        padding: "1em",
      }}
    >
      {props.showText === true ? (
        <Typography
          style={{ position: "absolute", alignSelf: "center" }}
          variant="overline"
        >
          Goal: {props.goal}
        </Typography>
      ) : (
        ""
      )}
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 35,
            right: 5,
            left: 5,
            bottom: 5,
          }}
          barSize={30}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            cursor={{
              stroke: "black",
              strokeWidth: 1,
              opacity: "0.1",
            }}
          />
          <Legend />
          <Bar dataKey="weight" name={props.label} fill={props.color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Chart);
