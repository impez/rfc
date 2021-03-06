export const updateExpertName = (expertName) => {
  return {
    type: "UPDATE_EXPERT_NAME",
    payload: expertName,
  };
};

export const slidersOrientation = (orientation) => {
  return {
    type: "UPDATE_SLIDERS_ORIENTATION",
    payload: orientation,
  };
};

export const start = (state) => {
  return {
    type: "START_PROCESS",
    payload: state,
  };
};

export const blockEval = (state) => {
  return {
    type: "BLOCK_EVALUATION",
    payload: state,
  };
};

export const addExpertMetadata = (metadata) => {
  return {
    type: "ADD_EXPERT_METADATA",
    payload: metadata,
  };
};

export const updateCriteriaSlider = (leftComp, rightComp, value) => {
  return {
    type: "UPDATE_CRITERIA_SLIDER",
    payload: { leftComp, rightComp, value },
  };
};

export const updateVariantSlider = (criteria, leftComp, rightComp, value) => {
  return {
    type: "UPDATE_VARIANT_SLIDER",
    payload: { criteria, leftComp, rightComp, value },
  };
};

export const resetSliders = () => {
  return {
    type: "RESET_SLIDERS",
    payload: {},
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
  window.scrollTo(0, 0);
  return {
    type: "SET_ROUTE",
    payload: route,
  };
};

export const updateGoal = (goal) => {
  return {
    type: "UPDATE_GOAL",
    payload: goal,
  };
};
