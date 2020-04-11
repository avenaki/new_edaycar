import { ChatState } from "./chat.state";
import { DriverState } from "./driver.state";
import { PassengerState } from "./passenger.state";
import { TripState } from "./trip.state";
import { UserState } from "./user.state";

export interface AppState {
  driver: DriverState;
  passenger: PassengerState;
  trip: TripState;
  user: UserState;
  chat: ChatState;
}

