import React from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  makeStyles,
  useMediaQuery,
  Typography,
} from "@material-ui/core";
import {
  PlayArrow as StartIcon,
  TuneTwoTone as ComparisonsIcon,
  EqualizerSharp as RankingIcon,
  GroupSharp as ExpertsIcon,
} from "@material-ui/icons";
import TabPanel from "./components/Navigation/TabPanel";

import Start from "./components/Start/Start";

const menuItems = ["start", "kryteria", "warianty", "ranking", "decydenci"];

const App = () => {
  const [route, setRoute] = React.useState("start");
  const [tabsVariant, setTabsVariant] = React.useState("fullWidth");

  const matches = useMediaQuery("(min-width:900px)");

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
    setTabsVariant(newVariant);
  });

  return (
    <div className="main">
      <AppBar position="static">
        <Tabs value={route} variant={tabsVariant} scrollButtons="on">
          {tabItems}
        </Tabs>
      </AppBar>

      <TabPanel value={route} index="start">
        <Start />
      </TabPanel>
    </div>
  );
};

export default App;
