const setInitialized = (initialized) => {
  return { type: "SET_INITIALIZED", initialized };
};

export const appActions = {
  setInitialized,
};
