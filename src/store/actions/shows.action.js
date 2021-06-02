const setShows = (shows) => {
  return { type: "SET_SHOWS", shows };
};
const replaceShow = (show) => {
  return { type: "REPLACE_SHOW", show };
};
const setTrack = (track) => {
  return { type: "SET_TRACK", track };
};
const setHistory = (history) => {
  return { type: "SET_HISTORY", history };
};

export const showsActions = {
  setShows,
  replaceShow,
  setTrack,
  setHistory,
};
