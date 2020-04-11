import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { chatReducer } from "./chat.reducer";
import { driverReducer } from "./driver.reducer";
import { passengerReducer } from "./passenger.reducer";
import { tripReducer } from "./trip.reducer";
import { userReducer } from "./user.reducer";

export const appReducers: ActionReducerMap<AppState> = {
  user: userReducer,
  driver: driverReducer,
  trip: tripReducer,
  passenger: passengerReducer,
  chat: chatReducer,
};
