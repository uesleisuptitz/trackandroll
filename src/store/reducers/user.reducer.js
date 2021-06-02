const INITIAL_STATE = {};

const user = (state = INITIAL_STATE, action) => {
  if (action.type === "LOGIN") {
    return { ...state, ...action.user };
  } else if (action.type === "LOGOUT") {
    return INITIAL_STATE;
  } else return state;
};
export default user;
