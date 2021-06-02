const INITIAL_STATE = {};

const show = (state = INITIAL_STATE, action) => {
  if (action.type === "SET_SHOW") {
    return { ...action.show };
  } else return state;
};
export default show;
