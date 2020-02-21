import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      login: new FormControl("", [Validators.required,  Validators.minLength(4), Validators.pattern("^[A-Za-z0-9]+$")]),
      password: new FormControl("", [Validators.required, Validators.minLength(8),
      ])
    });
  }

  login(): void {
    this.authService.login(this.loginForm.controls["login"].value, btoa(this.loginForm.controls["password"].value)).subscribe();
  }
}

