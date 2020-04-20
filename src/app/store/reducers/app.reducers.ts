import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { chatReducerFunction } from "./chat.reducer";
import { driverReducerFunction } from "./driver.reducer";
import { passengerReducerFunction } from "./passenger.reducer";
import { tripReducerFunction } from "./trip.reducer";
import { userReducerFunction } from "./user.reducer";

export const appReducers: ActionReducerMap<AppState> = {
  user: userReducerFunction,
  driver: driverReducerFunction,
  trip: tripReducerFunction,
  passenger: passengerReducerFunction,
  chat: chatReducerFunction,
};
