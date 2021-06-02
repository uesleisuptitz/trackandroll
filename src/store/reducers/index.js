import user from "./user.reducer";
import app from "./app.reducer";
import shows from "./shows.reducer";
import show from "./show.reducer";
import { combineReducers } from "redux";

export default combineReducers({
  user,
  app,
  shows,
  show,
});
