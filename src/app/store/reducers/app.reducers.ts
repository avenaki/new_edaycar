import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { driverReducer } from "./driver.reducer";
import { tripReducer } from "./trip.reducer";
import { userReducer } from "./user.reducer";

export const appReducers: ActionReducerMap<AppState> = {
  user: userReducer,
  driver: driverReducer,
  trip: tripReducer,
  passenger: undefined,
};
