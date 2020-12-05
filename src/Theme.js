import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        h1: "h2",
        h2: "h2",
        h3: "h2",
        h4: "h2",
        h5: "h2",
        h6: "h2",
        subtitle1: "h2",
        subtitle2: "h2",
        body1: "span",
        body2: "span",
      },
    },
  },
  palette: {
    primary: {
      main: "rgb(35,35,35)",
    },
    secondary: {
      main: "rgb(60,70,80)",
    },
  },
});
