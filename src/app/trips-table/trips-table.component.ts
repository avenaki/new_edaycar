import { Component } from "@angular/core";


@Component({
  selector: "app-trips-table",
  templateUrl: "./trips-table.component.html",
  styleUrls: ["./trips-table.component.css"]
})
export class TripsTableComponent {

  trips = [
    {
      id: 1,
      start: {
        id: 1,
        X: 56.2686,
        Y: 43.8782
      },
      finish: {
        id: 1,
        X: 56.2686,
        Y: 43.8782
      },
      startTime: new Date(),
      finishTime: new Date(),
      maxPassengers: 4,
      driver: {
        login: "alex1234",
        password: "1234",
        name: "Алексей",
        surname: "Сидоров",
        patronymic: "Александрович",
        birthDate: new Date("1999-12-12"),
        mobileNumber: "8909226543",
        experience: 4
      }
    }];
}
