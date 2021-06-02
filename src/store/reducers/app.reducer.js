const INITIAL_STATE = {
  initialized: false,
};

const app = (state = INITIAL_STATE, action) => {
  if (action.type === "SET_INITIALIZED") {
    return { ...state, initialized: action.initialized };
  } else return state;
};
export default app;
