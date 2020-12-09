import React from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import {
  PlayArrow as StartIcon,
  TuneTwoTone as ComparisonsIcon,
  EqualizerSharp as RankingIcon,
  GroupSharp as ExpertsIcon,
} from "@material-ui/icons";
import TabPanel from "./components/Navigation/TabPanel";
import Start from "./components/Start/Start";
import Comparisons from "./components/Comparisons/Comparisons";
import Ranking from "./components/Ranking/Ranking";
import { setRoute } from "./actions";
import { connect } from "react-redux";

const menuItems = ["start", "kryteria", "warianty", "ranking", "decydenci"];

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
}));

const App = (props) => {
  const { route, setRoute, criterias, variants } = props;
  const matches = useMediaQuery("(min-width:900px)");
  const classes = useStyles();

  const [padding, setPadding] = React.useState(matches ? 3 : 0);
  const [tabsVariant, setTabsVariant] = React.useState(
    matches ? "fullWidth" : "scrollable"
  );

  const setIcon = (label, size) => {
    switch (label) {
      case "start":
        return <StartIcon fontSize={size} />;
      case "warianty":
      case "kryteria":
        return <ComparisonsIcon fontSize={size} />;
      case "ranking":
        return <RankingIcon fontSize={size} />;
      case "decydenci":
        return <ExpertsIcon fontSize={size} />;
      default:
        break;
    }
  };

  const tabItems = menuItems.map((label) => {
    const isBigDisplay = tabsVariant === "fullWidth" ? true : false;

    return (
      <Tab
        value={label}
        label={isBigDisplay ? label : ""}
        key={label}
        icon={setIcon(label, isBigDisplay ? "default" : "large")}
      />
    );
  });

  React.useEffect(() => {
    const newVariant = matches ? "fullWidth" : "scrollable";
    const padding = newVariant === "fullWidth" ? 3 : 0;
    setTabsVariant(newVariant);
    setPadding(padding);
  });

  const handleChange = (event, newRoute) => {
    setRoute(newRoute);
  };

  return (
    <div className="main">
      <AppBar position="static">
        <Tabs
          value={route}
          variant="scrollable"
          scrollButtons="on"
          onChange={handleChange}
          classes={classes}
        >
          {tabItems}
        </Tabs>
      </AppBar>

      <TabPanel value={route} index="start" padding={padding}>
        <Start />
      </TabPanel>

      <TabPanel value={route} index="kryteria" padding={padding}>
        <Comparisons items={criterias} />
        <Button
          fullWidth
          size="large"
          variant="contained"
          style={{ margin: "0.5em 0" }}
          onClick={() => setRoute("warianty")}
        >
          Dalej
        </Button>
      </TabPanel>

      <TabPanel value={route} index="warianty" padding={padding}>
        <Comparisons items={variants} criterias={criterias} />
        <Button
          fullWidth
          size="large"
          variant="contained"
          style={{ margin: "0.5em 0" }}
          onClick={() => setRoute("ranking")}
        >
          Zakończ
        </Button>
      </TabPanel>

      <TabPanel value={route} index="ranking" padding={padding}>
        <Ranking />
      </TabPanel>

      <TabPanel value={route} index="decydenci" padding={padding}></TabPanel>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { setRoute })(App);
