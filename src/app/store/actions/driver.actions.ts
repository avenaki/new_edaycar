import { createAction, props } from "@ngrx/store";
import { Driver } from "../../models/driver";

export const load = createAction(
  "[Driver] - Load ",
  props<{username: string; }>(),
);
export const loadSuccess = createAction(
  "[Driver] - Load Success",
  props<Driver>(),
);

export const loadFail = createAction(
  "[Driver] - Load Fail",
  props<Error>(),
);
export const loadDrivers = createAction(
  "[Driver] - Drivers Load ",
);
export const loadDriversSuccess = createAction(
  "[Driver] - Load Drivers Success",
  props<{ drivers: Driver[]}>(),
);

export const loadDriversFail = createAction(
  "[Driver] - Load Drivers Fail",
  props<Error>(),
);
export const editDriver = createAction(
  "[Driver] - Driver Edit ",
  props<{ driver: Driver}>(),
);
export const editDriverSuccess = createAction(
  "[Driver] - Edit Driver Success",
  props< Driver>(),
);

export const editDriverFail = createAction(
  "[Driver] - Edit Driver Fail",
  props<Error>(),
);
