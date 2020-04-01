import {  ChangeDetectionStrategy, Component } from "@angular/core";


@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {

}
