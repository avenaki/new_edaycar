import { createAction, props } from "@ngrx/store";
import { Trip } from "../../models/trip";


export const addTrip = createAction(
  "[Trip] - Add Trip ",
  props< Trip>(),
);

export const addTripSuccess = createAction(
  "[Trip] - Add Trip Success",
  props<Trip>(),
);

export const addTripFail = createAction(
  "[Trip] - Add Trip Fail",
  props<Error>(),
);
export const loadTrips = createAction(
  "[Trip] - Load Trips ",
);

export const loadTripsSuccess = createAction(
  "[Trip] - Load Trips Success",
  props<{trip: Trip[]}>(),
);

export const loadTripsFail = createAction(
  "[Trip] - Load Trips Fail",
  props<Error>(),
);
