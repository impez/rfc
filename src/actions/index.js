export const updateGoal = (goal) => {
  return {
    type: "UPDATE_GOAL",
    payload: goal,
  };
};

export const addCriterion = (criterion) => {
  return {
    type: "ADD_CRITERION",
    payload: criterion,
  };
};

export const removeCriterion = (criterion) => {
  return {
    type: "REMOVE_CRITERION",
    payload: criterion,
  };
};

export const addVariant = (variant) => {
  return {
    type: "ADD_VARIANT",
    payload: variant,
  };
};

export const removeVariant = (variant) => {
  return {
    type: "REMOVE_VARIANT",
    payload: variant,
  };
};

export const setRoute = (route) => {
  return {
    type: "SET_ROUTE",
    payload: route,
  };
};
