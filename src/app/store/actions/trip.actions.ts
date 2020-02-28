import { createAction, props } from "@ngrx/store";
import { Trip } from "../../entity/trip";

const ADD_PRODUCT = "[Trip] product added";
const REMOVE_TRIP = "[Trip] product removed";

export const addTrip = createAction(
  ADD_PRODUCT,
  props<Trip>(),
);

export const removeTrip = createAction(REMOVE_TRIP);
