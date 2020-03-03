import { createAction, props } from "@ngrx/store";
import { Passenger } from "../../models/passenger";

const ADD_PASSENGER = "[Passenger] passenger added";


export const addPassenger = createAction(
  ADD_PASSENGER,
  props<Passenger>(),
);

