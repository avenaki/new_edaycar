import { createAction, props } from "@ngrx/store";
import { Trip } from "../../models/trip";


export const addTrip = createAction(
  "[Trip] - Add Trip ",
  props<{ trip: Trip}>(),
);

export const addTripSuccess = createAction(
  "[Trip] - Add Trip Success",
  props<Trip>(),
);

export const addTripFail = createAction(
  "[Trip] - Add Trip Fail",
  props<Error>(),
);
