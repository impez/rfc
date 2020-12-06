import { combineReducers } from "redux";

export const goalReducer = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_GOAL":
      return action.payload;

    default:
      return state;
  }
};

export const criterionsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_CRITERION":
      return [...state, action.payload];

    case "REMOVE_CRITERION":
      return state.filter((item) => item !== action.payload);

    default:
      return state;
  }
};

export const variantsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_VARIANT":
      return [...state, action.payload];

    case "REMOVE_CRITERION":
      return state.filter((item) => item !== action.payload);

    default:
      return state;
  }
};

export const routeReducer = (state = "start", action) => {
  switch (action.type) {
    case "SET_ROUTE":
      return action.payload;

    default:
      return state;
  }
};

export default combineReducers({
  route: routeReducer,
  goal: goalReducer,
  criterias: criterionsReducer,
  variants: variantsReducer,
});
