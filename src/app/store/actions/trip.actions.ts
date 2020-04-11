import { createAction, props } from "@ngrx/store";
import { TakeTripModel } from "../../models/take-trip-model";
import { Trip } from "../../models/trip";
import { TripSearchFilter } from "../../models/trip-search-filter";



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
export const filterTrips = createAction(
  "[Trip] - Filter Trips ",
  props<TripSearchFilter>(),
);

export const filterTripsSuccess = createAction(
  "[Trip] - Filter Trips Success ",
  props<{trip: Trip[]}>(),
);

export const filterTripsError = createAction(
  "[Trip] - Filter Trips Error ",
  props<Error>(),
);
export const takeTrip = createAction(
  "[Trip] - Filter Trips",
  props<TakeTripModel>(),
);

export const takeTripError = createAction(
  "[Trip] - Filter Trips Error",
  props<Error>(),
);
export const loadTrip = createAction(
  "[Trip] - Load Trip ",
  props<{id: string; }>(),
);

export const loadTripSuccess = createAction(
  "[Trip] - Load Trip Success",
  props<Trip>(),
);

export const loadTripFail = createAction(
  "[Trip] - Load Trips Fail",
  props<Error>(),
);
export const editTrip = createAction(
  "[Trip] - Trip Edit ",
  props<Trip>(),
);
export const editTripSuccess = createAction(
  "[Trip] - Trip Edit  Success",
  props< Trip>(),
);

export const editTripFail = createAction(
  "[Trip] - Trip Edit  Fail",
  props<Error>(),
);
