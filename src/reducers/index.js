import { combineReducers } from "redux";
import cloneDeep from "lodash.clonedeep";

export const nameReducer = (state = "Decydent-1", action) => {
  switch (action.type) {
    case "UPDATE_EXPERT_NAME":
      return action.payload;

    default:
      return state;
  }
};

export const blockReducer = (state = true, action) => {
  switch (action.type) {
    case "BLOCK_EVALUATION":
      return action.payload;
  }
};

export const orientationReducer = (state = "horizontal", action) => {
  switch (action.type) {
    case "UPDATE_SLIDERS_ORIENTATION":
      return action.payload;

    default:
      return state;
  }
};

export const expertsGroupReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_EXPERT_METADATA":
      return [...state, action.payload];

    default:
      return state;
  }
};

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

    case "RESET_SLIDERS":
      return {};

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

    case "RESET_SLIDERS":
      return {};

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
  console.log(action.payload);

  switch (action.type) {
    case "SET_ROUTE":
      return action.payload;

    default:
      return state;
  }
};

export default combineReducers({
  expertName: nameReducer,
  expertsGroup: expertsGroupReducer,
  route: routeReducer,
  orientation: orientationReducer,
  goal: goalReducer,
  criterias: criterionsReducer,
  variants: variantsReducer,
  criteriasSliders: criteriasSlidersReducer,
  variantsSliders: variantsSlidersReducer,
  block: blockReducer,
});
