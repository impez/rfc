import { combineReducers } from "redux";
import cloneDeep from "lodash.clonedeep";

export const goalReducer = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_GOAL":
      return action.payload;

    default:
      return state;
  }
};

export const criteriasSlidersReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_CRITERIA_SLIDER":
      const cloneState = { ...state };
      const { leftComp, rightComp, value } = action.payload;
      const pair = `${leftComp}:${rightComp}`;

      cloneState[pair] = value;
      return cloneState;

    default:
      return state;
  }
};

export const variantsSlidersReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_VARIANT_SLIDER":
      const cloneState = cloneDeep(state);
      const { criteria, leftComp, rightComp, value } = action.payload;
      const pair = `${leftComp}:${rightComp}`;

      if (!cloneState[criteria]) cloneState[criteria] = {};

      cloneState[criteria][pair] = value;
      return cloneState;

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

    case "REMOVE_VARIANT":
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
  criteriasSliders: criteriasSlidersReducer,
  variantsSliders: variantsSlidersReducer,
});
