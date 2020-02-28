import { createAction, props } from "@ngrx/store";


export enum DriverActionType {
  LOAD_DRIVERS= "[DRIVER] Load Drivers",
  LOAD_DRIVERS_SUCCESS = "[DRIVER] Load Drivers Success",
  LOAD_DRIVERS_FAIL = "[DRIVER] Load Drivers Fail",
  LOAD_DRIVER= "[DRIVER] Load Drivers",
  LOAD_DRIVER_SUCCESS = "[DRIVER] Load Driver Success",
  LOAD_DRIVER_FAIL = "[DRIVER] Load Driver Fail",
  CREATE_DRIVER= "[DRIVER] Create Diverr",
  CREATE_DRIVER_SUCCESS = "[DRIVER] Create Driver Success",
  CREATE_DRIVER_FAIL = "[DRIVER] Create Driver Fail",
  UPDATE_DRIVER= "[DRIVER] Update Driver",
  UPDATE_DRIVER_SUCCESS = "[DRIVER] Update Driver Success",
  UPDATE_DRIVER_FAIL = "[DRIVER] Update Driver Fail",
}
export const loadDriver = createAction(
  DriverActionType.LOAD_DRIVER,
  props<{username: string; password: string; }>(),
);



