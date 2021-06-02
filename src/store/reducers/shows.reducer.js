const INITIAL_STATE = {
  shows: [],
  track: [],
  history: [],
};

const shows = (state = INITIAL_STATE, action) => {
  if (action.type === "SET_SHOWS") {
    return {
      ...state,
      shows: [...action.shows].sort((a, b) => a.createdAt - b.createdAt),
    };
  } else if (action.type === "REPLACE_SHOW") {
    let shows = state.shows.map((s) => {
      if (s._id === action.show._id) return action.show;
      else return s;
    });
    return { ...state, shows: shows.sort((a, b) => a.createdAt - b.createdAt) };
  } else if (action.type === "SET_TRACK") {
    return { ...state, track: [...action.track] };
  } else if (action.type === "SET_HISTORY") {
    return {
      ...state,
      history: [...action.history].sort((a, b) => a.createdAt - b.createdAt),
    };
  } else return state;
};

export default shows;
