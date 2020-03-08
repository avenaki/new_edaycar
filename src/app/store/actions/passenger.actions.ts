import { createAction, props } from "@ngrx/store";
import { Passenger } from "../../models/passenger";

export const load = createAction(
  "[Passenger] - Load ",
  props<{username: string; }>(),
);
export const loadSuccess = createAction(
  "[Passenger] - Load Success",
  props<Passenger>(),
);

export const loadFail = createAction(
  "[Passenger] - Load Fail",
  props<Error>(),
);
export const loadPassengers = createAction(
  "[Passenger] - Passengers Load ",
);
export const loadPassengersSuccess = createAction(
  "[Passenger] - Load Passengers Success",
  props<{ passengers: Passenger[]}>(),
);

export const loadPassengersFail = createAction(
  "[Passenger] - Load Passengers Fail",
  props<Error>(),
);
export const editPassenger = createAction(
  "[Passenger] - Passenger Edit ",
  props<Passenger>(),
);
export const editPassengerSuccess = createAction(
  "[Passenger] - Edit Passenger Success",
  props< Passenger>(),
);

export const editPassengerFail = createAction(
  "[Passenger] - Edit Passenger Fail",
  props<Error>(),
);
